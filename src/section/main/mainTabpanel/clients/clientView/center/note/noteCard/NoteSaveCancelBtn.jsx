import PropTypes from "prop-types";
import EzButton from "../../../../../../../../Ez/button/EzButton.jsx";
import EzStack from "../../../../../../../../Ez/stack/EzStack.jsx";

export default function NoteSaveCancelBtn({
    setState,
    contentRef,
    item,
    handleCUD,
    heightObserver,
    setNewNote,
    newNote
}) {
    return (
        <EzStack
            sx={{margin: '10px 0 0 0'}}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <EzStack direction='row' gap={1}>
                <EzButton
                    text='Save'
                    variant='confirm'
                    onClick={() => {
                        const contentChecked = contentRef.current.innerText.replace(/\s+/g, ' ').trim();
                        if(contentChecked) {
                            if(newNote) {
                                setNewNote(prev => {
                                    handleCUD({content: contentChecked})
                                    return {
                                        ...prev,
                                        initialData: prev.initialData,
                                        state: false
                                    }
                                })
                            } else {
                                if (!(JSON.stringify(contentChecked) === JSON.stringify(item.content))) {
                                    handleCUD({id: item.id, content: contentChecked})
                                }
                            }
                        } else {
                            alert(`Can't save a empty Note`)
                            return contentRef.current.focus()
                        }
                        setState({
                            editMode: false,
                            //heightObserver is the result of the observer that is tracking the div height
                            //34 is the sum of the padding (16px x 2) and a border (1px x 2) 60px is when you
                            //are in edit mode and show the buttons
                            /* scroll: heightObserver + 34 - 60 */                            
                        })
                    }}
                />
                <EzButton
                    text='Cancel'
                    variant='cancel'
                    onClick={() => {
                        if(newNote) {
                            setNewNote(prev => {
                                return {
                                    ...prev,
                                    initialData: prev.initialData,
                                    state: false
                                }
                            })
                        } else {
                            if (!(JSON.stringify(contentRef.current.innerText) === JSON.stringify(item.content))) {
                                contentRef.current.innerText = item.content
                                handleCUD({id: item.id, content: item.content})
                            }
                        }
                        setState({editMode: false})
                    }}
                />
            </EzStack>
            <EzStack>
                right
            </EzStack>
        </EzStack>
    );
}

NoteSaveCancelBtn.propTypes = {
    setState: PropTypes.func.isRequired,
    contentRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    item: PropTypes.object.isRequired,
    handleCUD: PropTypes.func.isRequired,
    setNewNote: PropTypes.func.isRequired,
    heightObserver: PropTypes.number.isRequired,
    newNote: PropTypes.bool
}