import EzStack from "../stack/EzStack.jsx";
import ReactDOM from "react-dom";
import classes from './EzToast.module.scss'
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {generalSliceActions} from "../../store/generalSlice.js";
import EzText from "../text/EzText.jsx";

/**
 * three types - success | error | warning
 * @returns {React.ReactPortal}
 * @constructor
 */

const types = {
    success: '#2a9d8f',
    error: '#e76f51',
    warning:  '#e09f3e'
}
export default function EzToast() {
    const {toast} = useSelector(state => state.general)
    // debugger
    useEffect(() => {
        if (toast.open) {
            const timeoutId = setTimeout(() => {
                window.dispatch(generalSliceActions.closeToast())
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [toast.open]);

    const toastContainer = (
        <EzStack
            className={`${classes['toast-container']} ${classes.show}`}
            sx={{
                backgroundColor: types[toast.type]
            }}
        >
            <EzText text={toast.content}/>
        </EzStack>
    )


    return ReactDOM.createPortal(toast.open ? toastContainer : null, document.body);
}