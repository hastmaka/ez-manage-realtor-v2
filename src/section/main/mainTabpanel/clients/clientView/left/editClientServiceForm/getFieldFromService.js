import PropTypes from "prop-types";
import {capitalizeEveryWord} from "../../../../../../../helper/index.js";

export const getFieldFromService = (service) => {
    let tempService = [];
    for (const [key, value] of Object.entries(service)) {
        if(!([
            'document',
            'type',
            'id',
            'note',
            'created_at',
            'updated_at',
            'pet',
            'status',
            'service',
            'active'
        ].includes(key))) {
            tempService.push({
                name: key,
                type: ['phone', 'name', 'last_name'].includes(key) ? 'string' : key === 'email' ? 'email' : 'number',
                // type: 'string',
                label: capitalizeEveryWord(key),
                value: value,
                mode: ['bed', 'bath', 'zip'].includes(key) ? 'freeSoloMultiselect' : ''
            })
        }
    }
    return tempService
}

getFieldFromService.propTypes = {
    service: PropTypes.object.isRequired
}