import EzButton from "../../../button/EzButton.jsx";
import PropTypes from "prop-types";
import EzIconButton from "../../../iconButton/EzIconButton.jsx";

const EzPaginationButton = ({state}) => {
    const page = state.paginationModel.page;
    const pageSize = state.paginationModel.pageSize;
    const firstNumber = page * pageSize + 1;
    const secondNumber = state.count < pageSize? state.count : (page + 1) * pageSize;
    const thirdNumber = state.count;

    return (
        state.id && <>
            <EzIconButton
                btn
                icon="faAngleDoubleLeft"
                disabled={!state.count || state.paginationModel.page + 1 === 1}
                onClick={() => state.handlePageSizeChange({
                    pageSize: state.paginationModel.pageSize,
                    page: 0,
                })}
            />
            <EzIconButton
                btn
                icon="faAngleLeft"
                disabled={!state.count || state.paginationModel.page + 1 === 1}
                onClick={() => state.handlePageSizeChange({
                    pageSize: state.paginationModel.pageSize,
                    page: state.paginationModel.page - 1,
                })}
            />
            {state.count?
                <span style={{cursor: 'default'}}>
                    {firstNumber} - {secondNumber} of {thirdNumber}
                </span> :
                <span style={{cursor: 'default'}}>
                    No Results
                </span>
            }
            <EzIconButton
                btn
                icon="faAngleRight"
                disabled={!state.count || state.paginationModel.page + 1 === state.totalPages}
                onClick={() => state.handlePageSizeChange({
                    pageSize: state.paginationModel.pageSize,
                    page: state.paginationModel.page + 1,
                })}
            />
            <EzIconButton
                btn
                icon="faAngleDoubleRight"
                disabled={!state.count || state.paginationModel.page + 1 === state.totalPages}
                onClick={() => state.handlePageSizeChange({
                    pageSize: state.paginationModel.pageSize,
                    page: state.totalPages - 1,
                })}
            />
        </>
    );
};

EzPaginationButton.propTypes = {
    state: PropTypes.object.isRequired
};

export default EzPaginationButton;