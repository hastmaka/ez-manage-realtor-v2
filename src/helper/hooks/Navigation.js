// import {lazy, Suspense, useEffect, useState} from "react";
// import {verifySession} from "../../util/AppController.jsx";
// import EzSpinner from "../../Ez/spinner/EzSpinner.jsx";
// //dynamic import
// const LoginLayout = lazy(() => import('../../components/login/LoginLayout.jsx'));
// const MainLayout = lazy(() => import('../../components/main/MainLayout.jsx'));
//
// export const Navigation = () => {
//     let {hash} = window.location;
//     const [currentRoute, setCurrentRoute] = useState(hash.split('#')[1]);
//
//     // send user to login if no credential has found
//     if(currentRoute !== 'login' && !verifySession()) {
//         setCurrentRoute('login');
//         window.location.hash = 'login'
//     }
//
//     useEffect(() => {
//         const handleHashChange = () => {
//             const hash = window.location.hash.substring(1);
//             setCurrentRoute(hash)
//         };
//
//         // Listen for hash change events
//         window.addEventListener('hashchange', handleHashChange);
//
//         // Clean up the event listener
//         return () => window.removeEventListener('hashchange', handleHashChange);
//     }, []);
//
//     const renderPage = () => {
//         if(currentRoute === 'login' && !verifySession()) {
//             return <Suspense fallback={<EzSpinner full/>}><LoginLayout/></Suspense>
//         }
//         return <Suspense fallback={<EzSpinner full/>}><MainLayout/></Suspense>
//     };
//
//     return <div>{renderPage()}</div>;
//
// }