import {initializeApp} from "firebase/app";
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import {getStorage,} from 'firebase/storage';
import {connectAuthEmulator, getAuth} from 'firebase/auth';
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// work with local emulator
// if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth, "http://localhost:9099");
//     connectFunctionsEmulator(functions, "localhost", 5001)
// }