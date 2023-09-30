import PropTypes from "prop-types";
import EzStack from "../../Ez/stack/EzStack.jsx";

export default function ChildWrapper({children, sx, ...rest}) {
    return (
        <EzStack
            sx={{
                backgroundColor: '#fff',
                borderRadius: '4px',
                padding: '10px',
                ...sx,
                ...rest
            }}
            >
            {children}
        </EzStack>
    );
}

ChildWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
    sx: PropTypes.object
}