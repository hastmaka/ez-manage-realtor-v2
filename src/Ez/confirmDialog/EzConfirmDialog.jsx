import EzStack from "../stack/EzStack.jsx";
import {useSelector} from "react-redux";
import ReactDOM from "react-dom";
import classes from './EzConfirmDialog.module.scss'
import EzButton from "../button/EzButton.jsx";
import {useConfirmDialog} from "../../helper/hooks/index.js";
import EzText from "../text/EzText.jsx";
export default function EzConfirmDialog() {
    const {confirmDialog} = useSelector(state => state.general);
    const {onConfirm, onCancel} = useConfirmDialog();

    const dialogContainer = (
        <div className={`${classes['dialog-container']} ${confirmDialog.open ? classes['open'] : classes['closing']} `}>
            <div className={classes['dialog-overlay']}/>
            <div className={classes['dialog-content-wrapper']}>
                <EzStack gap={1} className={classes['dialog-content']}>
                    <div className={classes['dialog-header']}>
                        <EzText text={confirmDialog.title}/>
                    </div>
                    <div className={classes['dialog-body']}>
                        <EzText text={confirmDialog.content}/>
                    </div>

                    <EzStack direction='row' gap={1} justifyContent='flex-end' sx={{padding: '1rem'}}>
                        <EzButton
                            text='Confirm'
                            onClick={onConfirm}
                            variant='confirm'
                        />
                        <EzButton
                            text='Cancel'
                            onClick={onCancel}
                            variant='cancel'
                        />
                    </EzStack>
                </EzStack>
            </div>
        </div>
    )

    return ReactDOM.createPortal(confirmDialog.open ? dialogContainer : null, document.body);
}

