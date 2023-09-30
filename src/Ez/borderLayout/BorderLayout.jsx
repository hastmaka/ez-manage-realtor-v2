// import './BorderLayout.css';
import North from './region/north/North';
import West from './region/west/West';
import Center from './region/center/Center';
import East from './region/east/East';
import South from './region/south/South';
import PropTypes from "prop-types";

const BorderLayout = ({ regions, main = false }) => {

    const {
        north = {},
        west = {},
        center = {},
        south = {},
        east = {},
    } = regions;

    const mainStyle = {
        display: 'flex',
        height: main ? `calc(100vh - ${north.height || 0}px - ${south.height || 0}px)` : '100%',
    }

    return (
        <>
            {north.render && <North {...north}/>}
            <div style={{...mainStyle}}>
                {west?.render && <West {...west} />}
                {center.render && <Center {...center} />}
                {east.render && <East {...east} />}
            </div>
            {south.render && <South {...south} />}
        </>
    );
};

BorderLayout.propTypes = {
    regions: PropTypes.object.isRequired,
    name: PropTypes.string,
    main: PropTypes.bool
};

export default BorderLayout;