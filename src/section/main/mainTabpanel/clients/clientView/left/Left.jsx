import PropTypes from "prop-types";
//
import LeftPersonalInfo from "./leftPersonalInfo/LeftPersonalInfo.jsx";
import LeftService from "./LeftService.jsx";
import EzStack from "../../../../../../Ez/stack/EzStack.jsx";
import EzDivider from "../../../../../../Ez/divider/EzDivider.jsx";

export default function Left({state}) {
    return (
        <EzStack
            sx={{
                flex: 1,
                borderRight: '1px solid #cfcfcf',
                gap: '16px',
                maxWidth: '250px',
                minWidth: '250px'
            }}
            // gap={'0px'}
        >
            <LeftPersonalInfo state={state}/>
            <EzDivider/>
            <LeftService state={state}/>
        </EzStack>
    );
}

Left.propTypes = {
    state: PropTypes.object.isRequired,
}