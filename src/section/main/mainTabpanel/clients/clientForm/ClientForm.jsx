import EzStack from "../../../../../Ez/stack/EzStack.jsx";
import EzForm from "../../../../../Ez/ezForm/EzForm.jsx";
import {client_input_buy_form_data, client_input_rent_form_data} from "./client_form_data.jsx";
import {useLayoutEffect, useState} from "react";
import PropTypes from "prop-types";

export default function ClientForm({state}) {
    const [service, setService] = useState('rent')
    const [formFields, setFormFields] = useState(null)

    useLayoutEffect(() => {
        //get service
        const formField =  service === 'rent' ? client_input_rent_form_data : client_input_buy_form_data
        state.updateFieldsDataAndServiceName(formField, service)
        setFormFields(formField)
    }, [service])

    return (
        <>
        {formFields && <EzStack
                sx={{
                    margin: '0 auto',
                    justifyContent: 'center',
                    padding: '15px',
                    width: '30rem',
                }}
            >
                <EzForm
                    state={state}
                    fields={formFields}
                    setService={(value) => setService(value.service)}
                    service={service}
                />
            </EzStack>}
        </>
    );
}


ClientForm.propTypes = {
    state: PropTypes.object.isRequired
}