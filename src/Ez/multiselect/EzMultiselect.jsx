import classes from './EzMultiselect.module.scss';
import {useEffect, useReducer, useRef} from "react";
import EzStack from "../stack/EzStack.jsx";
import EzChip from "../chip/EzChip.jsx";
import EzTextField from "../textField/EzTextField.jsx";
import EzText from "../text/EzText.jsx";
import EzIconButton from "../iconButton/EzIconButton.jsx";
import {useOnClickOutside, useResizeObserver} from "../../helper/hooks/index.js";
import PropTypes from "prop-types";
import {capitalizeFirstLetter} from "../../helper/index.js";

/**
 * combo box - can select only one option
 * multiple - can select multiple values
 * freeSolo - can have multiple input values
 * multiple + freeSolo - can select multiple values and multiple input values
 * @param label - label for the input
 * @param placeholder
 * @param type - type of the input field
 * @param name - to update the values in the state
 * @param optionsValue - options to render
 * @param value - values of the field -> in combo mode the value is a string others two array
 * @param setValue - func to update the values
 * @param valueForIteration - value to use as iterator key in case of optionsValue be an array of objects,
 * and it is going to be unique, so we can use it as a key
 * @param mode - 'freeSoloMultiselect' | 'multiselect' | 'combo'
 * @param error - self-explanatory
 * @param helperText - self-explanatory
 * @param strict - in case of combo only pick option, without the 'delete' featured, because the field is bind
 * to a critical variable
 * @returns {JSX.Element}
 * @constructor
 */
