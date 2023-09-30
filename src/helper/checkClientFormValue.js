import {capitalizeEveryWord} from "./capitalizeEveryWord.js";
import PropTypes from "prop-types";
// import {showSnackbar} from "../util/Helpers.jsx";

/**
 *
 * @param state - state from reducer to check value
 * @param data - all values from Form to check if are valid
 * @param action - self-explanatory
 * @returns {void|*|{service: ({bed: (number|string|*), zip, note: *[], price_from: (number|string|*), updated_at: number, document: *[], price_to: (number|string|*), created_at: number, type: (string|*), bath: (number|string|*), pet}|{bed: (number|string|*), zip, note: *[], updated_at: number, document: *[], created_at: number, pre_approval: (string|*), type: (string|*), bath: (number|string|*)}), client: {updated_at: number, phone: (string|*), name, last_name: (string|*), created_at: number, email}}}
 */
export function checkClientFormValue ({state, data, action}) {
    const obj = state.typeOfService === 'rent' ? {
        price_from: data.price_from,
        price_to: data.price_to,
    } : {
        pre_approval: data.pre_approval,
    };
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value === '0') {
                // return window.displayNotification({
                //     type: 'warning',
                //     content: `${capitalizeEveryWord(key)} hast to be greater than 0`
                // })
            }
            const testedValue = /^[0-9.]+$/.test(value);
            if (!testedValue) {
                // return window.displayNotification({
                //     type: 'warning',
                //     content: `${capitalizeEveryWord(key)} have to be only positive numbers`
                // })
            }
        }
    }

    const arraysToCheck = [
        { name: 'zip', message: 'Need to add some zip code' },
        { name: 'bed', message: 'Need to add some bed options' },
        { name: 'bath', message: 'Need to add some bath options' }
    ];

    for (const { name, message } of arraysToCheck) {
        if (!state[name].length) {
            // return showSnackbar(message, 2000);
        }
    }

    if(state.pet === '' && state.typeOfService === 'rent') {
        // return window.displayNotification({
        //     type: 'warning',
        //     content: 'Need to say if have pet or not'
        // })
    }
    let created_at = Date.now(),
        updated_at = Date.now();
    let client = {
            name: data.name,
            last_name: data.last_name,
            phone: data.phone,
            email: data.email,
            created_at,
            updated_at
        },
        service = state.typeOfService === 'rent' ? {
            type: state.typeOfService,
            price_from: data.price_from,
            price_to: data.price_to,
            bed: state.bed,
            bath: state.bath,
            zip: state.zip,
            document: [],
            note: [],
            pet: state.pet,
            created_at,
            updated_at
        } : {
            type: state.typeOfService,
            pre_approval: data.pre_approval,
            bed: state.bed,
            bath: state.bath,
            zip: state.zip,
            document: [],
            note: [],
            created_at,
            updated_at
        }

    return action === 'create-client' ? {client, service} : true;
}

checkClientFormValue.propTypes = {
    state: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired
}