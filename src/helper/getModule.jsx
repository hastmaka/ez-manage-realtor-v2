import EzStackGrid from "../Ez/container/ezStack/EzStack.jsx";
import {lazy, Suspense} from "react";
import EzSpinner from "../Ez/spinner/EzSpinner.jsx";
import Test from "../section/test/Test.jsx";
//dynamic import
const Clients = lazy(() => import('../section/main/mainTabpanel/clients/ClientsGrid.jsx'))
const Dashboard = lazy(() => import('../section/main/mainTabpanel/dashboard/Dashboard.jsx'))


export const getModules = () => {

    return [
    //{
    //    id: 1,
    //    reference: 'dashboard',
    //    title: "Dashboard",
    //    icon: 'faChartPie',
    //    component: <Suspense fallback={<EzSpinner full/>}><Dashboard/></Suspense>
    //}, 
    {
        id: 1,
        reference: 'clients',
        title: "Clients",
        icon: 'faUser',
        component: (
            <EzStackGrid gap={1}>
                {/*<Clients/>*/}
                <Suspense fallback={<EzSpinner full/>}><Clients/></Suspense>
                {/*<Employees />*/}
                {/*<Users />*/}
            </EzStackGrid>
        )
    }, 
    //{
    //id: 3,
    //    reference: 'clientsTable',
    //    title: "clientsTable",
    //    icon: 'faUser',
    //    component: /*<ClientsTable/>*/''
    //}, 
    {
       id: 4,
       reference: 'test',
       title: "test",
       icon: 'faCogs',
       component: <Test/>
    },
    //{
    //    id: 5,
    //    reference: 'registration',
    //    title: "Registration",
    //    icon: 'faCogs',
    //    component: /*<Registration/>*/''
    //},
    //    {
    //    id: 6,
    //    reference: 'add',
    //    title: "LogOut",
    //    icon: 'faArrowRightFromBracket',
    //    component: <button>log out</button>
    //}
    ];
}