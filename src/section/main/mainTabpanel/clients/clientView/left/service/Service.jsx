import PropTypes from "prop-types";
import EzStack from "../../../../../../../Ez/stack/EzStack.jsx";
import EzText from "../../../../../../../Ez/text/EzText.jsx";

export default function Service({service}) {
    //sort keys inside the object to always have the same structure
    const sortedObj = Object.keys(service).sort().reduce((sorted, key) => ({ ...sorted, [key]: service[key] }), {});
    return (
        <EzStack gap={2}>
            {Object.entries(sortedObj).map(([field, value]) => {
                const formatField = {
                    bath: 'Bath',
                    bed: 'Bed',
                    pet: 'Pet',
                    price_from: 'Price From',
                    price_to: 'Price To',
                    pre_approval: 'Pre Approval',
                    zip: 'Zip'
                }
                if(!(['note', 'document', 'created_at', 'type', 'id', 'updated_at'].includes(field))) {
                    return <EzText
                        key={field}
                        text={`${formatField[field]}: ${(['price_from', 'price_to', 'pre_approval'].includes(field)) ? '$' : ''}${value}`}
                    />
                }
            })}
        </EzStack>
    );
}

Service.propTypes = {
    service: PropTypes.object.isRequired
}