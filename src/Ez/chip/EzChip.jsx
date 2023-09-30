import classes from './EzChip.module.scss';
import EzStack from "../stack/EzStack.jsx";
import EzIconButton from "../iconButton/EzIconButton.jsx";
import EzText from "../text/EzText.jsx";
import PropTypes from "prop-types";

export default function EzChip({item, onDelete}) {
    return (
        <EzStack
            id='chip'
            className={classes['chip']}
            direction='row'
            gap={1}
            alignItems='center'
            justifyContent='center'

        >
            <EzText
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'no-wrap'
                }}
                cap
                text={item}
            />
            {onDelete && <EzIconButton
                btn
                sx={{padding: '4px'}}
                iconSx={{fontSize: '16px'}}
                icon='faCircleXmark'
                onClick={() => onDelete(item)}
            />}
        </EzStack>
    );
}

EzChip.propTypes = {
    item: PropTypes.string.isRequired,
    onDelete: PropTypes.func
}