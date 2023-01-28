import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.themoviedb.org/3/search";
const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";
export const getItems = createAsyncThunk("movies/getMovies", async (data) => {
  let { type, query } = data;
  return fetch(
    API_URL + `/${type}?api_key=${API_KEY}&query=${query}&include_adult=false`
  ).then((res) => res.json());
});
export const getSingleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (data) => {
    if (data) {
      let { type, id } = data;
      return fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
      ).then((response) => response.json());
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: { movies: [], isLoading: false, focusedMovie: undefined },
  reducers: {
    resetMovies(state, action) {
      state.movies = [];
    },
    resetFocusedMovie(state, action) {
      state.focusedMovie = undefined;
    },
  },
  extraReducers: {
    [getItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload;
    },
    [getItems.rejected]: (state) => {},
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.focusedMovie = action.payload;
    },
    [getSingleMovie.rejected]: (state) => {},
  },
});
export const { resetMovies, resetFocusedMovie } = movieSlice.actions;
