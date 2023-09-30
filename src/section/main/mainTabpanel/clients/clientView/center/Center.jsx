import {lazy, Suspense} from "react";
// import classes from './Center.module.scss';

import EzTabpanel from "../../../../../../Ez/tabpanel/EzTabpanel.jsx";
import EzSpinner from "../../../../../../Ez/spinner/EzSpinner.jsx";
//dynamic import
const Note = lazy(() => import('./note/Note.jsx'))
const Document = lazy(() => import('./document/Document.jsx'))

export default function Center({state}) {
    const CenterTabs = [
        // {
        //     id: 1,
        //     reference: 'document',
        //     title: "Document",
        //     component: <Suspense fallback={<EzSpinner/>}><Document document={state.selectedRow.service.document}/></Suspense>
        // },
        {
            id: 2,
            reference: 'note',
            title: 'Note',
            component: <Suspense fallback={<EzSpinner/>}><Note state={state}/></Suspense>
        }
    ]

    return (
        <div
            style={{
                display: 'flex',
                flex: 1
            }}
        >
           <EzTabpanel
               tabs={CenterTabs}
               tabIndex={0}
               orientation='horizontal'
               onTabClick={() => {}}
           />
        </div>
    );
}