import {useSelector} from "react-redux";
import {lazy, Suspense, useEffect, useState} from "react";
// material
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
//
import DocumentTabPanel from "./document/DocumentTabPanel.jsx";
import PropTypes from "prop-types";
//dynamic import
const Note = lazy(() => import('./note/Note.jsx'));
const Status = lazy(() => import('./status/Status.jsx'));
const Document = lazy(() => import('./document/Document.jsx'));

//------------------------------------------------------------

const RootStyle = styled(Stack)(() => ({
    flex: 2,
    backgroundColor: theme => theme.palette.parentBg
}));

//------------------------------------------------------------

export default function Center_old({row}) {
    const [value, setValue] = useState(false);
    // debugger
    //fix to a mui bugs
    useEffect(() => {
        setTimeout(() => {
            setValue(0);
        }, 100);
    }, []);

    return (
        <RootStyle>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={value}
                        onChange={(e, value) => setValue(value)}
                    >
                        <Tab label="Status" value={0}/>
                        <Tab label="Documents" value={1}/>
                        <Tab label="Notes" value={2}/>
                        {/*<Tab label="Coming Soon" value={3} />*/}
                    </Tabs>
                </Box>

                <DocumentTabPanel value={value} index={0}>
                    <Suspense
                        fallback={<div>Loading document</div>}
                    >
                        <Status/>
                    </Suspense>
                </DocumentTabPanel>

                <DocumentTabPanel value={value} index={1}>
                    <Suspense
                        fallback={<div>Loading document</div>}
                    >
                        <Document row={row}/>
                    </Suspense>
                </DocumentTabPanel>

                <DocumentTabPanel value={value} index={2}>
                    <Suspense
                        fallback={<div>Loading document</div>}
                    >
                        <Note row={row}/>
                    </Suspense>
                </DocumentTabPanel>

            </Box>
        </RootStyle>
    );
}

Center_old.propTypes = {
    row: PropTypes.object.isRequired
}