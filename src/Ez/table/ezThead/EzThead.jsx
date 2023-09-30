import PropTypes from "prop-types";
import EzTActionColumn from "../ezTActionColumn/EzTActionColumn.jsx";
import classes from './EzThead.module.scss'

const EzThead = ({state}) => {

    const columns = [{
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
    }, ...state.columns].map(column => ({ ...column, editable: false }))
    return (
        state.id && <div className={classes['ez-table-header']} style={{ height: '56px' }}>
            {columns.map((column) => {
                let style = {};
                if (column.width) {
                    style.width = column.width;
                } else {
                    style.flex = column.flex || 1;
                }
                style.height = '40px';
                return (
                    <div className={classes['ez-table-cell']} style={style} key={column.headerName}>
                        <span>{column.headerName}</span>
                    </div>
                );
            })}
        </div>
    );

};

EzThead.propTypes = {
    state: PropTypes.object.isRequired
};
export default EzThead;