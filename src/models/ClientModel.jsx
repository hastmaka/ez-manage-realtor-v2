import EzModel from "../Ez/model/EzModel.jsx";

export default class ClientModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'id', type: 'string'
            }, {
                name: 'status', type: 'string'
            }, {
                name: 'service', type: 'object'
            }, {
                name: 'email', type: 'string'
            }, {
                name: 'name', type: 'string'
            }, {
                name: 'last_name', type: 'string'
            }, {
                name: 'phone', type: 'string'
            }, {
                name: 'created_at', type: 'int'
            }, {
                name: 'updated_at', type: 'int'
            }, {
                name: 'active', type: 'boolean'
            }],
            data
        });
    }
}