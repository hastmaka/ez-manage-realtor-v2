import {useEffect} from "react";
import PropTypes from "prop-types";

export default function useOnClickOutside(ref, handler, toggleOption) {
    useEffect(() => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            return () => document.removeEventListener('mousedown', listener);
        },
        [ref, handler, toggleOption],
    );
};

useOnClickOutside.propTypes = {
    ref: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    handler: PropTypes.func.isRequired
}