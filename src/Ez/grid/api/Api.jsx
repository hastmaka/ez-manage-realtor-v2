// import axios from "axios";
//
// const http = 'http://localhost:8080/api/';
// // const http = 'https://sandbox.lcmc.ngrok.io/api/';
//
// export async function getApi(url, params) {
//     const response = await axios.get(http+url, { params });
//     if (!response.data.success) {
//         throw new Error('Error fetching data');
//     }
//     return response;
// }
//
// export async function postApi(url, newRow) {
//     const response = await axios.post(http+url, newRow);
//     if (!response.data.success) {
//         throw new Error('Error creating row');
//     }
// }
//
// export async function putApi(url, editedRow) {
//     const response = await axios.put(http+url, editedRow);
//     if (!response.data.success) {
//         throw new Error('Error updating row');
//     }
// }
//
// export async function deleteApi(url, id) {
//     const response = await axios.delete(`${http}${url}/${id}`);
//     if (!response.data.success) {
//         throw new Error('Error deleting row');
//     }
// }
