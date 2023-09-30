// material
import {MenuItem, Select} from "@mui/material";
import {type_of_service} from "../../registration/client_form_help_text.js";
import WIWHChild_1 from "../../../components/EzComponent/EzWrapperInputWithHelp/WIWHChild_1.jsx";
import WIWHHelp from "../../../components/EzComponent/EzWrapperInputWithHelp/WIWHHelp.jsx";
import WIWHChild_2 from "../../../components/EzComponent/EzWrapperInputWithHelp/WIWHChild_2.jsx";
import WIWHParent from "../../../components/EzComponent/EzWrapperInputWithHelp/WIWHParent.jsx";
import PropTypes from "prop-types";

export default function ClientTypeOfService({typeOfService, setTypeOfService}) {
    return (
        <WIWHParent>
            <WIWHChild_1>
                <WIWHHelp
                    text='Service'
                    helpText={type_of_service}
                />
            </WIWHChild_1>
            <WIWHChild_2>
                <Select
                    variant="standard"
                    name='service'
                    value={typeOfService}
                    sx={{width: '100px'}}
                    onChange={e => setTypeOfService(e.target.value)}
                >
                    <MenuItem value='rent'>Rent</MenuItem>
                    <MenuItem value='buy'>Buy</MenuItem>
                </Select>
            </WIWHChild_2>
        </WIWHParent>
    );
}

ClientTypeOfService.propTypes = {
    typeOfService: PropTypes.string.isRequired,
    setTypeOfService: PropTypes.func.isRequired
}