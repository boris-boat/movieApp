import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";
export const getMovies = createAsyncThunk("movies/getMovies", async (data) => {
  console.log(data);
  return fetch(
    API_URL + `?api_key=${API_KEY}&query=${data}&include_adult=false`
  ).then((res) => res.json());
});
export const getSingleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (data) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${data}?api_key=${API_KEY}`
    ).then((response) => response.json());
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: { movies: [], isLoading: false, focusedMovie: null },
  reducers: {
    resetMovies(state, action) {
      state.movies = [];
    },
    resetFocusedMovie(state, action) {
      state.focusedMovie = null;
    },
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload.results);

      state.movies = action.payload.results;
    },
    [getMovies.rejected]: (state) => {},
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      state.focusedMovie = action.payload;
    },
    [getSingleMovie.rejected]: (state) => {},
  },
});
export const { resetMovies, resetFocusedMovie } = movieSlice.actions;
