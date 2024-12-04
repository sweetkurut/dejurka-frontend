import { configureStore } from "@reduxjs/toolkit";
import { realEstateSlice } from "./slices/RealEstateSlice";
import { realEstateApi } from "./services/RealEstateApi";
import { authApi } from "./services/AuthApi";
import { authSlice } from "./slices/AuthSlice";
import { salesApi } from "./services/SalesApi";
import { salesSlice } from "./slices/SalesSlice";
import { userApi } from "./services/UserApi";
import { usersSlice } from "./slices/UsersSlice";
import { seriesApi } from "./services/SeriesApi";
import { seriesSlice } from "./slices/SeriesSlice";
import { repairApi } from "./services/RepairApi";
import { repairSlice } from "./slices/RepairSlice";
import { heatingSlice } from "./slices/HeatingSlice";
import { heatingApi } from "./services/HeatingApi";
import { documentationSlice } from "./slices/DocumentationSlice";
import { documentationApi } from "./services/DocumentationApi";
import { furnitureSlice } from "./slices/FurnitureSlice";
import { furnitureApi } from "./services/FurnitureApi";


export const store = configureStore({
  reducer: {
    realEstate: realEstateSlice,
    auth: authSlice,
    sales: salesSlice,
    users: usersSlice,
    series: seriesSlice,
    repairs: repairSlice,
    heatings: heatingSlice,
    document: documentationSlice,
    furniture: furnitureSlice,

    [realEstateApi.reducerPath]: realEstateApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [seriesApi.reducerPath]: seriesApi.reducer,
    [repairApi.reducerPath]: repairApi.reducer,
    [heatingApi.reducerPath]: heatingApi.reducer,
    [documentationApi.reducerPath]: documentationApi.reducer,
    [furnitureApi.reducerPath]: furnitureApi.reducer,
  },

  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware()
  .concat(realEstateApi.middleware)
  .concat(authApi.middleware)
  .concat(salesApi.middleware)
  .concat(userApi.middleware)
  .concat(seriesApi.middleware)
  .concat(repairApi.middleware)
  .concat(heatingApi.middleware)
  .concat(documentationApi.middleware)
  .concat(furnitureApi.middleware)
})