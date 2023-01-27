import React, { useEffect, useState } from "react";
import "./SingleItem.styles.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { resetFocusedMovie } from "../slices/moviesSlices";

const SingleItem = (props) => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    console.log(props.movie);
    setMovie(props.movie);
    // eslint-disable-next-line
  }, [props.movie]);

  return (
    <div className="singleItemWrapper" key={props.id}>
      {movie && (
        <div className="movie">
          <GrClose
            className="closeBtn"
            onClick={() => {
              dispatch(resetFocusedMovie());
            }}
          />
          <img
            src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
            alt=""
          />
          <h1 className="text-center">{movie?.title}</h1>
          <h4 className="text-center">
            Released :{" "}
            {movie?.release_date ? movie.release_date : movie.first_air_date}
          </h4>
          <h4 className="text-center">{movie?.overview?.substring(0, 400)}</h4>
          <div className="scoresWrapper">
            <h5>Rating : {movie?.vote_average}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
