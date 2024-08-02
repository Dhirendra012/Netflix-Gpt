import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice(
    {
        name:"movies",
        initialState:
        {
            nowPlayingMovies: null,
            nowTrendingMovies: null,
            nowPopularMovies: null,
            nowUpcomingMovies: null,
            movieId: null,
        },
        reducers:
        {
            addNowPlayingMovies: (state , action) => 
            {  state.nowPlayingMovies = action.payload; },

            addNowTrendingMovies: (state , action) => 
                {  state.nowTrendingMovies = action.payload; },

            addNowPopularMovies: (state , action) => 
                {  state.nowPopularMovies = action.payload; },
            
            addNowUpcomingMovies: (state , action) => 
                {  state.nowUpcomingMovies = action.payload; },

            addMovieId:(state , action) => 
            { state.movieId = action.payload; }
        },
    },
);

export const { addNowPlayingMovies , addMovieId ,addNowPopularMovies , addNowTrendingMovies , addNowUpcomingMovies } = movieSlice.actions;

export default movieSlice.reducer;