import { configureStore } from "@reduxjs/toolkit";
import { realEstateSlice } from "./slices/RealEstateSlice";
import { realEstateApi } from "./services/RealEstateApi";
import { authApi } from "./services/AuthApi";
import { authSlice } from "./slices/AuthSlice";
import { salesApi } from "./services/SalesApi";
import { salesSlice } from "./slices/SalesSlice";
import { userApi } from "./services/UserApi";
import { usersSlice } from "./slices/UsersSlice";


export const store = configureStore({
  reducer: {
    realEstate: realEstateSlice,
    auth: authSlice,
    sales: salesSlice,
    users: usersSlice,

    [realEstateApi.reducerPath]: realEstateApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },

  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
  .concat(realEstateApi.middleware)
  .concat(authApi.middleware)
  .concat(salesApi.middleware)
  .concat(userApi.middleware)
})