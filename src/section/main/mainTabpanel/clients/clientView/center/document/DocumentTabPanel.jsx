// // material
// import {Box} from "@mui/material";
// import PropTypes from "prop-types";
//
// export default function DocumentTabPanel({children, value, index, ...other}) {
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 2 }}>
//                     {children}
//                 </Box>
//             )}
//         </div>
//     );
// }
//
//
// DocumentTabPanel.propTypes = {
//     value: PropTypes.number,
//     index: PropTypes.number.isRequired,
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.element),
//         PropTypes.element,
//         PropTypes.array
//     ]),
// }