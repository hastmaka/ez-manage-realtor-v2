import React from "react";
//import classes from './EzStack.module.scss';

import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const EzStack = React.forwardRef(
    ({ children, direction, alignItems, justifyContent, flex, gap, sx, b, centered, ...rest }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    display: 'flex',
                    flexDirection: direction || 'column',
                    alignItems: centered ? 'center' : alignItems || null,
                    justifyContent: centered ? 'center' : justifyContent || null,
                    gap: gap ? `${gap * 8}px` : null,
                    flex: flex || '',
                    border: b ? '1px solid #999' : null,
                    height: centered ? '100%' : null,
                    ...sx
                }}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

export default EzStack;

EzStack.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array,
        PropTypes.string
    ]),
    direction: PropTypes.string,
    alignItems: PropTypes.string,
    justifyContent: PropTypes.string,
    flex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    gap: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    sx: PropTypes.object,
    b: PropTypes.bool,
    centered: PropTypes.bool,
}