// import classes from './Test.module.scss';

import EzStack from "../../Ez/stack/EzStack.jsx";
import EzToolTip from "../../Ez/toolTip/EzToolTip.jsx";
import EzIconButton from "../../Ez/iconButton/EzIconButton.jsx";
import EzMultiselect from "../../Ez/multiselect/EzMultiselect.jsx";
import {useEffect, useState} from "react";
import {dummyData} from "./dummyData.js";
import {dummyToDb} from "../../helper/firebase/FirestoreApi.js";
import {generalSliceActions} from "../../store/generalSlice.js";

export default function Test() {
    // const [state, setState] = useState({
    //     test: 'rent',
    //     test1: []
    // })

    const fixData = dummyData.map(item => {
        const {id, ...rest} = item
        return {...rest, active: true}
    })
    return (
        <EzStack centered sx={{position: 'relative'}}>
            {/*<EzMultiselect*/}
            {/*    label='Service*'*/}
            {/*    mode='combo'*/}
            {/*    type='string'*/}
            {/*    name='test'*/}
            {/*    optionsValue={['rent', 'buy']}*/}
            {/*    value={state.test}*/}
            {/*    // strict*/}
            {/*    setValue={(value) => setState(value)}*/}
            {/*/>*/}

            <div>
                <button onClick={() => dummyToDb(fixData)}>toDB</button>
            </div>

            <button
                onClick={() => window.dispatch(generalSliceActions.openToast('test message'))}
            >show toast</button>

        </EzStack>
    );
}