import { configureStore } from "@reduxjs/toolkit";
import productStore  from "./store/productStore";
export const store = configureStore({
    reducer:{
        product:productStore
    }
})