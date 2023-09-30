import PropTypes from "prop-types";
//
import {sortArray} from "../../../../../../../helper/index.js";
import {getFieldFromService} from "../editClientServiceForm/getFieldFromService.js";
import EzForm from "../../../../../../../Ez/ezForm/EzForm.jsx";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";

export default function LeftPersonalInfoEditForm({state, data, handleClose}) {
    const fields = getFieldFromService(data);

    return (
        <EzStack sx={{minWidth: '400px', maxWidth: '400px'}}>
            <EzForm
                fields={sortArray(fields, 'name')}
                state={state}
                data={data}
                handleClose={handleClose}
            />
        </EzStack>
    );
}

LeftPersonalInfoEditForm.propTypes = {
    data: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
}