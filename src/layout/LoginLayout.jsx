import BorderLayout from "../Ez/borderLayout/BorderLayout.jsx";
import Login from "../section/login/Login.jsx";

export default function LoginLayout() {
    return (
        <BorderLayout
            regions={{
                // north: {
                //     render: true,
                //     height: 30,
                //     component: <div>test</div>
                // },
                // west: {
                //     render: true,
                //     component: <div style={{width: '200px'}}>test</div>
                // },
                // east: {
                //     render: true,
                //     component: <div style={{width: '500px'}}>test</div>
                // },
                center: {
                    centered: true,
                    render: true,
                    flex: 1,
                    component: <Login/>
                },
                // south: {
                //     render: true,
                //     height: 300,
                //     component: <div>test</div>
                // }
            }}
        />
    );
}