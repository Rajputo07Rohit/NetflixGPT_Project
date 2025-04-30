import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlice";
import moviesReducer from "../Redux/moviesSlice"; // correct path

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
    },
});

export default appStore;
