import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {ownerApi} from "./userApi.js";

export const store = configureStore({
    reducer: {
        [ownerApi.reducerPath]: ownerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ownerApi.middleware),
})
setupListeners(store.dispatch)