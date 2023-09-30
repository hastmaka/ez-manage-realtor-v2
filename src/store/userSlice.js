import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        userStatus: {loaded: false, loading: false},
    },
    reducers: {
        setUser(state, {payload}){
            state.user = {...payload}
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(getAll.pending, (state, {meta}) => {
        //     switch (meta.arg.collection) {
        //         case 'users':
        //             state.orderStatus = {
        //                 ...state.orderStatus,
        //                 loading: true
        //             };
        //             break;
        //         default:
        //             return
        //     }
        // });
        // builder.addCase(getAll.fulfilled, (state, {meta, payload}) => {
        //     switch (meta.arg.collection) {
        //         case 'orders':
        //             state.user.order = [...payload]
        //             state.userStatus = {
        //                 ...state.userStatus,
        //                 loading: false,
        //                 loaded: true
        //             }
        //             updateLocalStore('user', payload, 'orders');
        //             // debugger
        //             break;
        //         default:
        //             return
        //     }
        // });
        // builder.addCase(getAll.rejected, (state, {payload}) => {
        //     debugger
        //     state.orderStatus = payload;
        //     state.orderStatus = {
        //         ...state.orderStatus,
        //         loaded: false
        //     };
        // });
    }
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;