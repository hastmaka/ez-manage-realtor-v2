import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import classes from './EzModal.module.scss'

const EzModal = ({ isOpen, onClose, children, ...rest }) => {
    const modalContent = (
        <div
            id='modal'
            className={`${classes['modal']} ${isOpen ? classes['open'] : classes['closing']} `}
        >
            <div className={classes['modal-overlay']} /*onClick={handleClose}*//>
            <div className={classes['modal-content-wrapper']} {...rest}>
                <button
                    onClick={onClose}
                    className={classes['modal-close']}
                >X</button>
                <div className={classes['modal-content']} /*onClick={handleContentClick}*/>
                    {children}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

EzModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
};

export default EzModal;