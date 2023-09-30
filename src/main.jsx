import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {Provider} from 'react-redux';
import store from './store';
import EzToast from "./Ez/toast/EzToast.jsx";
import EzConfirmDialog from "./Ez/confirmDialog/EzConfirmDialog.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
            <EzToast/>
            <EzConfirmDialog/>
        </Provider>
    </React.StrictMode>,
)
