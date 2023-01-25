import "./App.css";
import Home from "./components/Home.jsx";
import SingleItem from "./components/SingleItem";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slices/moviesSlices";
const store = configureStore({
  reducer: movieSlice.reducer,
});
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<SingleItem />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
