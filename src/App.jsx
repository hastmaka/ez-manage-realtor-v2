import {lazy, Suspense, useEffect, useState} from "react";
import EzSpinner from "./Ez/spinner/EzSpinner.jsx";
import {verifySession} from "./helper/helper.js";
import {useDispatch} from "react-redux";
import {useConfirmDialog} from "./helper/hooks/index.js";

const LoginLayout = lazy(() => import('./layout/LoginLayout.jsx'));
const MainLayout = lazy(() => import('./layout/MainLayout.jsx'));


const App = () => {
    const dispatch = useDispatch();
    const {confirm} = useConfirmDialog();
    let {hash} = window.location;
    const [currentRoute, setCurrentRoute] = useState(hash.split('#')[1]);
    //user auth persistence

    useEffect(() => {
        //check if the user is already sign in on reload
        import('../src/helper/firebase/FirebaseAuthService').then(module => {
            module.subscribeToAuthChanges()
        })
    }, [])

    useEffect(() => {
        window.dispatch = dispatch;
        window.confirm = confirm;
    }, [dispatch])


    // send user to login if no credential has found
    if(currentRoute !== 'login' && !verifySession()) {
        setCurrentRoute('login');
        window.location.hash = 'login'
    }

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            setCurrentRoute(hash)
        };

        // Listen for hash change events
        window.addEventListener('hashchange', handleHashChange);

        // Clean up the event listener
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderPage = () => {
        if (currentRoute === 'login' && !verifySession()) {
            return (
                <Suspense fallback={<EzSpinner full/>}>
                    <LoginLayout />
                </Suspense>
            );
        }
        return (
            <Suspense fallback={<EzSpinner full/>}>
                <MainLayout />
            </Suspense>
        );
    };


    return renderPage();
};

export default App;