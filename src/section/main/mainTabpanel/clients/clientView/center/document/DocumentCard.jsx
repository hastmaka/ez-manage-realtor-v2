import PropTypes from "prop-types";
import EzText from "../../../../../../../Ez/text/EzText.jsx";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";
import classes from './Document.module.scss'

export default function DocumentCard({type}) {
    return (
        <EzStack
            className={classes['document-card']}
            justifyContent='center'
            alignItems='center'
        >
            <EzText text={type} centered/>
        </EzStack>
    )
}

DocumentCard.propTypes = {
    type: PropTypes.string.isRequired
}