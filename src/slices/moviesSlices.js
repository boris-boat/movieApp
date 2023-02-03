import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.themoviedb.org/3/search";
const API_KEY = process.env.REACT_APP_API_KEY;
export const getItems = createAsyncThunk("movies/getMovies", async (data) => {
  let { type, query } = data;
  return fetch(
    API_URL +
      `/${type}?api_key=${API_KEY}&query=${query}&language=${data.lang}&include_adult=false`
  ).then((res) => res.json());
});
export const getRecomended = createAsyncThunk(
  "movies/getRecomended",
  async (lang) => {
    if (lang === "us") lang = "en";
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${lang}&include_adult=false&include_video=false&page=${(
        Math.random() * 10 +
        1
      ).toFixed(
        0
      )}&vote_count.gte=1000&vote_average.gte=8&with_watch_monetization_types=flatrate`
    ).then((response) => response.json());
  }
);
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
    recomendedMovie: undefined,
  },
  reducers: {
    resetMovies(state, action) {
      state.movies = [];
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
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
      state.movies = action.payload;
    },
    [getItems.rejected]: (state) => {
      console.log("error getting items");
    },
    [getRecomended.pending]: (state) => {},
    [getRecomended.fulfilled]: (state, action) => {
      let index = (Math.random() * action.payload.results.length).toFixed(0);
      // eslint-disable-next-line
      if (index == action.payload.results.length) index = index - 1;
      state.recomendedMovie = action.payload?.results[index];
    },
    [getRecomended.rejected]: (state, action) => {
      console.error(action.error);
    },
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.focusedMovie = action.payload;
    },
    [getSingleMovie.rejected]: (state, action) => {
      console.error(action.error);
    },
    [getTrending.pending]: (state) => {
      state.isLoading = true;
    },
    [getTrending.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.trending = action.payload;
    },
    [getTrending.rejected]: (state, action) => {
      console.error(action.error);
    },
  },
});
export const { resetMovies, resetFocusedMovie, setLoading } =
  movieSlice.actions;
