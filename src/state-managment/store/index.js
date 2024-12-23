import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from '../slices/userProfile'
import formDataReducer from '../slices/formData'


export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        formData: formDataReducer,
    }
})