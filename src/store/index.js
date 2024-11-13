import { configureStore } from "@reduxjs/toolkit";
import { realEstateSlice } from "./slices/RealEstateSlice";
import { realEstateApi } from "./services/RealEstateApi";


export const store = configureStore({
  reducer: {
    realEstate: realEstateSlice,
    [realEstateApi.reducerPath]: realEstateApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(realEstateApi.middleware)
})