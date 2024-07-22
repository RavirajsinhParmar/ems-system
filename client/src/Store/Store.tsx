import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import commonSlice from "./CommonSlice";
import { authApi } from "../Service/Api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      common: commonSlice,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};
export const store = makeStore();
setupListeners(store.dispatch);
