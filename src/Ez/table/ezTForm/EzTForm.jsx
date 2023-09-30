import PropTypes from 'prop-types';
import EzBox from "../../container/ezBox/EzBox.jsx";
import EzStack from "../../container/ezStack/EzStack.jsx";
import EzGridFormFields from "../../grid/EzGridFormFields.jsx";
import EzModal from "../../window/EzModal.jsx";
import EzButton from "../../button/EzButton.jsx";

const EzTForm = ({state}) => {
    return (
        state.id && <EzModal isOpen={state.isOpen} onClose={state.handleCloseModal}>
            <EzBox
                style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    boxShadow: 24,
                    padding: 32,
                }}
            >
                <h2 style={{marginTop: 0}}>{state.isAdding ? state.formTitle.add : state.isEditing ? state.formTitle.edit : 'ADD ROW'}</h2>
                <EzStack component="form" onSubmit={state.handleSubmit} gap={1}>
                    {state.columns.map((column) =>
                        <EzGridFormFields
                            key={column.field}
                            padding="18px"
                            column={column}
                            primaryId={state.id}
                            handleInputChange={state.handleInputChange}
                            state={state}
                        />
                    )}
                    <EzStack direction="row" gap={1}>
                        <EzButton
                            type="primary"
                            style={{padding: '10px'}}
                            text={state.isAdding? state.formTitle.add : state.formTitle.edit}
                        />
                        <EzButton
                            type="primary"
                            style={{padding: '10px'}}
                            text="Cancel"
                            onClick={state.handleCloseModal}
                        />
                    </EzStack>
                </EzStack>
            </EzBox>
        </EzModal>
    );
};

EzTForm.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzTForm;