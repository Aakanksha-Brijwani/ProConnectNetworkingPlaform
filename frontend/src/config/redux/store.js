import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"
/**
 * 
 * 
 * STEPS for State Management
 * submit Action
 * Handle action in it's reducer
 * Register Here -> Reducer
 * 
 * 
 * 
 */


export const store = configureStore({
    reducer: {
        // here we will register all the reducers
        auth: authReducer,
        postReducer: postReducer
    },
});