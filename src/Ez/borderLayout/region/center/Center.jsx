import Region from "../Region";
import PropTypes from "prop-types";

const Center = ({component, ...rest}) => {
    return (
        <Region className='center' {...rest}>
            {component}
        </Region>
    )
};

Center.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
};

export default Center;
