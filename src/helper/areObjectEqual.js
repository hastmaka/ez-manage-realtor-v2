import PropTypes from "prop-types";

export const areObjectEqual = (obj1, obj2) => {
    // Check if both parameters are objects
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
        return false;
    }

    // Get the keys of obj1 and obj2
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if the keys and values are the same
    for (let key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

areObjectEqual.propTypes = {
    obj1: PropTypes.object.isRequired,
    obj2: PropTypes.object.isRequired,
}