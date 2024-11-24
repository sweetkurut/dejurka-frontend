import { configureStore } from "@reduxjs/toolkit";
import { realEstateSlice } from "./slices/RealEstateSlice";
import { realEstateApi } from "./services/RealEstateApi";
import { authApi } from "./services/AuthApi";
import { authSlice } from "./slices/AuthSlice";


export const store = configureStore({
  reducer: {
    realEstate: realEstateSlice,
    auth: authSlice,


    [realEstateApi.reducerPath]: realEstateApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
  .concat(realEstateApi.middleware)
  .concat(authApi.middleware)
})