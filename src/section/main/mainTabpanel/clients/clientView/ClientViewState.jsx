import {useEffect, useReducer} from "react";
import {getService} from "../../../../../../../ez-test/src/helper/firebase/FirestoreApi.js";
import {clientServiceByType} from "../../../../../helper/index.js";

export default function ClientViewState(initialData) {
    const initialState = {
        data: initialData,
        service: [],
        clientServiceState: false,
        //accordion
        expanded: null,
        childExpanded: null,
        documentRefId: '',
        tempService: {},
        open: false
    }
    const [state, setState] = useReducer((state, value) => (
        {...state, ...value}
    ), initialState, undefined);
    const {
        data,
        childExpanded,
        open
    } = state;

    const handleDialog = () => setState({open: !open});
    const handleTempService = (section) => {
        setState({tempService: section})
    };
    const handleExpanded = (serviceName) => (event, newExpanded) => {
        if(childExpanded) setState({ childExpanded: null })

        setState({expanded: newExpanded ? serviceName : false});
    };
    const handleExpandedChild = (subServiceName) => (e, newExpanded) => {
        setState({childExpanded: newExpanded ? subServiceName : false});
    };

    useEffect(() => {
        getService(data.id, 'services')
            .then((res) => {
                setState({
                    service: clientServiceByType(res),
                    clientServiceState: true,
                    documentRefId: res[0].id || ''
                })
            })
            .catch(err => {
                console.log('Client View', err)
            })
    }, [state.data.id])



    return {
        ...state,
        handleTempService,
        handleExpanded,
        handleExpandedChild,
        handleDialog
    }
}
