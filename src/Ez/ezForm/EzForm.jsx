import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "../../helper/index.js";
import EzStack from "../stack/EzStack.jsx";
import EzText from "../text/EzText.jsx";
import EzTextField from "../textField/EzTextField.jsx";
import EzButton from "../button/EzButton.jsx";
import EzMultiselect from "../multiselect/EzMultiselect.jsx";
import ComponentWithHelp from "../componentWithHelp/ComponentWithHelp.jsx";

/**
 *
 * @param state - initialState from reducer
 * @param fields - fields to render the form
 * @param editMode - check if the form was created in editMode to perform certain actions
 * @param rest - (title, handleClose)
 * @returns {JSX.Element}
 * @constructor
 */

export default function EzForm({state, fields, editMode, ...rest}) {
    /* debugger */

    return (
        <>
            {rest.title !== 'Sign in' && <EzStack alignItems='center' sx={{padding: '12px 0 20px 0'}}>
                <EzText
                    text={rest.title ? rest.title : editMode ? `Editing` : 'Application'}
                    size={20}
                />
            </EzStack>}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    // width: '400px'
                }}
            >
                {!state.isEditing && rest.from !== 'login' && <ComponentWithHelp
                    text='service'
                    helpText='Chose a service'
                    component={<EzMultiselect
                        label='Service'
                        mode='combo'
                        type='string'
                        name='service'
                        optionsValue={['rent', 'buy']}
                        value={rest.service}
                        strict
                        setValue={rest.setService}
                    />}
                />}
                {fields.map(item => {
                    if (item.name === 'phone') {
                        return <EzTextField
                            key={item.name}
                            required
                            error={Object.prototype.hasOwnProperty.call(state.formErrors, item.name)}
                            helperText={state.formErrors[item.name]}
                            type={item.type}
                            name={item.name}
                            label={item.label}
                            value={state.formData[item.name]}
                            placeholder='(xxx)-xxx-xxxx'
                            onChange={state.handleInputChange}
                        />
                    } else if(['freeSoloMultiselect', 'multiselect', 'combo'].includes(item.mode)) {
                        return <EzMultiselect
                            key={item.name}
                            error={Object.prototype.hasOwnProperty.call(state.formErrors, item.name)}
                            helperText={state.formErrors[item.name]}
                            label={`${capitalizeFirstLetter(item.name)} *`}
                            mode={item.mode}
                            placeholder={item.mode !== 'combo' ? 'Place the value and hit Enter' : ''}
                            type={item.type}
                            name={item.name}
                            strict={item.strict}
                            optionsValue={item.optionsValue || ['Any']}
                            value={state.formData[item.name]}
                            setValue={state.handleInputChange}
                        />
                    } else {
                        return <EzTextField
                            key={item.name}
                            required
                            error={Object.prototype.hasOwnProperty.call(state.formErrors || null, item.name)}
                            helperText={state.formErrors[item.name]}
                            autoFocus={item.name === 'name'}
                            type={item.type}
                            name={item.name}
                            label={item.label}
                            value={state.formData[item.name] || ''}
                            onChange={state.handleInputChange}
                        />
                    }
                })}

                <EzButton
                    text='Submit'
                    variant='confirm'
                    fullWidth
                    loading={state.isLoading}
                    onClick={(e) => {
                        if(state.isEditing) {
                            rest.handleClose()
                        }
                        state.handleSubmit(e, state.isEditing)
                    }}
                />
                {rest.title !== 'Sign in' && <EzButton
                    text='Cancel'
                    variant='cancel'
                    onClick={() => {
                        if(state.isEditing) {
                            return rest.handleClose()
                        }
                        state.handleCloseModal()
                    }}
                />}
            </div>
        </>
    );
}

EzForm.propTypes = {
    title: PropTypes.string,
    state: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    fields: PropTypes.array.isRequired,
    handleClose: PropTypes.func
}
