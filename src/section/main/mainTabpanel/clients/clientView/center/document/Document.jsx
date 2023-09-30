import {documentData} from "./documentData.js";
import DocumentCard from "./DocumentCard.jsx";
import PropTypes from "prop-types";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";


export default function Document({document}) {
    return (
        <EzStack
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gridGap: '10px'
            }}
        >
            {documentData.map(item =>
                <DocumentCard key={item.id} type={item.type}/>
            )}
        </EzStack>
    );
}

Document.propTypes = {
    document: PropTypes.array.isRequired
}