export default function EzMultiselect({
    label,
    placeholder,
    name,
    optionsValue,
    value = '',
    setValue,
    valueForIteration,
    mode,
    type,
    error,
    helperText,
    strict
}) {
    const initialState = {
        toggleOption: false,
        options: optionsValue,
        lastOptionsFound: [],
        tempInputValue: ['combo'].includes(mode) ? value : '',
        lastInputValue: '',
    }
    const [state, setState] = useReducer((state, value) => (
        { ...state, ...value }
    ), initialState, undefined);
    const {toggleOption, options, tempInputValue, lastInputValue, lastOptionsFound} = state;
    //getting the multiselect height to place the options correctly and to detect click outside
    const multiselectRef = useRef(null);
    const inputRef = useRef(null);
    const multiselectHeight = useResizeObserver(multiselectRef)
    useOnClickOutside(multiselectRef, () => setState({toggleOption: false}));


    // update options
    useEffect(() => {
        let updatedOptions = [];
        // we had a value before we delete all characters means we have to restore all options
        // only un mode='combo'
        if(lastInputValue.length === 1 && lastInputValue.length > tempInputValue.length) {
            if(Array.isArray(value)) {
                setState({lastOptionsFound: []})
                updatedOptions = optionsValue.filter(option => {
                    return valueForIteration ?
                        !value.find(element => element[valueForIteration] === option[valueForIteration]) :
                        !value.find(element => element === option);
                })
            } else if (typeof value === 'string') {
                updatedOptions = optionsValue
            }
        } else if (tempInputValue) {
            // filter options
            let temp = []
            updatedOptions = Array.isArray(value) ?
                options.filter(option => {
                    if(valueForIteration) {
                        if(option[valueForIteration].toLowerCase().includes(tempInputValue.toLowerCase())) {
                            temp.push(option)
                            return option
                        }

                    } else {
                        if(option.toLowerCase().startsWith(tempInputValue.toLowerCase())) {
                            temp.push(option)
                            return option
                        }
                    }
                }) :
                optionsValue.filter(option => {
                    // if value has value means that the user already picked an option,
                    // so we return all remaining otherwise just filter
                    if(value.toLowerCase() === tempInputValue.toLowerCase()) {
                        return option.toLowerCase() !== tempInputValue.toLowerCase()
                    }
                    // ...string split it in characters to iterate over it and find if
                    // some keystroke is in it
                    return option.toLowerCase().startsWith(tempInputValue.toLowerCase())
                })
            setState({lastOptionsFound: temp.length > lastOptionsFound.length ? temp : lastOptionsFound})
        } else {
            // loading options
            updatedOptions = Array.isArray(value) ?
                optionsValue.filter(option => {
                    return valueForIteration ?
                        !value.find(element => element[valueForIteration] === option[valueForIteration]) :
                        !value.find(element => element === option);
                }) :
                optionsValue.filter(option => {
                    return value !== option;
                })
        }
        // update options and keep track of the last input value to check when user
        // delete all characters
        setState({options: updatedOptions, lastInputValue: tempInputValue})
    }, [tempInputValue, value]);

    // reset error message
    // useEffect(() => {
    //     const reset = setTimeout(() => {setState({tempError: ''})}, 2000)
    //     return () => clearTimeout(reset)
    // }, [tempError])

    const handleEnterKeyDown = (e) => {
        if(e.key === 'Enter' && ['freeSoloMultiselect'].includes(mode)) {
            if(tempInputValue) {
                if(name === 'zip') {
                    if(tempInputValue.length !== 5) {
                        return setValue({error: {where: name, message: 'zip must be 5 numbers'}})
                    }
                }
                // check if the new value exist
                const existedValue = value.findIndex(item => valueForIteration ?
                    item[valueForIteration].toLowerCase() === tempInputValue.toLowerCase() :
                    item.toLowerCase() === tempInputValue.toLowerCase())
                if(existedValue === -1) {
                    setValue({[name]: valueForIteration ?
                            [...value, {[valueForIteration] : tempInputValue}] :
                            [...value, tempInputValue],
                            clearError: name
                        }
                    )
                } else {
                    setValue({error: {where: name, message: 'This value was already added'}})
                }
                setState({tempInputValue: ''})
            }
        }
    }

    return (
        <EzStack
            ref={multiselectRef}
            id='multiselect'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            className={classes['multiselect']}
            onClick={() => {
                // always get the focus back
                inputRef.current.focus()
                if(!toggleOption) {
                    setState({toggleOption: true})
                }
            }}
        >
            <EzText
                className={classes['label']}
                text={`${label} ${error ? `- ${helperText}` : ''}`}
                sx={{
                    top: (value.length || tempInputValue || toggleOption) ? '-10px' : '',
                    color: error ? 'red' : value.length ? '#0f8f44' : ''
                }}
            />
            <div
                className={classes['fix-container']}
            >
                {Array.isArray(value) &&
                    value.map(item =>
                        <EzChip
                            key={valueForIteration ? item[valueForIteration] : item}
                            item={valueForIteration ? item[valueForIteration] : item}
                            onDelete={(selectedItem) => {
                                setValue({[name]: valueForIteration ?
                                        value.filter(i => i[valueForIteration].toLowerCase() !== selectedItem.toLowerCase()) :
                                        value.filter(i => i.toLowerCase() !== selectedItem.toLowerCase()),
                                    clearError: name
                                })
                                setState({options: [...options, item]})
                            }}
                        />
                    )
                }
                <EzTextField
                    ref={inputRef}
                    // required
                    type={type}
                    value={capitalizeFirstLetter(tempInputValue)}
                    multiselect={['freeSoloMultiselect', 'multiselect', 'combo'].includes(mode)}
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => setState({tempInputValue: e.target.value})}
                    onKeyDown={handleEnterKeyDown}
                />
            </div>

            {(toggleOption && ['freeSoloMultiselect', 'multiselect', 'combo'].includes(mode)) &&
                <EzStack
                    gap={0}
                    sx={{'--multiselectHeight': `${multiselectHeight.heightObserver}px`}}
                    className={classes['option-container']}
                >
                    {options.map(item =>
                        <EzText
                            cap
                            className={classes['option']}
                            key={valueForIteration ? item[valueForIteration] : item}
                            text={valueForIteration ? item[valueForIteration] : item}
                            onClick={() => {
                                setState({tempInputValue: ['combo'].includes(mode) ? item : ''})
                                setValue({[name]: ['combo'].includes(mode) ? item : [...value, item]})
                            }}
                        />
                    )}
                </EzStack>
            }

            <EzStack
                direction='row'
                alignItems='center'
            >
                {(value.length > 0 || tempInputValue) && !strict &&
                    <EzIconButton
                        btn
                        sx={{padding: '8px'}}
                        iconSx={{fontSize: '12px'}}
                        icon='faXmark'
                        onClick={() => {
                            setValue({[name]: ['multiselect', 'combo'].includes(mode) ? '' : []})
                            setState({options: optionsValue, tempInputValue: '', tempHelperText: '', tempError: false})
                            inputRef.current.focus()
                        }}
                    />
                }
                <EzIconButton
                    btn
                    onClick={(e) => {
                        e.stopPropagation();
                        setState({toggleOption: !toggleOption})
                    }}
                    iconSx={{fontSize: '12px'}}
                    sx={{
                        transform: `rotate(${(toggleOption) ? '180deg' : '0'})`,
                        transition: 'all .2s',
                        padding: '2px'
                    }}
                    icon='faCaretDown'
                />
            </EzStack>
        </EzStack>
    );
}

EzMultiselect.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    optionsValue: PropTypes.array,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    setValue: PropTypes.func,
    type: PropTypes.string,
    valueForIteration: PropTypes.string,
    mode: PropTypes.string.isRequired,
    strict: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
}

// examples
{/*done*/}
{/*<EzMultiselect*/}
{/*    mode='combo'*/}
{/*    name='test1'*/}
{/*    value={state.test1}*/}
{/*    label='Combo'*/}
{/*    setValue={setState}*/}
{/*    // valueForIteration='color'*/}
{/*    optionsValue={['yes', 'no', 'etc']}*/}
{/*/>*/}

{/*done*/}
{/*<EzMultiselect*/}
{/*    mode='multiselect'*/}
{/*    name='test2'*/}
{/*    value={state.test2}*/}
{/*    label='Multiselect'*/}
{/*    setValue={setState}*/}
{/*    optionsValue={['opt-1', 'best-2', 'fail-3', 'optimus-4']}*/}
{/*/>*/}

{/*/!*done*!/*/}
{/*<EzMultiselect*/}
{/*    mode='freeSoloMultiselect'*/}
{/*    name='test3'*/}
{/*    value={state.test3}*/}
{/*    label='FreeSoloMultiselect'*/}
{/*    setValue={setState}*/}
{/*    valueForIteration='size'*/}
{/*    optionsValue={sizeArray}*/}
{/*/>*/}