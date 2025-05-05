import { ownerApi } from './userApi.js'
import {paymentApi} from "./paymentApi.jsx";
import {setupListeners} from "@reduxjs/toolkit/query";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        [ownerApi.reducerPath]: ownerApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(ownerApi.middleware)
            .concat(paymentApi.middleware),
})

setupListeners(store.dispatch)
