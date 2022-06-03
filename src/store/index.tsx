import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import modalReducer from "./modal";

enableMapSet();

const store: EnhancedStore = configureStore({
    reducer: {
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
