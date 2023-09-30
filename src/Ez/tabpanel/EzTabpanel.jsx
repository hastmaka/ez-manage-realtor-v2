import {useState} from 'react';
import PropTypes from "prop-types";
import TabTitle from "./tabTitle/TabTitle.jsx";
import {useSelector} from "react-redux";
import LoginReducer from '../../section/login/LoginReducer.js';

const EzTabpanel = ({tabs, tabIndex, onTabClick, heightGap, orientation, main}) => {
    const state = LoginReducer()
    const {burger} = useSelector(state => state.general)
    const [activeTab, setActiveTab] = useState(tabs[tabIndex || 0]);
    const vertical = orientation === 'vertical';
    const tabPanelStyles = {
        display: 'flex',
        height: vertical ? `calc(100vh - ${heightGap || 0}px)` : '',
        flexDirection: vertical ? 'row' : 'column',
        flex: vertical ? '' : '100%',
        backgroundColor: '#f2f2f2',
    }

    const sideBarStyle = {
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: vertical ? '' : 'center',
        justifyContent: 'space-between',
        // to avoid conflict
        minWidth: vertical ? burger.toggle ? '50px' : '200px' : '',
        maxWidth: vertical ? burger.toggle ? '50px' : '200px' : '',
        minHeight: vertical ? '' : '50px',
        maxHeight: vertical ? '' : '50px',
        backgroundColor: '#323f4d',
        transition: 'all 200ms'
    }

    const tabContentStyle = {
        // backgroundColor: '#e2e2e2e2',
        padding: '10px',
        flexGrow: 1
    }

    const onHandleTabClick = (tab) => {
        if (activeTab.id !== tab.id) {
            setActiveTab(() => {
                if (onTabClick) {
                    onTabClick(tab)
                }
                return tab;
            });
        }
    };

    return (
        <div style={{...tabPanelStyles}}>
            <div style={{...sideBarStyle}}>
                <div>
                    {tabs.map((tab) => (
                        <TabTitle
                            onClick={() => onHandleTabClick(tab)}
                            key={tab.id}
                            title={tab.title}
                            icon={tab.icon}
                            vertical={vertical}
                            toggle={burger.toggle}
                        />
                    ))}
                </div>
                
                {main && <TabTitle
                    onClick={() => state.handleSignOut()}
                    title={!burger.toggle ? 'Log out' : ''}
                    icon='faArrowRightFromBracket'
                />}

            </div>
            <div style={{...tabContentStyle}}>
                {activeTab.component}
            </div>
        </div>
    );
};

EzTabpanel.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
    tabIndex: PropTypes.number.isRequired,
    onTabClick: PropTypes.func.isRequired,
    heightGap: PropTypes.number,
    orientation: PropTypes.string,
    main: PropTypes.bool
};

export default EzTabpanel;