import PropTypes from 'prop-types';
import './EzBox.css'

const EzBox = ({ children, style, ...rest }) => {

    if (style?.boxShadow && typeof style.boxShadow === 'number') {
        style.boxShadow = `0 0 ${style.boxShadow}px rgba(0, 0, 0, 0.2)`;
    }

    return (
        <div className="box" style={style} {...rest}>
            {children}
        </div>
    );
};

EzBox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
    style: PropTypes.object
};

export default EzBox;