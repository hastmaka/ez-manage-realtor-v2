import {useEffect, useReducer, useRef, useState} from "react";
import PropTypes from "prop-types";
import classes from './NoteCard.module.scss'
//
import NoteFadeEffect from "./NoteFadeEffect.jsx";
import NoteEditableElement from "./NoteEditableElement.jsx";
import {useResizeObserver} from "../../../../../../../../helper/hooks/index.js";
import EzStack from "../../../../../../../../Ez/stack/EzStack.jsx";
import EzText from "../../../../../../../../Ez/text/EzText.jsx";
import EzIconButton from "../../../../../../../../Ez/iconButton/EzIconButton.jsx";
import EzMenu from "../../../../../../../../Ez/menu/EzMenu.jsx";

const severityColor = {
    'high': {color: '#FF6D60'},
    'normal': {color: '#98D8AA'},
    'low': {color: '#F7D060'},
}

export default function NoteCard({item, handleCUD, newNote, setNewNote}) {
    const initialState = {
        expanded: false,
        editMode: newNote || false,
        scroll: 0,
        openMenu: null,
        anchorEl: null
    }
    const [state, setState] = useReducer((state, value) => (
        { ...state, ...value }
    ), initialState, undefined);
    const {expanded, editMode, scroll, openMenu, anchorEl} = state;
    const {severity, updated_at, who} = item;
    const containerRef = useRef();
    const {heightObserver} = useResizeObserver(containerRef);

    useEffect(() => {
        if(containerRef.current) {
            setState({scroll: containerRef.current.scrollHeight})
        }
    }, [expanded]);

    const actionsMenuItem = [
        {
            id: 1,
            text: 'Edit',
            listItemIcon: false,
            functionality: {
                onClick: () => {
                    if(!editMode) {
                        //if is not expanded when trigger edit mode do it
                        if(!expanded) {
                            setState({expanded: true})
                        }
                        setState({
                            scroll: scroll + 60,
                            editMode: !editMode,
                            openMenu: null
                        })
                    }
                }
            }
        },
        {
            id: 2,
            text: 'Delete',
            listItemIcon: false,
            functionality: {
                onClick: () => handleCUD({id: item.id})
            }
        }
    ]

    return (
        <EzStack
            ref={containerRef}
            onClick={(e) => {
                // if(containerRef.current.contains(e.target)){
                //     if(!editMode) {
                //         setState({expanded: !expanded})
                //     }
                // }
            }}
            style={{
                // height: editMode ? 'fit-content' : expanded ? `${scroll}px` : '90px',
                height: 'fit-content',
                overflow: 'hidden',
                padding: '16px',
                borderRadius: '4px',
                transition: 'all 200ms',
                gap: '16px',
                position: 'relative',
                boxShadow: 'rgba(45, 62, 80, 0.12) 0px 1px 5px 0px',
                cursor: editMode ? 'inherit' : 'pointer',
            }}
            className={classes['note-content']}
        >
            <EzStack direction='row' justifyContent='space-between'>

                <EzStack direction='row' gap={.5}>
                    <EzText
                        text='Note'
                        sx={{
                            fontWeight: 600,
                            position: 'relative',
                            '&:before': {
                                content: '" "',
                                display: 'block',
                                position: 'absolute',
                                bottom: '2px',
                                left: 0,
                                width: '100px',
                                height: '2px',
                                backgroundColor: severityColor[severity]?.color || 'inherit'
                            }
                        }}
                    />
                    <EzText text={`by ${who}`}/>
                </EzStack>

                <EzStack direction='row' gap={2} alignItems='center'>
                    <EzText
                        sx={{fontSize: '12px'}}
                        text={new Date(updated_at).toLocaleString()}
                        centered
                    />
                    <EzIconButton
                        btn
                        icon='faEllipsisVertical'
                        onClick={(e) => setState({openMenu: !openMenu, anchorEl: e.currentTarget})}
                    />
                </EzStack>
            </EzStack>

            <NoteEditableElement
                editMode={editMode}
                setState={setState}
                heightObserver={heightObserver}
                item={item}
                handleCUD={handleCUD}
                setNewNote={setNewNote}
                newNote={newNote}
            />

            {/*<NoteFadeEffect expanded={expanded} newNote={newNote}/>*/}

            {Boolean(openMenu) && <EzMenu
                open={Boolean(openMenu)}
                anchorEl={anchorEl}
                onClose={() => setState({openMenu: false})}
                items={actionsMenuItem}
            />}

        </EzStack>
    );
}

NoteCard.propTypes = {
    item: PropTypes.object.isRequired,
    handleCUD: PropTypes.func.isRequired,
    newNote: PropTypes.bool,
    setNewNote: PropTypes.func.isRequired
}