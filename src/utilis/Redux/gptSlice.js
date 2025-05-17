import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResult:null,
    moviesNames:null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult:(state,actions) => {
      const {moviesNames , movieResult} = actions.payload;
         state.moviesNames = moviesNames;
         state.movieResult = movieResult;
    },
  },
});

export const { toggleGptSearchView , addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
