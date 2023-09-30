import {lazy, Suspense, useState} from "react";
import PropTypes from "prop-types";
//
import Service from "./service/Service.jsx";
import EzStack from "../../../../../../Ez/stack/EzStack.jsx";
import {capitalizeFirstLetter} from "../../../../../../helper/index.js";
import EzText from "../../../../../../Ez/text/EzText.jsx";
import EzSpinner from "../../../../../../Ez/spinner/EzSpinner.jsx";
import EzIconButton from "../../../../../../Ez/iconButton/EzIconButton.jsx";
//dynamic import
const EditClientServiceForm = lazy(() => import('./editClientServiceForm/EditClientServiceForm.jsx'))
const EzModal = lazy(() => import('../../../../../../Ez/modal/EzModal.jsx'))

export default function LeftService({state}) {
    const [open, setOpen] = useState(false);

    return (
        <EzStack sx={{padding: '16px'}}>
            <EzStack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <EzText text={`Services: ${capitalizeFirstLetter(state.selectedRow.service.type)}`}/>
                <EzIconButton
                    btn
                    icon='faPenToSquare'
                    onClick={() => {
                        // set the path to update correctly
                        state.handlePathToUpdate('service')
                        setOpen(true)
                    }}
                />
            </EzStack>

            <Service service={state.selectedRow.service}/>

            {open && <Suspense fallback={<EzSpinner full/>}>
                <EzModal isOpen={open} onClose={() => setOpen(false)}>
                    <EditClientServiceForm
                        state={state}
                        data={state.formData}
                        handleClose={() => setOpen(false)}
                    />
                </EzModal>
            </Suspense>}

        </EzStack>
    );
}

LeftService.propTypes = {
    state: PropTypes.object.isRequired
}