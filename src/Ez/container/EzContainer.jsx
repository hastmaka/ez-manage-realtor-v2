import './EzContainer.css';
import PropTypes from "prop-types";

const EzContainer = ({ children }) => {
    return <div className="ez-container">{children}</div>;
};

EzContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
};
export default EzContainer;