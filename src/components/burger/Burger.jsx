import classes from './Burger.module.scss';
import {generalSliceActions} from "../../store/generalSlice.js";

export default function Burger() {
    return (
        <div
            onClick={() => window.dispatch(generalSliceActions.toggle())}
            className={classes['burger-container']}
        >
            <div className={classes['burger-bar']}/>
            <div className={classes['burger-bar']}/>
            <div className={classes['burger-bar']}/>
        </div>
    );
}