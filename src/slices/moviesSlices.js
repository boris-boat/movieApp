import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.themoviedb.org/3/search";
const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";
export const getItems = createAsyncThunk("movies/getMovies", async (data) => {
  let { type, query } = data;
  return fetch(
    API_URL +
      `/${type}?api_key=${API_KEY}&query=${query}&language=${data.lang}&include_adult=false`
  ).then((res) => res.json());
});
export const getSingleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (data) => {
    if (data) {
      let { type, id, lang } = data;
      return fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=${lang}`
      ).then((response) => response.json());
    }
  }
);
export const getTrending = createAsyncThunk(
  "movies/getTrending",
  async (type) => {
    return fetch(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=${API_KEY}`
    ).then((response) => response.json());
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    focusedMovie: undefined,
    trending: undefined,
  },
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
    [getItems.rejected]: (state) => {
      console.log("error getting items");
    },
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      state.focusedMovie = action.payload;
    },
    [getSingleMovie.rejected]: (state) => {
      console.log("error getting single item");
    },
    [getTrending.pending]: (state) => {
      state.isLoading = true;
    },
    [getTrending.fulfilled]: (state, action) => {
      state.trending = action.payload;
    },
    [getTrending.rejected]: (state) => {},
  },
});
export const { resetMovies, resetFocusedMovie } = movieSlice.actions;
