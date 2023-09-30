// import classes from './EzMultiselect.module.scss';
// import {useEffect, useReducer, useRef} from "react";
// import EzStack from "../stack/EzStack.jsx";
// import EzChip from "../chip/EzChip.jsx";
// import EzTextField from "../textField/EzTextField.jsx";
// import EzText from "../text/EzText.jsx";
// import EzIconButton from "../iconButton/EzIconButton.jsx";
// import {useOnClickOutside, useResizeObserver} from "../../helper/hooks/index.js";
// import PropTypes from "prop-types";
// import {capitalizeFirstLetter} from "../../helper/index.js";
//
// /**
//  * combo box - can select only one option
//  * multiple - can select multiple values
//  * freeSolo - can have multiple input values
//  * multiple + freeSolo - can select multiple values and multiple input values
//  * @param label - label for the input
//  * @param type - type of the input field
//  * @param name - to update the values in the state
//  * @param optionsValue - options to render
//  * @param value - values of the field
//  * @param setValue - func to update the values
//  * @param valueForIteration - value to use as iterator key in case of optionsValue be an array of objects,
//  * and it is going to be unique, so we can use it as a key
//  * @param mode
//  * @returns {JSX.Element}
//  * @constructor
//  */
// export default function EzMultiselect({
//                                           label,
//                                           name,
//                                           optionsValue,
//                                           value,
//                                           setValue,
//                                           type,
//                                           valueForIteration,
//                                           mode
//                                       }) {
//     const initialState = {
//         toggleOption: false,
//         options: optionsValue,
//         lastKeyStrokeFound: '',
//         lastOptionsFound: [],
//         tempInputValue: '',
//         lastInputValue: ''
//     }
//     const [state, setState] = useReducer((state, value) => (
//         { ...state, ...value }
//     ), initialState, undefined);
//     const {toggleOption, options, tempInputValue, lastInputValue, lastOptionsFound} = state;
//     //getting the multiselect height to place the options correctly and to detect click outside
//     const multiselectRef = useRef(null);
//     const inputRef = useRef(null);
//     const multiselectHeight = useResizeObserver(multiselectRef)
//     useOnClickOutside(multiselectRef, () => setState({toggleOption: false}));
//     console.log(lastOptionsFound)
//     // update options
//     useEffect(() => {
//         let updatedOptions = [];
//         // we had a value before we delete all characters means we have to restore all options
//         // only un mode='combo'
//         if(lastInputValue.length === 1 && lastInputValue.length > tempInputValue.length) {
//             if(Array.isArray(value)) {
//                 setState({lastOptionsFound: []})
//                 updatedOptions = optionsValue.filter(option => {
//                     return valueForIteration ?
//                         !value.find(element => element[valueForIteration] === option[valueForIteration]) :
//                         !value.find(element => element === option);
//                 })
//             } else if (typeof value === 'string') {
//                 updatedOptions = optionsValue
//             }
//         } else if (tempInputValue) {
//             if(lastInputValue.length > tempInputValue.length) {
//                 updatedOptions = lastOptionsFound
//             } else {
//                 // filter options
//                 let temp = []
//                 updatedOptions = Array.isArray(value) ?
//                     options.filter(option => {
//                         if(valueForIteration) {
//                             // debugger
//                             if(option[valueForIteration].toLowerCase().includes(tempInputValue.toLowerCase())) {
//                                 temp.push(option)
//                                 return option
//                             }
//
//                         } else {
//                             if([...option].includes(tempInputValue.toLowerCase())) {
//                                 temp.push(option)
//                                 return option
//                             }
//                             // return [...option].includes(tempInputValue.toLowerCase())
//                         }
//                     }) :
//                     optionsValue.filter(option => {
//                         // if value has value means that the user already picked an option,
//                         // so we return all remaining otherwise just filter
//                         if(value.toLowerCase() === tempInputValue.toLowerCase()) {
//                             return option.toLowerCase() !== tempInputValue.toLowerCase()
//                         }
//                         // ...string split it in characters to iterate over it and find if
//                         // some keystroke is in it
//                         return [...option].includes(tempInputValue.toLowerCase())
//                     })
//                 setState({lastOptionsFound: temp.length > lastOptionsFound.length ? temp : lastOptionsFound})
//             }
//         } else {
//             // loading options
//             updatedOptions = Array.isArray(value) ?
//                 optionsValue.filter(option => {
//                     return valueForIteration ?
//                         !value.find(element => element[valueForIteration] === option[valueForIteration]) :
//                         !value.find(element => element === option);
//                 }) :
//                 optionsValue.filter(option => {
//                     return value !== option;
//                 })
//         }
//         // update options and keep track of the last input value to check when user
//         // delete all characters
//         setState({options: updatedOptions, lastInputValue: tempInputValue})
//     }, [tempInputValue, value])
//
//     const handleEnterKeyDown = (e) => {
//         if(e.key === 'Enter' && ['freeSoloMultiselect'].includes(mode)) {
//             // check if the new value exist
//             const existedValue = value.findIndex(item => valueForIteration ?
//                 item[valueForIteration].toLowerCase() === tempInputValue.toLowerCase() :
//                 item.toLowerCase() === tempInputValue.toLowerCase())
//             if(existedValue === -1) {
//                 // debugger
//                 setValue({[name]: valueForIteration ?
//                         [...value, {[valueForIteration] : tempInputValue}] :
//                         [...value, tempInputValue]}
//                 )
//             }
//             setState({tempInputValue: ''})
//         }
//     }
//
//     return (
//         <EzStack
//             ref={multiselectRef}
//             id='multiselect'
//             direction='row'
//             alignItems='center'
//             justifyContent='space-between'
//             className={classes['multiselect']}
//             onClick={() => {
//                 // always get the focus back
//                 inputRef.current.focus()
//                 if(!toggleOption) {
//                     setState({toggleOption: true})
//                 }
//             }}
//         >
//             <EzStack
//                 className={classes['fix-container']}
//                 direction='row'
//                 flex='1'
//             >
//                 {Array.isArray(value) &&
//                     value.map(item =>
//                         <EzChip
//                             key={valueForIteration ? item[valueForIteration] : item}
//                             item={valueForIteration ? item[valueForIteration] : item}
//                             onDelete={(selectedItem) => {
//                                 setValue({[name]: valueForIteration ?
//                                         value.filter(i => i[valueForIteration].toLowerCase() !== selectedItem.toLowerCase()) :
//                                         value.filter(i => i.toLowerCase() !== selectedItem.toLowerCase())
//                                 })
//                                 setState({options: [...options, item]})
//                             }}
//                         />
//                     )
//                 }
//                 <EzStack
//                     className={classes['input-container']}
//                     justifyContent='center'
//                 >
//                     <EzTextField
//                         ref={inputRef}
//                         required
//                         value={tempInputValue}
//                         multiselect={['freeSoloMultiselect', 'multiselect', 'combo'].includes(mode)}
//                         name={name}
//                         type={type}
//                         label={label}
//                         onChange={(va) => setState({tempInputValue: va[name]})}
//                         onKeyDown={handleEnterKeyDown}
//                     />
//                 </EzStack>
//             </EzStack>
//
//             {(toggleOption && ['freeSoloMultiselect', 'multiselect', 'combo'].includes(mode)) &&
//                 <EzStack
//                     gap='0'
//                     sx={{'--multiselectHeight': `${multiselectHeight.heightObserver}px`}}
//                     className={classes['option-container']}
//                 >
//                     {options.map(item =>
//                         <EzText
//                             cap
//                             className={classes['option']}
//                             key={valueForIteration ? item[valueForIteration] : item}
//                             text={valueForIteration ? item[valueForIteration] : item}
//                             onClick={() => {
//                                 setState({tempInputValue: ['combo'].includes(mode) ? capitalizeFirstLetter(item) : ''})
//                                 setValue({[name]: ['combo'].includes(mode) ? item : [...value, item]})
//                             }}
//                         />
//                     )}
//                 </EzStack>
//             }
//
//             <EzStack
//                 direction='row'
//                 alignItems='center'
//             >
//                 {(value.length > 0 || tempInputValue) &&
//                     <EzIconButton
//                         sx={{padding: '8px'}}
//                         iconSx={{fontSize: '12px'}}
//                         icon='faXmark'
//                         onClick={() => {
//                             setValue({[name]: ['multiselect', 'combo'].includes(mode) ? '' : []})
//                             setState({options: optionsValue, tempInputValue: ''})
//                             inputRef.current.focus()
//                         }}
//                     />
//                 }
//                 <EzIconButton
//                     onClick={() => {
//                         setState({toggleOption: !toggleOption})
//                     }}
//                     iconSx={{fontSize: '12px'}}
//                     sx={{
//                         transform: `rotate(${(toggleOption) ? '180deg' : '0'})`,
//                         transition: 'all .2s',
//                         padding: '2px'
//                     }}
//                     icon='faCaretDown'
//                 />
//             </EzStack>
//         </EzStack>
//     );
// }
//
// EzMultiselect.propTypes = {
//     label: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     optionsValue: PropTypes.array,
//     value: PropTypes.oneOfType([
//         PropTypes.array,
//         PropTypes.string
//     ]),
//     setValue: PropTypes.func.isRequired,
//     type: PropTypes.string,
//     valueForIteration: PropTypes.string,
//     mode: PropTypes.string.isRequired
// }