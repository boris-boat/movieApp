import React, { useEffect, useState } from "react";
import "./SingleItem.styles.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { resetFocusedMovie } from "../slices/moviesSlices";

const API_URL = `https://api.themoviedb.org/3/movie/`;
const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";

const SingleItem = (props) => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    setMovie(props.movie);
  }, [props.movie]);

  // useEffect(() => {
  //   fetch(`${API_URL}${props.id}?api_key=${API_KEY}`)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setMovie(res);
  //     });
  // }, [props.id]);

  return (
    <div className="singleItemWrapper" key={props.id}>
      {movie && (
        <GrClose
          className="closeBtn"
          onClick={() => {
            dispatch(resetFocusedMovie());
          }}
        />
      )}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
        alt=""
      />{" "}
      <h1 className="text-center">{movie?.title}</h1>
      <h4 className="text-center">Released : {movie?.release_date}</h4>
      <h4 className="text-center">{movie?.overview?.substring(0, 400)}</h4>
      <div className="scoresWrapper">
        <h5>Rating : {movie?.vote_average}</h5>
      </div>
    </div>
  );
};

export default SingleItem;
