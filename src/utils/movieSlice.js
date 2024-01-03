import { createSlice } from "@reduxjs/toolkit";





const movieSlice = createSlice({

    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trailerVideo: null,
        watchMovie: {},

    },
    reducers: {
        addNowplayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        }
        ,
        addWatchTrailer: (state, action) => {
            state.watchMovie.watchTrailer = action.payload
        },
        addMovieDetail: (state, action) => {
            state.watchMovie.movieDetail = action.payload
        },
        addCastDetail: (state, action) => {
            state.watchMovie.castDetail = action.payload
        }
        ,
        clearMoviesFromStore: (state, action) => {
            state.nowPlayingMovies = null;
            state.trailerVideo = null
            state.popularMovies = null
            state.upcomingMovies = null
            state.topRatedMovies = null
            state.watchTrailer = null
            state.movieDetail = null
            state.castDetail = null


        },
        clearWatchMovie: (state) => {
            state.watchMovie = {}
            console.log("movies cleared")

        }
    }
});



export default movieSlice.reducer;
export const { addNowplayingMovies, addTrailerVideo, addPopularMovies,
    addUpcomingMovies, addTopRatedMovies, clearMoviesFromStore,
    addCastDetail, addMovieDetail, addWatchTrailer, clearWatchMovie
} = movieSlice.actions;