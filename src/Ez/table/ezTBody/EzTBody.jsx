import PropTypes from "prop-types";
import EzTActionColumn from "../ezTActionColumn/EzTActionColumn.jsx";
import classes from './EzTbody.module.scss'

const EzTBody = ({state}) => {
    return (
        state.id && <div className={classes['ez-table-wrapper']}>
            <div className={classes['ez-table-body']}>
                {state.data.map((row) => (
                    <div
                        className={`${classes['ez-table-row']} ${row[state.id] === state.focusRecord[state.id] ? 'selected' : ''}`}
                        key={row[state.id]}
                        onClick={(event) => state.handleRowClick(event, row)}
                    >
                        {[{
                            field: 'actions',
                            headerName: 'Actions',
                            width: 120,
                            sortable: false,
                            render: () => {
                                return <EzTActionColumn row={row} state={state}/>
                            }
                        }, ...state.columns].map(column => ({...column, editable: false})).map((column) => {
                            let style = {};
                            if (column.width) {
                                style.width = column.width;
                            } else {
                                style.flex = column.flex || 1;
                            }
                            return (
                                <div
                                    className={classes['ez-table-cell']}
                                    style={style}
                                    key={`${row[state.id]}-${column.headerName}`}
                                >
                                    {column.render ? column.render(row) : row[column.field]}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

EzTBody.propTypes = {
    state: PropTypes.object.isRequired
};


export default EzTBody;
