import classes from './EzSpinner.module.scss';
import PropTypes from "prop-types";

export default function EzSpinner({full}) {
    if(full) {
        return (
            <div className={classes['full']}>
                <div className={classes['loader']}/>
            </div>
        );
    } else {
        return <div className={classes['loader']}/>
    }
}

EzSpinner.propTypes = {
    full: PropTypes.bool
}