import PropTypes from "prop-types";

/**
 * @param array - wherever array
 * @param key - key for the sort method
 * @param order - asc or desc
 * @returns {*[]}
 */
export const sortArray = (array, key, order = 'asc') => {
    const compare = (a, b) => {
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        return 0;
    };

    return [...array].sort(compare);
};


sortArray.prototype = {
    array: PropTypes.array.isRequired,
    key: PropTypes.string,
    order: PropTypes.string
}