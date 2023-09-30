import PropTypes from "prop-types";

export default function NoteFadeEffect({expanded,newNote}) {
    return (
        <div
            style={{
                height: expanded || newNote ? '0px' : '32px',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))'
            }}
        />
    );
}

NoteFadeEffect.propTypes = {
    expanded: PropTypes.bool.isRequired,
    newNote: PropTypes.bool
}