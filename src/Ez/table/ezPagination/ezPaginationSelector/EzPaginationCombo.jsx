import PropTypes from 'prop-types';
import classes from '../EzPagination.module.scss'

const EzPaginationCombo = ({ state }) => {
    return (
        state.id && <div className={classes['pagination-dropdown']}>
            <select
                className={classes['pagination-select']}
                value={state.paginationModel.pageSize}
                onChange={(event) => {
                    state.handlePageSizeChange({
                        pageSize: parseInt(event.target.value),
                        page: 0,
                    })}
                }
            >
                {state.pageSizeOptions.map((option) => (
                    <option value={option.value} key={option.id}>
                        {option.value}
                    </option>
                ))}
            </select>
            <span className={classes['arrow']}>&#9662;</span>
        </div>
    );
};

EzPaginationCombo.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzPaginationCombo;