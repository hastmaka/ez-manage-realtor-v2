import PropTypes from "prop-types";

const North = ({ height, component }) => {

    const northStyle = {
        height: `${height}px`,
    };

    return <div className="north" style={northStyle}>{component}</div>;
};

North.propTypes = {
    height: PropTypes.number,
    component: PropTypes.element.isRequired,
};
export default North;

