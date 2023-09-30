import EzModel from "../Ez/model/EzModel";

export default class ActiveStatusModel extends EzModel {
    constructor(data) {
        super({
            fields: [{
                name: 'id', type: 'int'
            }, {
                name: 'value', type: 'boolean'
            }, {
                name: 'name', type: 'string'
            }, {
                name: 'name2', type: 'string'
            }, {
                name: 'color', type: 'string',
            }],
            data
        });
    }
}