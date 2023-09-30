import {useReducer} from "react";
import {loginProcess} from "../../helper/helper.js";

const initialState = {
    isLoading: false,
    error: {},
    user: {},
    token: '',
    formErrors: {},
    formData: {
        email: '',
        password: ''
    }
}
export default function LoginReducer() {
    const [state, setState] = useReducer((state, value) => ({ ...state, ...value }), initialState, undefined);
    const {formData} = state;

    const handleInputChange = (value) => {
        setState({
            formData: {...formData,...value}
        })
    }
    const setUser = (dbUser, token) => setState({user: dbUser, token})
    const handleSubmit = async () => {
        setState({isLoading: true});
        const firebaseUser = await import('../../helper/firebase/FirebaseAuthService').then(module => {
            return module.loginUser(formData.email, formData.password)
        });
        if(firebaseUser.type !== 'error') {
            const dbUser = await import('../../helper/firebase/FirestoreApi').then(module => {
                return module.getUser(firebaseUser.uid)
            });
            if(!dbUser) {
                //somehow the user has an account in firebase but is not in the db
                setState({error: {type: 'error', message: 'There is a problem with u account, contact admin'}});
            } else {
                setState({user: dbUser})
                await loginProcess({
                    firebaseUser,
                    dbUser,
                    from: 'emailAndPass'
                })
            }
        } else {
            setState({error: {...firebaseUser}});
        }
        setState({isLoading: false});
    }

    const handleSignOut = async () => {
        await import('../../helper/firebase/FirebaseAuthService').then(module => {
            return module.logoutUser()
        });
        localStorage.removeItem('user')
        window.location.reload()
    }

    return {
        ...state,
        handleSubmit,
        handleSignOut,
        handleInputChange,
        setUser
    }
}