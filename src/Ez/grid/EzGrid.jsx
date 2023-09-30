import {lazy, Suspense} from "react";
import PropTypes from "prop-types";
//material
import {DataGrid} from "@mui/x-data-grid";
//
import './EzGrid.css'
import EzSpinner from "../spinner/EzSpinner.jsx";
import EzBox from "../container/ezBox/EzBox.jsx";
import EzStack from "../stack/EzStack.jsx";
// import EzToast from "../toast/EzToast.jsx";
import EzIconButton from "../iconButton/EzIconButton.jsx";
import EzGridToolBar from "./gridToolBar/EzGridToolBar.jsx";
import EzGridFooter from "./gridFooter/EzGridFooter.jsx";
import EzToolTip from "../toolTip/EzToolTip.jsx";
import {generalSliceActions} from "../../store/generalSlice.js";
// import EzModal from "../modal/EzModal.jsx";
//dynamic import
const EzGridFormFields = lazy(() => import('./EzGridFormFields'));
const EzModal = lazy(() => import('../modal/EzModal.jsx'));

const EzGrid = ({ActionColumn, state, editComponent, addComponent, ...params}) => {
    const Action = ActionColumn?.component ? ActionColumn?.component : ({row, onDelete, onEdit}) => {
        return (
            <>
                <EzToolTip content='Edit' direction='right'>
                    <EzIconButton
                        btn
                        icon='faPen'
                        iconSx={{fontSize: '16px'}}
                        onClick={() => onEdit(row)}
                        style={{color: '#088850'}}
                    />
                </EzToolTip>

                <EzToolTip content='Delete' direction='right'>
                    <EzIconButton
                        btn
                        icon='faTrashCan'
                        iconSx={{fontSize: '16px'}}
                        onClick={() => {
                            window.confirm({
                                title: 'You are about to delete a record',
                                content: `Even when you delete the record it'll still be on DB`
                            }).then(res => {
                                if(res){
                                    window.dispatch(generalSliceActions.closeConfirmDialog())
                                    onDelete(row[state.primaryId])
                                } else {
                                    window.dispatch(generalSliceActions.closeConfirmDialog())
                                }
                            })
                        }}
                        style={{color: 'red'}}
                    />
                </EzToolTip>
            </>
        );
    }

    Action.propTypes = {
        row: PropTypes.object,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
    };

    const renderForm = () => {
        if(state.isEditing) {
            return editComponent
        } else if (state.isAdding) {
            return addComponent
        } else {
            return (
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
                    <EzStack component="form" onSubmit={state.handleSubmit} gap='16px'>
                        {state.columns.map((column) =>
                            <EzGridFormFields
                                key={column.field}
                                padding="18px"
                                column={column}
                                primaryId={state.primaryId}
                                handleInputChange={state.handleInputChange}
                                state={state}
                            />
                        )}
                        <EzStack direction="row" gap='12px'>
                            <button type="submit">
                                {state.isAdding ? state.formTitle.add : state.formTitle.edit}
                            </button>
                            <button onClick={state.handleCloseModal}>
                                Cancel
                            </button>
                        </EzStack>
                    </EzStack>
                </EzBox>
            )
        }
    };

    return (
        <>
            <DataGrid
                sx={{
                    backgroundColor: '#fff'
                }}
                getRowId={(row) => row[state.primaryId]}
                rows={state.data}
                disableSelectionOnClick={true}
                loading={state.isLoading}
                columns={[{
                    field: 'actions',
                    headerName: 'Actions',
                    width: 120,
                    sortable: false,
                    renderCell: ({row}) => (
                        <Action row={row} onDelete={state.handleDeleteRow} onEdit={state.handleEditRow}/>
                    ),
                }, ...state.columns,
                ].map(column => ({...column, editable: false}))}
                // disableColumnFilter
                paginationModel={state.paginationModel}
                paginationMode="server"
                onPaginationModelChange={state.handlePageSizeChange}
                onPageSizeChange={state.handlePageSizeChange}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                rowCount={state.count}
                getRowClassName={state.getRowClassName}
                // onCellClick={state.handleCellClick}
                {...params}
                slots={{
                    toolbar: EzGridToolBar,
                    footer: EzGridFooter
                }}
                slotProps={{
                    toolbar: state
                }}
            />
            {state.isOpen &&
                <Suspense fallback={<EzSpinner full/>}>
                    <EzModal
                        isOpen={state.isOpen}
                        onClose={state.handleCloseModal}
                        style={{
                            ...(addComponent && {
                                height: '95vh'
                            })
                        }}
                    >
                        {renderForm()}
                    </EzModal>
                </Suspense>
            }
            {/*{state.showToast && <EzToast*/}
            {/*    message={state.toastMessage}*/}
            {/*    duration={5000}*/}
            {/*    onClose={state.handleToastClose}*/}
            {/*/>}*/}
        </>
    );
};

EzGrid.propTypes = {
    ActionColumn: PropTypes.object,
    state: PropTypes.object,
    editComponent: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
    addComponent: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.array
    ]),
};
export default EzGrid;




