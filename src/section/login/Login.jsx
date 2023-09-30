import classes from './Login.module.scss';
import LoginReducer from "./LoginReducer.js";
import {useEffect, useState} from "react";
import EzText from "../../Ez/text/EzText.jsx";
import EzStack from "../../Ez/stack/EzStack.jsx";
import EzLink from "../../Ez/link/EzLink.jsx";
import EzForm from "../../Ez/ezForm/EzForm.jsx";
import {loginFields} from "./fields.jsx";

export default function Login() {
    const state = LoginReducer();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage(state?.error?.message || '');
    }, [state?.error?.message]);

    useEffect(() => {
        const reset = setTimeout(() => {setErrorMessage('')}, 2000)
        return () => clearTimeout(reset)
    }, [state?.error?.message])

    return (
        <EzStack className={classes['form-login']} gap={2}>
            <EzText
                text={errorMessage || 'Sign In'}
                sx={{color: errorMessage ? 'red' : '#444444'}}
                centered
            />

            <EzForm
                title='Sign in'
                data={state.formLogin}
                state={state}
                fields={loginFields}
                from='login'
            />

            {/*<EzStack direction='row' gap={2} alignItems='center' justifyContent='center'>*/}
            {/*    <EzText text='Already have an Account?' sx={{fontSize: '11px'}}/>*/}
            {/*    <EzLink text='Create Account'/>*/}
            {/*</EzStack>*/}
        </EzStack>
    );
}