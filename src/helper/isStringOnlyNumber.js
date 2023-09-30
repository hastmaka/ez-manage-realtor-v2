import PropTypes from "prop-types";

export function isStringOnlyNumber (str) {
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 48 || charCode > 57) return false
    }
    return true;
}

isStringOnlyNumber.propTypes = {
    str: PropTypes.string.isRequired
}