import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

/**
 *
 * @param ref - reference of the element you want to keep track in this case its height
 * but can be any other attribute
 * @returns {{heightObserver: number}} -
 */
export default function useResizeObserver (ref) {
    const [heightObserver, setHeightObserver] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newHeight = entry.contentRect.height;
                setHeightObserver(newHeight);
            }
        });

        if (ref.current) resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect();
    }, [ref]);

    return { heightObserver };
}

useResizeObserver.propTypes = {
    ref: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
}


// import { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
//
// /**
//  *
//  * @param ref - reference of the element you want to keep track in this case its height
//  * but can be any other attribute
//  * @returns {{}} -
//  */
// export default function useResizeObserver (ref) {
//     const [heightObserver, setHeightObserver] = useState({
//         multiHeight: 0, chipWidthSum: 0
//     });
//     // multi width 376.65625
//
//     useEffect(() => {
//         const resizeObserver = new ResizeObserver(entries => {
//             let multiHeight = 0,
//                 chipWidthSum = 0;
//             // multiselect height
//             for (const entry of entries) {
//                 multiHeight = entry.contentRect.height
//             }
//
//             // chip sum
//             const fixContainer = document.getElementById('fix-container');
//             for (let i = 0; i < [...fixContainer.children].length; i++) {
//                 const childElement = fixContainer.children[i];
//                 if(childElement.id && childElement.id === 'chip') {
//                     chipWidthSum += childElement.offsetWidth
//                 }
//             }
//             setHeightObserver({multiHeight, chipWidthSum});
//         });
//
//         if (ref.current) resizeObserver.observe(ref.current);
//         return () => resizeObserver.disconnect();
//     }, [ref]);
//     debugger
//     return heightObserver;
// }
//
// useResizeObserver.propTypes = {
//     ref: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
// }