import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "http://www.omdbapi.com?apikey=654bd4ca";

const SingleItem = () => {
  const [movie, setMovie] = useState();
  const location = useLocation();
  useEffect(() => {
    fetch(`${API_URL}&i=${location.state.id}`)
      .then((response) => response.json())
      .then((res) => {
        setMovie(res);
      });
  }, [location.state.id]);
  return (
    <div>
      {" "}
      <img src={movie?.Poster} alt="" />{" "}
    </div>
  );
};

export default SingleItem;
