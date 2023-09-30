import classes from './Region.module.scss';
import PropTypes from "prop-types";

const Region = ({centered, flex, children, className, ...rest }) => {
// debugger
    const regionStyle = {
        display: centered? 'flex' : 'block',
        alignItems: centered? 'center' : '',
        justifyContent: centered? 'center' : '',
        flex: flex,
        ...rest
    };

    return (
        <>
            <div className={classes[className]} style={regionStyle}>
                {children}
            </div>
        </>

    );
};

Region.propTypes = {
    width: PropTypes.string,
    flex: PropTypes.number,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
    className: PropTypes.string,
    center: PropTypes.bool
};

export default Region;