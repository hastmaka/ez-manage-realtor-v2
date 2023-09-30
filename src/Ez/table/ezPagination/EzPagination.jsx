import PropTypes from 'prop-types';
import EzPaginationButton from "./ezPaginationButton/EzPaginationButton.jsx";
import EzPaginationCombo from "./ezPaginationSelector/EzPaginationCombo.jsx";
import classes from './EzPagination.module.scss'

const EzPagination = ({state}) => {
    return (
        <div className={classes['pagination']}>
            <div className={classes['buttons-wrapper-left']}/>
            <div className={classes['buttons-wrapper-right']}>
                <EzPaginationCombo state={state}/>
                <EzPaginationButton state={state}/>
            </div>
        </div>
    );
};

EzPagination.propTypes = {
    state: PropTypes.object.isRequired
};


export default EzPagination;