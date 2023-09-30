import {useState, lazy, Suspense} from "react";
import PropTypes from "prop-types";
//
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";
import EzText from "../../../../../../../Ez/text/EzText.jsx";
import EzSpinner from "../../../../../../../Ez/spinner/EzSpinner.jsx";
import EzIconButton from "../../../../../../../Ez/iconButton/EzIconButton.jsx";
//dynamic import
const LeftPersonalInfoEditForm = lazy(() => import('./LeftPersonalInfoEditForm.jsx'))
const EzModal = lazy(() => import('../../../../../../../Ez/modal/EzModal.jsx'))

export default function LeftPersonalInfo({state}) {
    const {name, last_name, phone, email} = state.selectedRow;
    const [open, setOpen] = useState(false);

    return (
        <EzStack sx={{padding: '16px'}}>
            <EzStack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <EzText text={`Personal Information`}/>
                <EzIconButton
                    btn
                    icon='faPenToSquare'
                    onClick={() => {
                        state.handlePathToUpdate()
                        setOpen(true)
                    }}
                />
            </EzStack>
            <EzStack gap={2}>
                <EzStack>
                    <EzText text={`Name: ${name} ${last_name}`}/>
                    <EzText text='Last Update 2 days ago' sx={{color: '#999'}}/>
                </EzStack>
                <EzText text={`Phone: ${phone}`}/>
                <EzText text={`Email: ${email}`}/>
            </EzStack>

            {open && <Suspense fallback={<EzSpinner full/>}>
                <EzModal isOpen={open} onClose={() => setOpen(false)}>
                    <LeftPersonalInfoEditForm
                        state={state}
                        data={state.formData}
                        handleClose={() => setOpen(false)}
                    />
                </EzModal>
            </Suspense>}

        </EzStack>
    );
}

LeftPersonalInfo.propTypes = {
    state: PropTypes.object.isRequired,
}