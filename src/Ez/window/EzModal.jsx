import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import './EzModal.css'

const Modal = ({ isOpen, onClose, children }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsClosing(false); // Reset isClosing state when the modal is opened
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300); // Adjust the duration as needed
    };

    const handleContentClick = (event) => {
        event.stopPropagation();
    };

    if (!isOpen && !isClosing) {
        return null; // Hide the modal when it's closed and not animating
    }

    return (
        <div className={`modal ${isOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className="modal-overlay" onClick={handleClose} />
            <div className="modal-content-wrapper">
                <div className="modal-content" onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
};

export default Modal;