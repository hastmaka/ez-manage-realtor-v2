export const generateInitialState = (indexField, initialState, api, extraFields = {}) => {
    const states = {
        api: api,
        data: [],
        isLoading: false,
        isAdding: false,
        isEditing: false,
        formData: {},
        pathToUpdate: '',
        selectedRow: {},
        formErrors: {},
        count: 0,
        isOpen: false,
        paginationModel: {
            page: 0,
            pageSize: 10,
            next: true
        },
        refs: [],
        focusRecord: {},
        showToast: false,
        toastMessage: '',
        ...extraFields
    }
    return initialState || states
}