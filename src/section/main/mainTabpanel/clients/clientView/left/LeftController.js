import PropTypes from "prop-types";

/**
 * @param service - object that contain all services
 * @param type - to identify what type of service we're going to update
 * @param id - to get the index to update in the service[type] array
 * @param newServiceData - service updated data
 * @returns {any}
 */

export const updateService = (service, type, id, newServiceData) => {
    const tempService = structuredClone(service);
    const indexToUpdate = tempService[type].findIndex(item => item.id === id)
    tempService[type][indexToUpdate] = {
        ...newServiceData,
        updated_at: Date.now()
    }
    return tempService
}

updateService.propTypes = {
    service: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    newServiceData: PropTypes.object.isRequired,
}