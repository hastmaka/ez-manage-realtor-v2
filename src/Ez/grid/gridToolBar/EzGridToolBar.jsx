import classes from './EzGridToolBar.module.scss';
import EzStack from "../../stack/EzStack.jsx";
import EzIconButton from "../../iconButton/EzIconButton.jsx";
import EzToolTip from "../../toolTip/EzToolTip.jsx";
import {useRef} from "react";
import {useEnterKeySubmit, useOnClickOutside} from "../../../helper/hooks/index.js";

export default function EzGridToolBar(state) {
    // const [open, setOpen] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const handleSearch = (e, ref) => {
        const value = e.key === 'Enter' ? ref.current.value : inputRef.current.value;
        const tempRef = e.key === 'Enter' ? ref : inputRef
        //empty input
        if (!value) {
            tempRef.current.placeholder = 'Enter some value first'
        } else {
            if(value.length <= 3) {
                tempRef.current.value = ''
                return tempRef.current.placeholder = 'Min 3 characters to start a search'
            }
            state.handleSearch(value).then()
        }
    }

    const handleInputChange = (e) => {
        if(!e.target.value) {
            inputRef.current.placeholder = 'Search...'
            state.handleSearch().then()
        }
    }

    useEnterKeySubmit(inputRef, handleSearch);
    useOnClickOutside(containerRef, () => inputRef.current.placeholder = 'Search...');

    return (
        <>
            <EzStack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{
                    minHeight: '60px',
                    padding: '0 10px',
                    borderBottom: '1px solid #e2e2e2'
                }}
            >
                <EzStack direction='row'>
                    <EzToolTip content='Add' direction='bottom'>
                        <EzIconButton
                            onClick={() => state.handleAddRow()}
                            btn
                            icon='faSquarePlus'
                            color='rgb(58 181 184)'
                        />
                    </EzToolTip>
                    <EzToolTip content='Print' direction='bottom'>
                        <EzIconButton btn icon='faPrint' color='rgb(58 181 184)'/>
                    </EzToolTip>
                </EzStack>

                <EzStack
                    ref={containerRef}
                    onClick={() => {
                        inputRef.current.focus()
                        // inputRef.current.placeholder = 'Enter some value'
                    }}
                    direction='row'
                    alignItems='flex-end'
                    className={classes.search}
                >
                    <EzStack justifyContent='center' sx={{width: '40px'}}>
                        <EzIconButton
                            onClick={handleSearch}
                            icon='faMagnifyingGlass'
                            color='rgb(58 181 184)'
                            iconSx={{cursor: 'pointer'}}
                        />
                    </EzStack>
                    <input ref={inputRef} placeholder='Search...' onChange={handleInputChange}/>
                </EzStack>
            </EzStack>
        </>
    );
}