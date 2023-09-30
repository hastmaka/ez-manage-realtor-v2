import PropTypes from "prop-types";
import {generalSliceActions} from "../store/generalSlice.js";

/**
 * function to manage the global modal
 * @param children - element to render inside the modal
 * @param who - to control who is using the modal
 */
export const openModal = (children, who = null) => {
    window.dispatch(generalSliceActions.openModal(who));
    window.setChildren(children)
};

openModal.prototype = {
    children: PropTypes.element.isRequired,
    who: PropTypes.string
}