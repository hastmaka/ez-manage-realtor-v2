import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./userSlice.js";
import clientSlice from "./clientSlice.js";
import generalSlice from "./generalSlice.js";

const store = configureStore({
    reducer: {
        general: generalSlice,
        user: userSlice,
        client: clientSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;