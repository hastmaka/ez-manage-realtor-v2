export const client_input_rent_form_data = [
{
    type: 'string',
    name: 'name',
    label: 'Name'
},
{
    type: 'string',
    name: 'last_name',
    label: 'Last Name'
},
{
    type: 'string',
    name: 'phone',
    label: 'Phone'
},
{
    type: 'email',
    name: 'email',
    label: 'Email'
},
{
    type: 'number',
    name: 'price_from',
    label: 'Price From'
},
{
    type: 'number',
    name: 'price_to',
    label: 'Price To'
},
{
    type: 'number',
    name: 'bed',
    label: 'Bed',
    mode: 'freeSoloMultiselect'
},
{
    type: 'number',
    name: 'bath',
    label: 'Bath',
    mode: 'freeSoloMultiselect'
},
{
    type: 'number',
    name: 'zip',
    label: 'Zip',
    mode: 'freeSoloMultiselect'
},
{
    type: 'string',
    name: 'pet',
    label: 'Pet',
    mode: 'combo',
    strict: true,
    value: '',
    optionsValue: ['yes', 'no']
},
]

export const client_input_buy_form_data = [{
    type: 'string',
    name: 'name',
    label: 'Name'
}, {
    type: 'string',
    name: 'last_name',
    label: 'Last Name'
}, {
    type: 'string',
    name: 'phone',
    label: 'Phone'
}, {
    type: 'email',
    name: 'email',
    label: 'Email'
}, {
    type: 'number',
    name: 'pre_approval',
    label: 'Pre Approval'
}, {
    type: 'number',
    name: 'bed',
    label: 'Bed',
    mode: 'freeSoloMultiselect'
}, {
    type: 'number',
    name: 'bath',
    label: 'Bath',
    mode: 'freeSoloMultiselect'
}, {
    type: 'number',
    name: 'zip',
    label: 'Zip',
    mode: 'freeSoloMultiselect'
},]