import PropTypes from 'prop-types';
import EzButton from "../../button/EzButton.jsx";

const EzTActionColumn = ({state, row}) => {
    return (
        <>
            <EzButton
                type="iconOnly"
                icon="faEdit"
                onClick={() => state.handleEditButtonClick(row)}
                style={{
                    marginRight: "10px", border: "none",
                    backgroundColor: 'transparent', color: '#4161e3',
                    cursor: 'pointer'
                }}
            />
            <EzButton
                type="iconOnly"
                icon="faTimes"
                onClick={() => state.handleEditButtonClick(row)}
                style={{
                    marginRight: "10px", border: "none",
                    backgroundColor: 'transparent', color: 'red',
                    cursor: 'pointer'
                }}
            />
        </>
    );
};

EzTActionColumn.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzTActionColumn;