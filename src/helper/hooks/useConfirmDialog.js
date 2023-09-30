import {generalSliceActions} from "../../store/generalSlice.js";


let resolveCallback;
export default function useConfirmDialog (){
    const onConfirm = () => {
        window.dispatch(generalSliceActions.closeConfirmDialog());
        resolveCallback(true);
    };
    const onCancel = () => {
        window.dispatch(generalSliceActions.closeConfirmDialog());
        resolveCallback(false);
    };
    const confirm = ({title, content}) => {
        window.dispatch(generalSliceActions.openConfirmDialog({title, content}));
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };
    return { onConfirm, onCancel, confirm }
}