import EzModel from "../Ez/model/EzModel";

export default class EmployeeModel extends EzModel {
    constructor(data) {
        let {phones} = data;
        super({
            fields: [{
                name: 'employee_id', type: 'int'
            }, {
                name: 'employee_active', type: 'boolean'
            }, {
                name: 'employee_first_name', type: 'string'
            }, {
                name: 'employee_last_name', type: 'string'
            }, {
                name: 'employee_personal_email', type: 'string'
            }, {
                name: 'employee_rate', type: 'string'
            }, {
                name: 'phones', type: 'array', non_persist: true
            }, {
                name: 'employee_primary_telephone', type: 'string', non_persist: true,
                render() {
                    let phoneNumber;
                    if (phones?.length) {
                        phoneNumber = phones[0].phone_number
                    } else {
                        return 'No Phone Number';
                    }

                    return `+1(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
                }
            }, {
                name: 'addresses', type: 'array', non_persist: true
            }],
            data
        });
    }
}
