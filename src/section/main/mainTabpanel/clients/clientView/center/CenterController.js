import PropTypes from "prop-types";

/**
 *
 * @param service - need service variable from store to update it
 * @param activeService - self-explanatory
 * @param documentRefId - document ref id to update in db
 * @param dataToUpdate - data that was updated it
 * @param action - self-explanatory
 * @returns {any}
 */

export const updateServiceNote = ({service, activeService, documentRefId, dataToUpdate, action}) => {
    debugger
    let tempService = structuredClone(service);
    let documentRef = tempService[activeService].filter(i => i.id === documentRefId)[0];
    if(action === 'update') {
        const indexNoteToUpdate = documentRef.note.findIndex(i => i.id === dataToUpdate.id)
        documentRef.note[indexNoteToUpdate] = dataToUpdate.data
    } else {
        documentRef = {
            ...documentRef,
            note: action === 'delete' ? documentRef.note.filter(i => i.id !== dataToUpdate) :
                action === 'create' ? [dataToUpdate, ...documentRef.note] : []
        }
    }
    const indexToUpdate = service[activeService].findIndex(i => i.id === documentRef.id)
    tempService[activeService][indexToUpdate] = documentRef
    return tempService
}

updateServiceNote.propTypes = {
    service: PropTypes.object.isRequired,
    activeService: PropTypes.string.isRequired,
    documentRefId: PropTypes.string.isRequired,
    dataToUpdate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    action: PropTypes.string.isRequired
}