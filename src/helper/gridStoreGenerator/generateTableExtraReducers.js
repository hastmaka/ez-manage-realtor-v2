export const generateTableExtraReducers = (builder, read, create, update, destroy, extraReducers = {}) => {
    return builder => {
        builder.addCase(read.pending, (state, {meta}) => {
            state.loading = true;
        })
    }
    // return {
    //     [read.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [read.fulfilled]: (state, {payload}) => {
    //         state.tableData = payload.data;
    //         state.tableCount = payload.dataCount;
    //         state.loading = false;
    //         state.isSuccess = true;
    //     },
    //     [read.rejected]: (state, {payload}) => {
    //         state.message = payload;
    //         state.loading = false;
    //         state.isSuccess = false;
    //     },
    //     [create.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [create.fulfilled]: (state, {payload}) => {
    //         state.tableData = payload.data;
    //         state.tableCount = payload.dataCount;
    //         state.loading = false;
    //         state.isSuccess = true;
    //     },
    //     [create.rejected]: (state, {payload}) => {
    //         state.message = payload;
    //         state.loading = false;
    //         state.isSuccess = false;
    //     },
    //     [update.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [update.fulfilled]: (state, {payload}) => {
    //         state.tableData = payload.data;
    //         state.tableCount = payload.dataCount;
    //         state.loading = false;
    //         state.isSuccess = true;
    //     },
    //     [update.rejected]: (state, {payload}) => {
    //         state.message = payload;
    //         state.loading = false;
    //         state.isSuccess = false;
    //     },
    //     ...extraReducers
    // }
}