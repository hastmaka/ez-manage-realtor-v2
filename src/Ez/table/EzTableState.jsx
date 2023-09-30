import {useCallback, useEffect, useReducer} from 'react';
import {showSnackbar} from "../../util/Helpers.jsx";
// import {deleteApi, getApi, postApi, putApi} from "../api/Api.jsx";
import {validateRow} from "../grid/utils/Validation.jsx";
import {saveReducer} from "../reducerStorage/reducerStorage.js";
import {getApi} from "../grid/api/GridFirebaseApi.jsx";

let initialState = {
    id: 'id',
    data: [],
    isLoading: false,
    isAdding: false,
    isEditing: false,
    formData: {},
    selectedRow: {},
    formErrors: {},
    count: 0,
    isOpen: false,
    paginationModel: {
        page: 0,
        pageSize: 10,
    },
    focusRecord: {},
    showToast: false,
    toastMessage: '',
    totalPages: 0,
    pageSizeOptions: [{
        id: 1,
        value: 10
    },{
        id: 2,
        value: 25
    },{
        id: 3,
        value: 50
    },{
        id: 4,
        value: 100
    }],
    formTitle: {},
    refs: []
};

export const EzTableState = (props) => {
    const { idField, store = {}, rows = [], columns = [],
        optionalFunction = {}, stateName = '', formTitle = {},
        toolbar = {}
    } = props;

    initialState = {
        ...initialState,
        formTitle,
        columns,
        ...toolbar,
        id: idField || 'id'
    }
    if (store.limit) initialState.paginationModel.pageSize = store.limit;
    if (Object.keys(toolbar).length) initialState.toolbar = true;

    const [state, setState] = useReducer((state, value) => (
        { ...state, ...value }
    ), initialState, undefined);

    const { isEditing, selectedRow, formData, paginationModel, refs } = state;
    // const fetchData = useCallback(async () => {
    //     if (store.type === 'remote') {
    //         setState({ isLoading: true });
    //         let params = {
    //             limit: paginationModel.pageSize,
    //             offset: paginationModel.page * paginationModel.pageSize,
    //         };
    //         try {
    //             const response = await getApi(store.api.read, params);
    //             const transformedData = response.data[store.rootProperty].map((item) => new store.model(item));
    //             setState({
    //                 data: transformedData,
    //                 count: response.data.count,
    //                 isLoading: false,
    //                 totalPages: Math.ceil(response.data.count / paginationModel.pageSize)
    //             });
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             setState({ isLoading: false });
    //         }
    //     } else {
    //         setState({
    //             data: rows.map((item) => new store.model(item)),
    //             count: rows.length,
    //             totalPages: Math.ceil(rows.length / paginationModel.pageSize)
    //         });
    //     }
    // }, [store, rows, paginationModel]);
    //
    // useEffect(() => {
    //     fetchData().then();
    // }, [paginationModel]);
    //
    // const handlePageSizeChange = (paginationValues) => {
    //     setState({ paginationModel: paginationValues })
    // };


    //firebase nosql db
    const fetchData = async () => {
        if (store.type === 'remote') {
            setState({isLoading: true});
            try {
                // const response = await getApi(store.api.read, paginationModel);
                // const transformedData = response.data[store.rootProperty].map((item) => new store.model(item));
                // debugger
                let timer = Date.now()
                // console.log('initiate db query', timer)
                const response = await getApi({
                    collection: 'clients',
                    filter: null,
                    limit: paginationModel.pageSize,
                    offset: refs.length ? paginationModel.next ? refs[1] : refs[0] : paginationModel.page * paginationModel.pageSize,
                    next: paginationModel.next
                });
                console.log('finalize db query', Date.now() - timer)
                if (!response.error) {
                    setState({...response});
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setState({isLoading: false});
            }
        } else {
            setState({
                data: rows.map((item) => new store.model(item)),
                count: rows.length,
                totalPages: Math.ceil(rows.length / paginationModel.pageSize)
            });
        }

    }

    useEffect(() => {
        fetchData().then();
    }, [paginationModel]);

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
    //----------------------------------------------------------


    const handleRowClick = (event, row) => {
        const clickedRow = event.currentTarget;
        const rowId = row[state.id];
        clickedRow.classList.toggle('selected');

        if (state.focusRecord[state.id] === rowId) {
            setState({ focusRecord: {} });
        } else {
            setState({ focusRecord: row });
        }
        saveReducer(stateName, state)
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

    const handleCloseModal = () => {
        setState({
            isAdding: false,
            isOpen: false,
            selectedRow: {},
            formData: {},
            formErrors: {}
        });
    };

    const handleInputChange = (value, field) => {
        setState({
            formData: {
                ...formData,
                [field]: value
            },
            selectedRow: {
                ...selectedRow,
                [field]: value
            }
        });
    };

    const handleEditButtonClick = (editedRow) => {
        setState({
            isOpen: true,
            isEditing: true,
            formData: {
                [idField]: editedRow.get(idField)
            },
            selectedRow: editedRow
        });
    };

    const handleDeleteRow = async (id) => {
        // try {
        //     setState({isLoading: true});
        //     await deleteApi(store.api.delete, id);
        //     // You can also specify the duration (in milliseconds)
        //     showSnackbar("Record deleted Successfully", 5000);
        //     setState({
        //         isLoading: false,
        //     });
        // } catch (error) {
        //     console.error('Error deleting row:', error);
        // } finally {
        //     await fetchData()
        //     setState({
        //         isLoading: false,
        //     });
        // }
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // let record = isEditing? {...selectedRow, ...formData} : {...formData},
        //     errors = validateRow(record, columns),
        //     message = '';
        //
        // if (isEditing && Object.keys(formData).length <= 1) {
        //     return alert('No Changes Detected');
        // }
        //
        // if (Object.keys(errors).length) {
        //     setState({
        //         formErrors: errors
        //     })
        // } else {
        //     if (store.type === 'remote') {
        //         setState({isLoading: true});
        //         try {
        //             if (isEditing) {
        //                 await putApi(store.api.update, formData);
        //                 message = "Data updated successfully"
        //             } else {
        //                 await postApi(store.api.update, formData);
        //                 message = "Data created successfully"
        //             }
        //             handleCloseModal();
        //         } catch (error) {
        //             console.error('Error fetching data:', error);
        //         } finally {
        //             showSnackbar(message, 5000);
        //             setState({
        //                 isLoading: false
        //             });
        //             await fetchData()
        //         }
        //     }
        // }
    };

    const params = {
        ...state,
        handleAddRow,
        handleCloseModal,
        handleInputChange,
        handleEditButtonClick,
        handleDeleteRow,
        handlePageSizeChange,
        handleSubmit,
        handleToastClose,
        handleRowClick,
        ...optionalFunction
    }

    if (stateName) {
        saveReducer(stateName, params)
    }

    return params
}
