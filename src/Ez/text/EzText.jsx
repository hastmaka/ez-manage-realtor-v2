import React from "react";
import classes from './EzText.module.scss';
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const EzText = React.forwardRef(({text, centered, color, sx, cap, ...rest}, ref) => {
    return (
        <span
            ref={ref}
            className={classes['text']}
            style={{
                textAlign: centered ? 'center' : '',
                textTransform: cap ? 'capitalize' : '',
                color: color || '',
                ...sx
            }}
            {...rest}
        >
            {text}
        </span>
    );
})

export default EzText;

EzText.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    sx: PropTypes.object,
    cap: PropTypes.bool,
    centered: PropTypes.bool,
}