import PropTypes from "prop-types";
import Region from "../Region.jsx";

const East = ({component, ...rest}) => {

    return (
        <Region className='east' {...rest}>
            {component}
        </Region>
    )
};

East.propTypes = {
    component: PropTypes.element,
};
export default East;
