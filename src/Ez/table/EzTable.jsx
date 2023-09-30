import PropTypes from 'prop-types';
import classes from './EzTable.module.scss'
import EzThead from "./ezThead/EzThead.jsx";
import EzTBody from "./ezTBody/EzTBody.jsx";
import EzPagination from "./ezPagination/EzPagination.jsx";
import EzTForm from "./ezTForm/EzTForm.jsx";
import EzTToolbar from "./ezTToolbar/EzTToolbar.jsx";
import EzStack from "../stack/EzStack.jsx";

const EzTable = ({ state }) => {
    return (
        <>
            <EzStack sx={{height: '100%', border: '1px solid #ddd'}} gap='0'>
                <EzTToolbar state={state}/>
                <EzThead state={state}/>
                <EzTBody state={state}/>
                <EzPagination state={state}/>
            </EzStack>
            <EzTForm state={state}/>
        </>
    );
};

EzTable.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzTable;
