import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./movieRecommend.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecomended, setLoading } from "../slices/moviesSlices";
import Loader from "../components/Loader";

const MovieRecommend = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Body className="modal-body">
        {isLoading ? <Loader></Loader> : null}
        {!isLoading ? (
          <div className="modal-body-wrapper">
            <div className="poster-wrapper">
              <img
                src={
                  `https://image.tmdb.org/t/p/original` +
                  props?.movie?.poster_path
                }
                className="recommended-poster"
                alt="poster"
              />
            </div>

            <h3 className="text-center mt-4">{props.movie?.title} </h3>
            <h4 className="mt-2">
              {props.movie?.overview === "" ? "Nema opisa" : ""}
            </h4>
            <h4 className="text-center mt-2">
              {props.movie?.overview?.substring(0, 400)}
            </h4>
            <div className=" mt-2">
              <h5>Rating : {+props.movie?.vote_average?.toFixed(1)}</h5>
            </div>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          onClick={() => {
            dispatch(setLoading(true));
            dispatch(getRecomended(props.lang));
            setTimeout(() => {
              dispatch(setLoading(false));
            }, 500);
          }}
        >
          {props.lang === "us" ? "Get new movie" : "Nova preporuka"}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieRecommend;
