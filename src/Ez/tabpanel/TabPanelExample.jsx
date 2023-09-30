// import Tabpanel from "./Tabpanel";
// import TabTitle from "./tabTitle/TabTitle";
// import Employees from "../../components/employees/Employees";
//
// const TabpanelExample = () => {
//
//     const tabs = [{
//         id: 1,
//         reference: 'dashboard',
//         title: <TabTitle icon='faChartPie' title="Dashboard"/>,
//         component: 'Content for Dashboard Tab'
//     }, {
//         id: 2,
//         reference: 'employees',
//         title: <TabTitle icon='faUser' title="Employees"/>,
//         component: <Employees/>
//     }, {
//         id: 3,
//         reference: 'settings',
//         title: <TabTitle icon='faCogs' title="Settings"/>,
//         component: 'Content for Settings Tab'
//     }];
//
//     let {hash} = window.location,
//         reference,
//         tabIndex;
//
//     if (hash) {
//         reference = hash.split('#')[1];
//         tabIndex = tabs.filter(tab => tab.reference === reference)[0]?.id || 0;
//     }
//
//     if (!tabIndex) {
//         window.location.hash = tabs[0].reference;
//     }
//
//     return (
//         <Tabpanel
//             tabs={tabs}
//             tabIndex={tabIndex? tabIndex - 1 : 0}
//             heightGap="60px"
//             onTabClick={(tab) => {
//                 window.location.hash = tab.reference;
//             }}
//         />
//     );
// };
//
// export default TabpanelExample;