import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://www.omdbapi.com?apikey=654bd4ca";

export const getMovies = createAsyncThunk("movies/getMovies", async (data) => {
  return fetch(API_URL + `&s=${data}`).then((res) => res.json());
});

export const movieSlice = createSlice({
  name: "movies",
  initialState: { movies: [], isLoading: false },
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movies = action.payload.Search;
    },
    [getMovies.rejected]: (state) => {},
  },
});
