import PropTypes from "prop-types";

const South = ({ height, component }) => {

    const southStyle = {
        height: `${height}px`,
    };

    return <div className="south" style={southStyle}>{component}</div>;
};

South.propTypes = {
    height: PropTypes.number,
    component: PropTypes.element.isRequired,
};
export default South;
