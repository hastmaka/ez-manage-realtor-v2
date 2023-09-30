import {useState} from "react";
import EzTextField from "../textField/EzTextField.jsx";

const EzGridFormFields = ({column, primaryId, padding, handleInputChange, state}) => {
    const [selectedOption, setSelectedOption] = useState(state.isAdding? true: '');

    let render = column.field !== primaryId && column.editor,
        field = null;
    if (render) {
        let editable = column.editor;
        if (editable?.type === 'combo') {
            let {id, label, value, store} = editable;
            if (selectedOption === '') {
                let defaultValue = store.filter(item => {
                    return item[id] === state.selectedRow[column.field]
                });
                if (defaultValue.length) {
                    setSelectedOption(defaultValue[0][id])
                } else {
                    setSelectedOption('1');
                }
            }

            const handleComboChange = (e) => {
                setSelectedOption(e.target.value);
                handleInputChange(e, column.field);
            };

            // field = <FormControl sx={{ width: '100%' }} key={column.field}>
            //     <InputLabel id={"dropdown-label-"+column.field} >{label || `Select an option`}</InputLabel>
            //     <Select
            //         value={selectedOption}
            //         onChange={handleComboChange}
            //         label={label || `Select an option`}
            //     >
            //         {editable.store.map(option => <MenuItem key={option.id} value={option[id]}>{option[value]}</MenuItem>)}
            //     </Select>
            // </FormControl>
        }
        else {
            field = <div key={column.field}>
                <EzTextField
                    padding={padding}
                    label={column.headerName}
                    value={state.selectedRow[column.field] || ''}
                    onChange={(e) => handleInputChange(e.target.value, column.field)}
                    error={!!state.formErrors[column.field]}
                    helperText={state.formErrors[column.field]}
                    // fullWidth
                />
            </div>
        }
    }
    return field
};

export default EzGridFormFields;