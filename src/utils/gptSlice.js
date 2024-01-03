import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResults: (state, action) => {
            const { movieResults, movieNames } = action.payload
            state.movieNames = movieNames;
            state.movieResults = movieResults
        }
    }

})


export default gptSlice.reducer;
export const { toggleGptSearchView, addGptMovieResults } = gptSlice.actions;