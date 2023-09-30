import {useEffect, useReducer} from 'react';
// import {getApi, postApi, putApi, deleteApi} from './api/Api';
import {areObjectEqual, formatPhoneNumber, validateEmail} from "../../helper/index.js";
import {deleteApi, getApi, getBulk, postApi, putApi} from "./api/GridFirebaseApi.jsx";
import {generalSliceActions} from "../../store/generalSlice.js";

let initialState = {
    data: [],
    isLoading: false,
    isAdding: false,
    isEditing: false,
    isOpen: false,
    formData: {},
    formErrors: {},
    pathToUpdate: '',
    selectedRow: {},
    count: 0,
    paginationModel: {
        page: 0,
        pageSize: 10,
        next: true
    },
    refs: [],
    focusRecord: {},
    showToast: false,
    toastMessage: '',
};

const Fields = (formFields, formData) => {
    let temp = {...formData};
    formFields.map(item => {
        temp[item.name] = ['freeSoloMultiselect', 'multiselect'].includes(item.mode) ?
            [] : item.value ? item.value : ''
    })
    // debugger
    return temp
}

export function EzGridState(props) {
    const {
        primaryId,
        store = {},
        rows = [],
        columns = [],
        formTitle = {},
        toolbar = {}
    } = props;

    initialState = {
        ...initialState,
        formTitle,
        columns,
        ...toolbar,
        primaryId: primaryId || 'id'
    }

    if (store?.limit) initialState.paginationModel.pageSize = store.limit;
    const [state, setState] = useReducer((state, value) => ({ ...state, ...value }), initialState, undefined);

    const { isEditing, selectedRow, formData, formErrors, pathToUpdate, paginationModel, refs, serviceName } = state;

    useEffect(() => {
        console.log(state)
    }, [state])


    const fetchData = async (whoTrigger) => {
        // let trueRef = optRef || refs
        if (store.type === 'remote') {
            setState({isLoading: true});
            try {
                // console.log('initiate db query', timer)
                // debugger
                await getApi({
                    collection: store.api.read,
                    limit: paginationModel.pageSize,
                    filters: [{field: 'active', operator: '==', value: true}],
                    offset: (refs.length > 0 && whoTrigger !== 'search') ?
                        paginationModel.next ? refs[1] : refs[0] :
                        paginationModel.page * paginationModel.pageSize,
                    next: paginationModel.next,
                    callBack: listenerForUpdate
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setState({isLoading: false});
            }
        } else {
            setState({
                data: rows || [],
                count: rows.length || 0
            });
        }

    }
    //fetch the data everytime pagination model change
    useEffect(() => {fetchData().then()}, [paginationModel]);

    //here we keep in sync database across devices listening for change and updating locally
    const listenerForUpdate = (response) => {
        const transformedData = response[store.rootProperty].map((item) => {
            //update the selected record manually
            if (selectedRow?.id === item.id) {
                setState({selectedRow: new store.model(item)})
            }
            return new store.model(item)
        });
        if (!response.error) {
            setState({...response, data: transformedData});
        }
    };
    
    const handleSearch = async (value) => {
        try {
            if(value) {
                // console.log('initiate db query', timer)
                const response = await getBulk({collection: store.api.read})
                const data = response.docs.map(item => ({...item.data(), id: item.id}))
                const searchResult = data.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()))
                const transformedData = searchResult.map((item) => {return new store.model(item)})
                setState({data: transformedData})
            } else {
                fetchData('search').then()
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setState({isLoading: false});
        }
    }

    const handlePageSizeChange = (paginationValues) => {
        let sizeChanged = paginationValues.pageSize !== paginationModel.pageSize;
        setState({
            paginationModel: {
                ...paginationValues,
                page: sizeChanged? 0 : paginationValues.page,
                next: sizeChanged ? true : paginationValues.page > paginationModel.page
            },
            refs: sizeChanged ? [] : refs
        });
    };

    const handleCellClick = ({row}) => {
        setState({ focusRecord: row });
    };

    const handleToastClose = () => {
        setState({
            showToast: false,
            toastMessage: ''
        });
    };

    const handleAddRow = () => {
        setState({
            isAdding: true,
            isOpen: true
        });
    };

    const handleEditRow = (editedRow) => {
        setState({
            isOpen: true,
            isEditing: true,
            selectedRow: editedRow
        });
    };

    const handleCloseModal = () => {
        setState({
            isAdding: false,
            isEditing: false,
            isOpen: false,
            selectedRow: {},
            formData: {},
            formErrors: {}
        });
    };

    const handlePathToUpdate = (path) => {
        // in case we are working with nested data, we have to declare with path are
        // we working on
        setState({
            formData: path ? {...selectedRow[path]} : {...selectedRow},
            pathToUpdate: path
        })
    };

    const updateFieldsDataAndServiceName = (formFields, name) => {
        // debugger
        setState({
            formData: {...Fields(formFields, formData, setState)},
            serviceName: name || ''
        })
    };

    //we don't delete any record only change the active status to false
    const handleDeleteRow = async (documentId) => {
        try {
            setState({isLoading: true});
            await deleteApi(store.api.delete, documentId);
            window.dispatch(generalSliceActions.openToast({
                content: 'Record deleted successfully',
                type: 'success'
            }))
        } catch (error) {
            console.error('Error deleting row:', error);
        } finally {
            setState({isLoading: false});
        }
    };

    const handleInputChange = (value) => {
        let errors = {...formErrors},
            formatValue;

        if(value.error) {
            errors[value.error.where] = value.error.message
        } else {
            if(value.clearError) {
                const {clearError, ...rest} = value
                delete errors[clearError]
                formatValue = {...rest}
            } else {
                if (value.phone && errors.phone) {
                    if (!(value.phone.length < 14)) {
                        delete errors.phone
                    } else {
                        errors.phone = 'phone must be 10 digits'
                    }
                } else if (value.email && errors.email) {
                    if (validateEmail(value.email)) {
                        delete errors.email
                    } else {
                        errors.email = `email is not valid`
                    }
                } else {
                    delete errors[Object.entries(value).map(([key]) => key)[0]]
                }

                formatValue = value.phone ? { phone: formatPhoneNumber(value.phone) } : value;
            }
        }

        setState({formData: {...formData, ...formatValue}, formErrors: {...errors}})
    };

    const handleSubmit = async (e, isFromEdit) => {
        e.preventDefault();
        let errors = await import('./utils/Validation').then(module => module.validateRow(formData));

        //check if it was change on data
        if(pathToUpdate) {
            if (isEditing && areObjectEqual(selectedRow[pathToUpdate], formData)) {
                return window.dispatch(generalSliceActions.openToast({
                    content: 'Nothing was saved. No Changes Detected',
                    type: 'warning'
                }))
            }
        } else {
            if (isEditing && areObjectEqual(selectedRow, formData)) {
                return window.dispatch(generalSliceActions.openToast({
                    content: 'Nothing was saved. No Changes Detected',
                    type: 'warning'
                }))
            }
        }

        if (Object.keys(errors).length) {
            setState({formErrors: errors})
        } else {
            if (store.type === 'remote') {
                setState({isLoading: true});
                try {
                    if (isEditing) {
                        await putApi({
                            collection: store.api.update,
                            documentId: selectedRow.get('id'),
                            pathToUpdate,
                            data: formData
                        });
                        selectedRow.set(pathToUpdate ? pathToUpdate : formData, pathToUpdate ? formData : null);
                        window.dispatch(generalSliceActions.openToast({
                            content: 'Data updated successfully',
                            type: 'success'
                        }))
                    } else {
                        await postApi({
                            collection: store.api.update,
                            data: {...formData, serviceName}
                        });
                        return window.dispatch(generalSliceActions.openToast({
                            content: 'Record was created',
                            type: 'success'
                        }))
                    }
                    // handleCloseModal();
                } catch (error) {
                    window.dispatch(generalSliceActions.openToast({
                        content: 'An error occur',
                        type: 'error'
                    }))
                    console.error('Error fetching data:', error);
                } finally {
                    setState({
                        isLoading: false,
                        isAdding: false,
                        formData: {},
                        formErrors: {},
                        ...(!isFromEdit && {
                            isOpen: false,
                            isEditing: false,
                            selectedRow: {},
                        })
                    });
                }
            }
        }
    };

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : '';
    };

    return {
        ...state,
        handleAddRow,
        handleCloseModal,
        handleInputChange,
        handlePathToUpdate,
        handleEditRow,
        handleDeleteRow,
        handlePageSizeChange,
        handleSubmit,
        handleToastClose,
        getRowClassName,
        handleCellClick,
        // handleSync,
        updateFieldsDataAndServiceName,
        handleSearch
    }
}
