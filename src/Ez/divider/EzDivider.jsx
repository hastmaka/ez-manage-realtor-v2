import classes from './EzDivider.module.scss';
import EzText from "../text/EzText.jsx";
import PropTypes from "prop-types";

export default function EzDivider({ children, position = 'center', orientation = 'horizontal', variant, color }) {
    let style = position === 'left' ? {'--margin-left': '10%', '--margin-right': '90%'} :
                position === 'right' ? {'--margin-left': '90%', '--margin-right': '10%'} :
                position === 'center' ? {'--margin-left': '100%', '--margin-right': '100%'} : {};

    if(color) {
        style = {'--color': color}
    }

    if (children) {
        return (
            <div
                className={`
                    ${orientation === 'horizontal' ? classes['horizontal'] : classes['vertical-children']}
                    ${variant === 'middle' ? classes['middle'] : ''}
                `}
                style={style}
            >
                <EzText text={children} color={color}/>
            </div>
        );
    } else {
        return (
            <hr
                className={`
                    ${classes['divider']}
                    ${orientation === 'vertical' ? classes['vertical'] : ''}
                    ${variant === 'middle' ? classes['middle'] : ''}
                `}
            />
        );
    }
}

EzDivider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
    position: PropTypes.string,
    variant: PropTypes.string,
    orientation: PropTypes.string,
}