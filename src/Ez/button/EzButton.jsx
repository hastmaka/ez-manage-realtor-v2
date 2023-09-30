import React from 'react';
import classes from './EzButton.module.scss';
import PropTypes from "prop-types";

const EzButton = React.forwardRef(({ text, disabled, fullWidth, type, sx, loading, variant, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            className={`${classes['button']} ${disabled ? classes['disabled'] : ''} ${fullWidth ? classes['full-with'] : ''} ${variant ? classes[variant] : ''}`}
            type={type}
            style={{ ...sx }}
            {...rest}
        >
            {loading ? (
                <div className={loading ? classes['loader'] : ''} />
            ) : (
                text
            )}
        </button>
    )}
);

EzButton.displayName = 'EzButton'

export default EzButton;

EzButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    loading: PropTypes.bool,
    sx: PropTypes.object,
}
