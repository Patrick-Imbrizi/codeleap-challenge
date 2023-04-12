import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
    user: userSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 128 },
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                warnAfter: 128,
            }
        })
    }
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export const resetStore = async () => {
    await persistor.purge();
    await persistor.flush();
};