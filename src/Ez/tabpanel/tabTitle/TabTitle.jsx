import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import {useState} from "react";
import EzStack from "../../stack/EzStack.jsx";

const TabTitle = ({ icon, title, margin = '0 20px 0 0', fontSize = '18px', style, onClick, toggle, vertical }) => {
    const selectedIcon = icons[icon];
    const [isTabHovered, setIsTabHovered] = useState(false);
    // debugger
    const tabStyle = {
        padding: '15px',
        minHeight: '54px',
        cursor: 'pointer',
        color: isTabHovered? '#fff' : '#acb2b7',
        backgroundColor: isTabHovered? '#46525f' : 'transparent',
        fontSize: '18px',
    }

    let iconStyle = {margin: margin, fontSize};
    if (style) iconStyle = style

    const showTitle = () => {
        if(title && !vertical) {
            return <span style={{fontSize}}>{title}</span>
        } else if (!toggle) {
            return <span style={{fontSize}}>{title}</span>
        } else {
            return null
        }
    }

    return (
        <EzStack
            direction='row'
            alignItems='center'
            sx={{...tabStyle}}
            onMouseEnter={() => setIsTabHovered(true)}
            onMouseLeave={() => setIsTabHovered(false)}
            onClick={onClick}
        >
            {selectedIcon && <FontAwesomeIcon icon={selectedIcon} style={iconStyle}/>}
            {showTitle()}
        </EzStack>
    );
};

TabTitle.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    margin: PropTypes.string,
    fontSize: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    toggle: PropTypes.bool,
    ver: PropTypes.bool,
};
export default TabTitle;