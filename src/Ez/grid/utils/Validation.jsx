import {validateEmail} from "../../../helper/index.js";

export function validateRow(formData) {
    const errors = {};

    Object.entries(formData).map(([key, value]) => {
        if(['bed', 'bath', 'zip'].includes(key)) {
            if(!value.length) {
                errors[key] = `this field can't be empty`
            }
        } else if(key === 'phone') {
            if (value.length < 14) errors[key] = 'phone must be 10 digits'
        } else if(key === 'email') {
            if(!validateEmail(value)) errors[key] = `email is not valid`
        } else {
            if([null, ''].includes(value)) {
                errors[key] = `this field can't be empty`
            }
        }
    })

    return errors;
}
