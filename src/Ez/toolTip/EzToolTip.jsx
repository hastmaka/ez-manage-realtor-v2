import { useState, useRef } from 'react';
import classes from './EzToolTip.module.scss';
import PropTypes from "prop-types";

export default function EzToolTip ({ children, delay = 100, content, direction }) {
    // debugger
    const timeoutRef = useRef(null);
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeoutRef.current = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        clearTimeout(timeoutRef.current);
        setActive(false);
    };

    return (
        <div
            style={{'--tooltip-margin': ['top', 'bottom'].includes(direction) ? '30px' : '10px'}}
            className={classes['tooltip-wrapper']}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && (
                <div className={`${classes['tooltip-tip']} ${classes[direction] || classes['right']}`}>
                    {content}
                </div>
            )}
        </div>
    );
}


EzToolTip.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
    delay: PropTypes.number,
    content: PropTypes.string.isRequired,
    direction: PropTypes.string
}