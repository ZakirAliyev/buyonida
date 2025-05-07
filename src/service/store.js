import { useTranslation } from "react-i18next";
import { ownerApi } from './userApi.js';
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    [ownerApi.reducerPath]: ownerApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ownerApi.middleware)
});
setupListeners(store.dispatch);