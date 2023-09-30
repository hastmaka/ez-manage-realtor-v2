import BorderLayout from "../Ez/borderLayout/BorderLayout.jsx";
import MainToolBar from "../section/main/mainToolBar/MainToolBar.jsx";
import MainTabpanel from "../section/main/mainTabpanel/MainTabpanel.jsx";

export default function MainLayout() {
    return (
        <BorderLayout
            main
            regions={{
                north: {
                    height: 60,
                    render: true,
                    component: <MainToolBar/>
                },
                center: {
                    render: true,
                    flex: 1,
                    component: <MainTabpanel/>
                },
            }}
        />
    );
}