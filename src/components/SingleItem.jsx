import React, { useEffect, useState } from "react";
import "./SingleItem.styles.css";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { resetFocusedMovie } from "../slices/moviesSlices";

const SingleItem = (props) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  let { lang } = props;
  useEffect(() => {
    setMovie(props.movie);
    // eslint-disable-next-line
  }, [props.movie]);
  const stillRunningResponse = (data) => {
    if (lang === "us") {
      if (data === true) return "True";
      if (data === false) return "Finished";
    }
    if (lang === "sr") {
      if (data === true) return "Da";
      if (data === false) return "Ne";
    }
  };
  return (
    <div className="singleItemWrapper" key={props.id}>
      {movie && (
        <div className="movie">
          <GrClose
            className="closeBtn"
            onClick={() => {
              dispatch(resetFocusedMovie());
              props.resetFocusedMovieID(null);
            }}
          />
          <img
            src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
            alt=""
          />
          <h1 className="text-center mt-2">{movie?.title}</h1>
          <h4 className="text-center mt-2">
            {lang === "us" ? "Released" : "Izdato"} :{" "}
            {movie?.release_date
              ? new Date(movie.release_date).toLocaleDateString()
              : new Date(movie.first_air_date).toLocaleDateString()}
          </h4>
          {movie.first_air_date ? (
            <>
              <h4>
                {lang === "us" ? "Number of seasons" : "Broj sezona"} :{" "}
                {movie.number_of_seasons}
              </h4>
              <h4>
                {lang === "us" ? "Still running" : "Aktuelna"} :{" "}
                {stillRunningResponse(movie.in_production)}
              </h4>
            </>
          ) : null}
          <h4 className="text-center mt-2">
            {movie.overview.length === 0 ? "Nema opisa." : null}
            {movie?.overview?.substring(0, 400)}
          </h4>
          <div className="scoresWrapper mt-2">
            <h5>Rating : {+movie?.vote_average?.toFixed(1)}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
