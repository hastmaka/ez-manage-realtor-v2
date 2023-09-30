import { useEffect, useState } from 'react';
import {getReducer} from "../../Ez/reducerStorage/reducerStorage.js";
import PropTypes from "prop-types";

export default function useReducerData (reducerName, avoidTimeOut) {
    const [data, setData] = useState({});

    useEffect(() => {
        getReducer(reducerName, (reducer) => {
            if (avoidTimeOut) {
                setData(reducer)
            } else {
                setTimeout(() => setData(reducer), 0)
            }
        });
    }, [])

    return data;
};

useReducerData.propTypes = {
    reducerName: PropTypes.string.isRequired
}

// useEffect(() => {
//     getReducer(reducerName, (reducer) => {
//         setTimeout(() => setData(reducer), 0)
//     });
// }, [])