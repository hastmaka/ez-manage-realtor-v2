import {createSlice} from '@reduxjs/toolkit';

const generalSlice = createSlice({
    name: 'general',
    initialState: {
        burger: {
            toggle: true
        },
        modal: {
            open: false
        },
        toast: {
            open: false,
            content: '',
            type: ''
        },
        confirmDialog: {
            open: false,
            title: '',
            content: '',
        },
    },
    reducers: {
        toggle(state) {
            state.burger.toggle = !state.burger.toggle
        },
        openModal(state, {payload}) {
            state.modal = {
                open: true,
                who: payload
            }
        },
        closeModal(state){
            state.modal.open = false;
        },
        openToast(state, {payload}) {
            state.toast = {
                open: true,
                ...payload
            }
        },
        closeToast(state) {
            state.toast.open = false
        },
        openConfirmDialog(state, {payload}) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: true,
                ...payload
            }
        },
        closeConfirmDialog(state) {
            state.confirmDialog = {
                ...state.confirmDialog,
                open: false,
            }
        }
    },
    extraReducers: builder => {}
});

export const generalSliceActions = generalSlice.actions;
export default generalSlice.reducer;