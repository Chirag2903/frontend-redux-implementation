import { configureStore,  } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

const stores = configureStore({
    reducer:{
        cart:cartReducer,
    }
 })

 export default stores;