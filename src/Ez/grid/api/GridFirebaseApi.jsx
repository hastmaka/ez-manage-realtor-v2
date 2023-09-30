import {
    collection as firestoreCollection,
    endBefore, getCountFromServer, getDocs,
    limitToLast,
    orderBy,
    query,
    startAfter,
    where,
    limit as firebaseLimit,
    setDoc,
    doc,
    onSnapshot, addDoc
} from "firebase/firestore";
import {db} from "../../../helper/firebase/FirebaseConfig.js";
import {generateDBData} from "../../../helper/index.js";

//with collection listeners
// export const getApi = async ({
//     collection,
//     filters = [],
//     limit = 10,
//     offset = 0,
//     next,
//     callBack
// }) => {
//
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
//         //getting total record in DB
//         // const count = await getCountFromServer(firestoreCollection(db, "clients"));
//         let data, refs;
//
//         const snapshotPromise = new Promise((resolve, ) => {
//             onSnapshot(q, { includeMetadataChanges: true }, async (querySnapshot) => {
//                 //here to trigger document size everytime record is added or deleted
//                 const countQuery = query(collectionRef, where('active', '==', true));
//                 const count = await getDocs(countQuery);
//                 data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//                 refs = [querySnapshot.docs[0], querySnapshot.docs[querySnapshot.docs.length - 1]];
//                 resolve(callBack({
//                     data,
//                     count: count.size,
//                     refs
//                 }));
//             });
//         });
//
//         // Wait for the snapshotPromise to resolve before returning the data
//         await snapshotPromise;
//     } catch (e) {
//         return { e };
//     }
// };

//without collection listeners
export const getApi = async ({
    collection,
    filters = [],
    limit = 10,
    offset = 0,
    next
}) => {

    let queries = [];
    if (filters.length) {
        for (const filter of filters) {
            queries.push(where(filter.field, filter.operator, filter.value));
        }
    }

    const collectionRef = firestoreCollection(db, collection);
    let q = query(
        collectionRef,
        ...queries,
        orderBy('created_at'),
        next? startAfter(offset) : endBefore(offset),
        next? firebaseLimit(limit) : limitToLast(limit),
    )

    try {
        //getting total record in DB
        // const count = await getCountFromServer(firestoreCollection(db, "clients"));
        const countQuery = query(collectionRef, where('active', '==', true));
        const count = await getDocs(countQuery);

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const refs = [querySnapshot.docs[0], querySnapshot.docs[querySnapshot.docs.length - 1]]
        return {data, refs, count: count.size}
    } catch (e) {
        return { e };
    }
};

//get all data to make a local filter (quick fix at the moment)
export const getBulk = async ({collection}) => {
    const collectionRef = firestoreCollection(db, collection);
    try {
        return await getDocs(collectionRef);
    } catch (e) {
        console.error('Error fetching bulk', e)
    }
};
//create
export const postApi = async ({collection, data}) => {
    const collectionRef = firestoreCollection(db, collection);
    try {
        return await addDoc(collectionRef, generateDBData(data));
    } catch (e) {
        console.error('postApi error', e)
    }
};
//edit
export const putApi = async ({collection, documentId, pathToUpdate, data}) => {
    const docRef = doc(db, `${collection}/${documentId}`)
    try {
        await setDoc(
            docRef,
            pathToUpdate ? {[pathToUpdate]: {...data}} : data,
            { merge: true }
        );
    } catch (e) {
        console.log('putApi error', e)
    }
};
export const deleteApi = async (collection, documentId) => {
    const docRef = doc(db, `${collection}/${documentId}`)
    try {
        await setDoc(docRef, {active: false},{ merge: true });
    } catch (e) {
        console.log('deleteApi error', e)
    }
};













































