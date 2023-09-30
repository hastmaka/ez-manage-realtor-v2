import EzStack from "../stack/EzStack.jsx";
import PropTypes from "prop-types";
import EzText from "../text/EzText.jsx";
import EzIconButton from "../iconButton/EzIconButton.jsx";
import EzToolTip from "../toolTip/EzToolTip.jsx";

export default function ComponentWithHelp({text, helpText, component, sx, ...rest}) {
    return (
        <EzStack
            direction='row'
            alignItems='center'
            sx={{minHeight: '52px', ...sx}}
            {...rest}
        >
            {/*left*/}
            <EzStack
                direction='row'
                alignItems='center'
            >
                <EzText cap text={text}/>
                <EzToolTip content={helpText} direction='bottom'>
                    <EzIconButton btn icon='faCircleQuestion' iconSx={{fontSize: '14px'}}/>
                </EzToolTip>
            </EzStack>
            {/*right*/}
            {component}
        </EzStack>
    );
}

ComponentWithHelp.propTypes = {
    // children: PropTypes.arrayOf(PropTypes.node).isRequired,
    sx: PropTypes.object
}