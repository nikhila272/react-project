import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import productReducer from "./productReducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer
    }
});

export default store;