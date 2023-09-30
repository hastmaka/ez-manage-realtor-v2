import React from 'react';
import PropTypes from 'prop-types';
import EzButton from "../../button/EzButton.jsx";
import classes from './EzTToolBar.module.scss'

const EzTToolbar = ({ state }) => {
    return (
        state.id && state.toolbar && <div className={classes['ez-table-toolbar']}>
            {state.addButton &&
                <EzButton
                    type="iconText"
                    text={state.formTitle.add || 'Add Row'}
                    icon="faPlus"
                    onClick={state.handleAddRow}
                    style={{padding: '10px', border: "none", cursor: 'pointer'}}
                />
            }
            {state.filterInput && <input type="text" placeholder="Search"/>}
        </div>
    );
};

EzTToolbar.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzTToolbar;