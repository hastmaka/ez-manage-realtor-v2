export const generateTableReducers = (reducers = {}) => {
    return {
        setFilter(state, {payload}) {
            return {
                ...state,
                filter: payload
            }
        },
        setRowValidator(state, {payload}) {
            return {
                ...state,
                rowValidator: payload
            }
        },
        setApi(state, {payload}) {
            return {
                ...state,
                api: {
                    ...state.api,
                    ...payload
                }
            }
        },
        setPage(state, {payload}) {
            return {
                ...state,
                page: payload
            }
        },
        setRowsPerPage(state, {payload}) {
            return {
                ...state,
                rowsPerPage: payload
            }
        },
        setSelected(state, {payload}) {
            return {
                ...state,
                selected: payload
            }
        },
        unshiftData(state, {payload}) {
            return {
                ...state,
                createMode: true,
                tableData: [
                    payload.record,
                    ...state.tableData
                ]
            }
        },
        setOffCreateMode(state) {
            return {
                ...state,
                editMode: false,
                editRecordData: {},
                createMode: false,
                createRecordData: {}
            }
        },
        setCreateRecordData(state, {payload}) {
            return {
                ...state,
                createRecordData: {
                    ...state.createRecordData,
                    ...payload
                },
            }
        },
        setUpdateRecordData(state, {payload}) {
            return {
                ...state,
                editRecordData: {
                    ...state.editRecordData,
                    ...payload
                },
            }
        },
        setEditMode(state, {payload}) {
            return {
                ...state,
                editMode: true,
                editRecordData: payload
            }
        },
        ...reducers
    }
}