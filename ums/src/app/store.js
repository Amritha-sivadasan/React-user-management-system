import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer } from "redux-persist";
import { version } from "mongoose";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import adminReducer from './admin/adminSlice'

const rootReducer = combineReducers({ user: userReducer,admin:adminReducer });
const persistConfig = { key: "root", version: 1, storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
