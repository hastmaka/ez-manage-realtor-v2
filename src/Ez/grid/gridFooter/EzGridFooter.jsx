import PropTypes from 'prop-types';
import {GridFooterContainer, GridPagination} from "@mui/x-data-grid";

export default function EzGridFooter() {
    return (
        <GridFooterContainer>
            <div>
                {/*footer*/}
            </div>

            <GridPagination/>
        </GridFooterContainer>
    );
};

EzGridFooter.propTypes = {};