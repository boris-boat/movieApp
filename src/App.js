import "./App.css";
import Home from "./pages/Home.jsx";
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
