import PropTypes from "prop-types";
//
import {getFieldFromService} from "./getFieldFromService.js";
import {sortArray} from "../../../../../../../helper/index.js";
import EzForm from "../../../../../../../Ez/ezForm/EzForm.jsx";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";

/**
 *
 * @param state - reducer
 * @param data - field values
 * @param handleClose - self-explanatory
 * @returns {JSX.Element}
 * @constructor
 */
export default function EditClientServiceForm({state, data, handleClose}) {
    const fields = getFieldFromService(state.selectedRow.service)

    return (
        <EzStack sx={{minWidth: '400px', maxWidth: '400px'}}>
            <EzForm
                fields={sortArray(fields, 'name')}
                state={state}
                data={data}
                editMode
                handleClose={handleClose}
            />
        </EzStack>
    );
}

EditClientServiceForm.propTypes = {
    state: PropTypes.object.isRequired,
    handleClose: PropTypes.func,
}
