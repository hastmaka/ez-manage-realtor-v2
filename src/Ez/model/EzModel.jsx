const convertData = (value, type) => {
    let valueTypes = {
        int: (value) => {
            return parseInt(value);
        },
        boolean: (value) => {
            return !!value;
        },
        string: (value) => {
            return value.toString()
        },
        object: (value) => {
            return {...value}
        },
        array: (value) => {
            return [...value]
        },
    }

    try {
        return valueTypes[type](value)
    } catch (error) {
        return null
    }
}

export default class EzModel {
    constructor({fields, data}) {
        for (let {name, type, render} of fields) {
            this[name] = convertData(render? render() : data[name], type)
        }
    }

    get(field) {
        return this[field];
    }

    set(field, value) {
        if (field !== null && typeof field === 'object') {
            for (let [key, val] of Object.entries(field)) {
                this[key] = val;
            }
        } else {
            this[field] = value;
        }
    }
}