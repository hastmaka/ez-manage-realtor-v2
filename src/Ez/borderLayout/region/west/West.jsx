import Region from "../Region";
import PropTypes from "prop-types";

const West = ({component, ...rest}) => {

    return (
        <Region className='west' {...rest}>
            {component}
        </Region>
    )
};

West.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
};
export default West;