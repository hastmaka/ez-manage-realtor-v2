import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
//
import NoteSaveCancelBtn from "./NoteSaveCancelBtn.jsx";
import EzStack from "../../../../../../../../Ez/stack/EzStack.jsx";
import EzText from "../../../../../../../../Ez/text/EzText.jsx";

export default function NoteEditableElement({
    editMode,
    item,
    setState,
    handleCUD,
    heightObserver,
    setNewNote,
    newNote
}) {
    const contentRef = useRef();

    useEffect(() => {
        if(contentRef.current && newNote) {
            contentRef.current.focus()
        }
    }, [newNote])


    return (
        <>
            <div
                ref={contentRef}
                style={{outline: 'none', padding: '5px 5px 0 5px'}}
                contentEditable={editMode}
                suppressContentEditableWarning={true}
            >
                <EzText text={item.content} sx={{minHeight: '18.19px'}}/>
            </div>
            {editMode &&
                <NoteSaveCancelBtn
                    item={item}
                    handleCUD={handleCUD}
                    contentRef={contentRef}
                    heightObserver={heightObserver}
                    setState={setState}
                    setNewNote={setNewNote}
                    newNote={newNote}
                />
            }
        </>
    )
}

NoteEditableElement.propTypes = {
    editMode: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
    handleCUD: PropTypes.func.isRequired,
    setNewNote: PropTypes.func.isRequired,
    newNote: PropTypes.bool,
    heightObserver: PropTypes.number.isRequired
}