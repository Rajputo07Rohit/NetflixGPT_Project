import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlice";
import moviesReducer from "../Redux/moviesSlice"; // correct path
import gptReducer from "../Redux/gptSlice";
import configReducer from "../Redux/configSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt:gptReducer,
        config: configReducer,
    },
});

export default appStore;
