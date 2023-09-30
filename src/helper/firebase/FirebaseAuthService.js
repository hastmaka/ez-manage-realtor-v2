import {auth,} from "./FirebaseConfig.js";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getIdToken
} from 'firebase/auth';
import {getUser} from "./FirestoreApi.js";
import {userSliceActions} from "../../store/userSlice.js";

export const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/email-already-in-use':
                    return window.displayNotification({
                        type: 'error',
                        content: 'Email already in use, please choose another one'
                    });
                default:
                    return window.displayNotification({
                        type: 'error',
                        content: 'Internal Error'
                    });
            }
        })
};

export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            return userCredential.user
        }).catch(e => {
            switch (e.code) {
                case 'auth/wrong-password':
                    return {
                        type: 'error',
                        message: 'Wrong Password, Double check Caps'
                    }
                case 'auth/user-not-found':
                    return {
                        type: 'error',
                        message: 'User not Found',
                    };
                case 'auth/too-many-requests':
                    return {
                        type: 'error',
                        message: 'Too many request was made, try again later',
                    };
                default:
                    return {
                        type: 'error',
                        message: 'Firebase Unknown Error'
                    }
            }
        })
}

export const logoutUser = () => {
    return signOut(auth);
}

export const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
}

export const subscribeToAuthChanges = () => {
    onAuthStateChanged(auth, async firebaseUser => {
        if(firebaseUser) {
            let token = await getIdToken(firebaseUser);
            try {
                const user = await getUser(firebaseUser.uid);
                window.dispatch(userSliceActions.setUser({...user, token}))
                // window.dispatch(userSliceActions.setUser({...user, token}))
            } catch (err) {
                console.log(err);
            }
        } else {
            //firebaseUser === null means the id in localstorage is not in our auth system,
            //so we wipe out the entire localStore to avoid confusions
            window.localStorage.clear()
        }
    })
}