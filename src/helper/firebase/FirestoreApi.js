// import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addDoc,
    collection as firestoreCollection,
    doc,
    getDoc,
    getDocs,
    limit as firebaseLimit,
    limitToLast,
    query,
    setDoc,
    where,
    arrayUnion,
    arrayRemove,
    getCountFromServer,
    startAfter,
    endBefore,
    orderBy
} from "firebase/firestore";
import {db} from "./FirebaseConfig.js";
import PropTypes from "prop-types";

// export const create = createAsyncThunk(
//     'firestore/create',
//     async ({collection, data}, {rejectWithValue}) => {
//         try {
//             //add the client
//             const resClient = await addDoc(firestoreCollection(db, collection), data.client);
//             //add the service to the subCollection
//             await addDoc(firestoreCollection(db, `${collection}/${resClient.id}/services`), data.service);
//             // window.displayNotification({type: 'info', content: 'Product Created Successfully'})
//             return resClient.id;
//         } catch (err) {
//             window.displayNotification({type: 'error', content: `There was some error ${err.response.data}`})
//             return rejectWithValue(err.response.data);
//         }
//     }
// );
//
// export const update = createAsyncThunk(
//     'firestore/update',
//     async ({id, collection, data}, {rejectWithValue}) => {
//         // let {variation, images, ...rest} = data;
//         // images = JSON.stringify(images);
//         // variation = JSON.stringify(variation);
//         // let tempData = {...rest, images, variation}
//         debugger
//         try {
//             await setDoc(doc(firestoreCollection(db, collection), id), data, {merge: true})
//                 .then(res => {
//                     debugger
//                 }).catch(err => {
//                     console.log(err);
//                 })
//         } catch (error) {
//             debugger
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
//
// export const getById = createAsyncThunk(
//     'firestore/getById',
//     async ({id, collection}, {rejectWithValue}) => {
//         try {
//             const data = await getDoc(doc(db, collection, id));
//             if (!data.data()) {
//                 debugger
//             }//if the user doesn't exist
//             return {...data.data(), uid: data.id, select: collection};
//         } catch (error) {
//             debugger
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
//
// export const getAll = createAsyncThunk(
//     'firestore/getAll',
//     async ({collection, filters = [], lim = null}, {rejectWithValue})  => {
//         let queries = [];
//         if (filters.length) {
//             for (const filter of filters) {
//                 queries.push(where(filter.field, filter.operator, filter.value));
//             }
//         }
//         const collectionRef = firestoreCollection(db, collection)
//         let q = query(collectionRef, ...queries);
//         if (lim !== null) {
//             q = query(collectionRef, ...queries, limit(lim));
//         }
//         try {
//             let data = [];
//             let res = await getDocs(q);
//             res.docs.map(doc => data.push({...doc.data(),id: doc.id}))
//             return data
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const getService = async (clientId, subCollection) => {
    let q = firestoreCollection(db, 'clients');
    try {
        const querySnapshot = await getDocs(q);
        debugger
        return querySnapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        })
    } catch (error) {
        console.log('Error getting documents: ', error);
    }
};

// export const getTableData = async ({ collection, filters = [], limit = 10, offset = 0, next }) => {
//     let queries = [];
//     if (filters.length) {
//         for (const filter of filters) {
//             queries.push(where(filter.field, filter.operator, filter.value));
//         }
//     }
//
//     const collectionRef = firestoreCollection(db, collection);
//     let q = query(
//         collectionRef,
//         ...queries,
//         orderBy('created_at'),
//         next? startAfter(offset) : endBefore(offset),
//         next? firebaseLimit(limit) : limitToLast(limit),
//     )
//
//     try {
//         const querySnapshot = await getDocs(q);
//         const data = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
//         const count = await getCountFromServer(firestoreCollection(db, "clients"));
//         return {
//             data,
//             count: count.data().count,
//             refs: [querySnapshot.docs[0], querySnapshot.docs[querySnapshot.docs.length - 1]]
//         };
//     } catch (error) {
//         return { error };
//     }
// };

export const CUD = async ({clientId, service}) => {
    const documentRef = doc(db, 'clients', clientId);
    try {
        await setDoc(documentRef, {service}, { merge: true });
    } catch (error) {
        console.error('Error from CUD:', error);
    }
}
CUD.propTypes = {
    subCollectionPath: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
    updateData: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    action: PropTypes.string.isRequired,
    extra: PropTypes.string,
}

export const updatePersonalInfo = async ({id, data}) => {
    const documentRef  = doc(db, `clients/${id}`);
    try {
        await setDoc(documentRef, data, {merge: true})
    } catch (error) {
        console.error('Error from updatePersonalInfo:', error);
    }
}

updatePersonalInfo.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export const getUser = (uid) => {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, 'users', uid)).then((user) => {
            if (user.exists()) {
                resolve({ ...user.data(), uid: user.id });
            } else {
                resolve(false);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

export const dummyToDb = (records) => {
    debugger
    records.forEach(async record => {
        // const {id, ...rest} = record;
        // await addDoc(firestoreCollection(db, `${collection}/${resClient.id}/services`), data.service);
        // const documentRef  = doc(db, 'clients')
        await addDoc(firestoreCollection(db, 'clients'), record);
    })
}



