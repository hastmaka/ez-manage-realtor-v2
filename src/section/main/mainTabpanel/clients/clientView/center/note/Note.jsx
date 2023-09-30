import PropTypes from "prop-types";
import {useEffect, useState} from "react";
//
import NoteCard from "./noteCard/NoteCard.jsx";
import {CUD} from "../../../../../../../helper/firebase/FirestoreApi.js";
import {createId} from "../../../../../../../helper/index.js";
import {updateServiceNote} from "../CenterController.js";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";
import EzText from "../../../../../../../Ez/text/EzText.jsx";
import EzIconButton from "../../../../../../../Ez/iconButton/EzIconButton.jsx";
import {useSelector} from "react-redux";

export default function Note({state}) {
    const {service} = state.selectedRow;
    const [noteData, setNoteData] = useState([]);
    const {user} = useSelector(state => state.user);

    const initialData = {
        initialData: {
            created_at: Date.now(),
            updated_at: Date.now(),
            severity: 'normal',
            content: '',
            who: `${user?.name} ${user?.last_name}`
        },
        state: false
    }
    const [newNote, setNewNote] = useState(initialData);

    //fix to update note when change
    useEffect(() => {
        setNoteData(state.selectedRow.service.note)
    }, [state.selectedRow.service.note])


    //because I need a new id with every newNote creation
    const customId = createId(20);
    const handleCUD = ({id, content}) => {
        let tempNoteData = structuredClone(noteData),
            updatedNoteAfterDelete;

        //create, edit or delete
        // if id edit otherwise create
        if(!content) {
            updatedNoteAfterDelete = !content && tempNoteData.filter(item => item.id !== id)
        } else {
            const indexToUpdate = id ? tempNoteData.findIndex(item => item.id === id) : null
            if(indexToUpdate !== null) {
                tempNoteData[indexToUpdate] = {
                    ...tempNoteData[indexToUpdate],
                    content,
                    updated_at: Date.now()
                }
            } else {
                tempNoteData = [{...newNote.initialData, content, id: customId}, ...tempNoteData]
            }
        }
        setNoteData(!content ? updatedNoteAfterDelete : tempNoteData)
        CUD({
            clientId: state.selectedRow.id,
            service: {
                ...service,
                note: !content ? updatedNoteAfterDelete : tempNoteData
            },
            action: 'createAndUpdate'
        }).then()
    }

    return (
        <EzStack gap={2}>
            <EzStack
                direction='row'
                justifyContent={noteData.length ? 'flex-end' : 'space-between'}
                alignItems='center'
            >
                {!noteData.length && <EzText text={`Don't have Note yet on this Client`}/>}
                <EzIconButton
                    btn
                    icon='faSquarePlus'
                    onClick={() => {
                        setNewNote(prev => {
                            return {
                                ...prev,
                                initialData: prev.initialData,
                                state: true
                            }
                        })
                    }}
                />
            </EzStack>

            {newNote.state &&
                <NoteCard
                    item={newNote.initialData}
                    handleCUD={handleCUD}
                    newNote
                    setNewNote={setNewNote}
                />
            }

            {noteData.length > 0 &&
                noteData.map(item => {
                    return <NoteCard
                        key={item.id}
                        item={item}
                        handleCUD={handleCUD}
                        setNewNote={setNewNote}
                    />
                })
            }


        </EzStack>
    );
}

Note.propTypes = {
    state: PropTypes.object.isRequired
}