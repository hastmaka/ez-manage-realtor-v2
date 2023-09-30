import React from "react";
import PropTypes from "prop-types";
import classes from "./EzTextField.module.scss";
import {isStringOnlyNumber} from "../../helper/index.js";

const EzTextField = React.forwardRef(({
    label,
    required,
    value,
    padding,
    margin,
    onChange,
    error,
    helperText,
    type,
    name,
    defaultValue,
    multiselect,
    placeholder,
     ...rest
}, ref) => {
    return (
        <div
            style={{
                padding: multiselect ? 0 : padding ,
                margin,
                flex: multiselect ? 1 : null
            }}
             className={`${classes['textfield']}`}
        >
            <input
                ref={ref}
                required={required}
                name={name || ''}
                type={type || 'text'}
                className={classes['input']}
                value={value}
                autoComplete='off'
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={(e) => {
                    if(!isStringOnlyNumber(e.target.value) && type === 'number') {
                        return e.target.value.slice(0, -1);
                    }
                    multiselect ? onChange(e) : onChange({[name]: e.target.value})
                }}
                {...rest}
            />
            {!multiselect && <label
                style={{
                    left: multiselect ? 0 : '14px',
                    top: value ? 0 : ''
                }}
                className={`${classes['label']} ${error && classes['error']}`}
            >
                {`${label} *`} {error && ` - ${helperText}`}
            </label>}
        </div>
    );
})

EzTextField.displayName = 'EzTextField'

EzTextField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    defaultValue: PropTypes.string,
    padding: PropTypes.string,
    margin: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.bool,
    multiselect: PropTypes.bool,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
};

export default EzTextField;
