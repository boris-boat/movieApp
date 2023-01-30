import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousell.styles.css";
const Carousell = (props) => {
  return (
    <>
      <Carousel fade className="mt-3 wrapper">
        {props?.trending?.results?.map((item, index) => (
          <Carousel.Item
            className="trendingImg"
            key={index}
            onClick={() => {
              props.setFocusedMovieID(item.id);
              window.scrollTo(0, 0);
            }}
          >
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original` + item.poster_path}
              alt="img"
            />
            {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Carousell;
