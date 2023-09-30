import PropTypes from "prop-types";

export const capitalizeFirstLetter = (str) => {
    if(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
    return ''
}

capitalizeFirstLetter.prototype = {
    str: PropTypes.string.isRequired
}