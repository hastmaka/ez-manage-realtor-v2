import {createSlice} from '@reduxjs/toolkit';

const clientSlice = createSlice({
    name: 'client',
    initialState: {},
    reducers: {
        set(state, {payload}) {
            debugger
        }
    },
    extraReducers: builder => {}
});

export const clientSliceActions = clientSlice.actions;
export default clientSlice.reducer;