import {doc, setDoc, collection} from "firebase/firestore";
import {db} from "./firebase/FirebaseConfig.js";
import {userSliceActions} from "../store/userSlice.js";

/**
 * types of users
 * 1 - admin - read-write-delete-update
 * 2 - advanced user - read-write-update
 * 3 - common - read
 * @param user - object with all user data from the account created in firebase
 * @returns {Promise<*|string>}
 */
// export const createAccountProcess = async (user) => {
//     const tempUser = {
//         name: user.name,
//         last_name: user.last_name,
//         email: user.email,
//         role: 1,
//         isEmailVerified: user.emailVerified,
//         provider: user.providerData[0].providerId,
//         emailVerified: user.emailVerified,
//         created_at: user.metadata.createdAt,
//         updated_at: user.metadata.createdAt,
//     }
//     try{
//         //create user in db
//         await setDoc(doc(db, 'users', user.uid), tempUser)
//         // Add subCollection to user document
//         // const subCollectionRef = collection(db, 'users', user.uid, 'tableData');
//         // await setDoc(doc(subCollectionRef, customID), {data: []});
//
//         return ('created')
//     } catch (err) {
//         console.log(err)
//         return(err)
//     }
// }

export const loginProcess = ({firebaseUser, dbUser, from}) => {
    let tempAccessToken = from === 'google' ? firebaseUser.user.accessToken : firebaseUser.accessToken
    window.dispatch(userSliceActions.setUser({...dbUser, token: tempAccessToken}))
    localStorage.setItem('user', JSON.stringify({uid: dbUser.uid}));
    window.location.hash = 'dashboard'
}
//
// export const logOut = (navigate) => {
//     localStorage.removeItem('user')
//     navigate('/login')
//     window.location.reload()
// }

export const verifySession = () => {
    return (JSON.parse(localStorage.getItem('user')));
}