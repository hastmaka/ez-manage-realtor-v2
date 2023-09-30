import PropTypes from "prop-types";

const EzStackGrid = ({ children, component = "div", gap, direction = "column", ...rest}) => {
    let Component = component;
    const stackStyle = {
        display: "grid",
        gridTemplateRows: direction === "column" ? `repeat(${children.length}, 1fr)` : "1fr",
        gridTemplateColumns: direction === "row" ? `repeat(${children.length}, 1fr)` : "1fr",
        gap: `${gap * 8}px`,
        height: '100%'
    };

    return (
        <Component style={stackStyle} className="stack" {...rest}>
            {children}
        </Component>
    );
};

EzStackGrid.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
    component: PropTypes.elementType,
    direction: PropTypes.oneOf(["column", "row"]),
    gap: PropTypes.number,
};

export default EzStackGrid;