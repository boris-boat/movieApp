import React from "react";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { getMovies, getSingleMovie, resetMovies } from "../slices/moviesSlices";
import "./Home.styles.css";
import SingleItem from "./SingleItem";
// c2e8864a
const Home = () => {
  const dispatch = useDispatch();
  const [focusedMovieID, setFocusedMovieID] = useState(null);
  const data = useSelector((state) => state.movies);
  const focusedMovie = useSelector((state) => state.focusedMovie);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    dispatch(getSingleMovie(focusedMovieID));
    // eslint-disable-next-line
  }, [focusedMovieID]);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center flex-row mt-5">
        <Col
          lg="10"
          xs="12"
          className="d-flex justify-content-center align-items-center flex-row"
        >
          {" "}
          <h3 className="me-lg-5">Movie Search App</h3>
          <form className="d-flex flex-row justify-content-center align-items-center w-50">
            <input
              type="text"
              className="form-control m-2 mr-sm-2"
              placeholder="Search for a movie"
              onChange={(e) => {
                if (e.target.value.length >= 3) setSearchString(e.target.value);
                if (e.target.value.length === 0) dispatch(resetMovies());
              }}
            />
            <Button
              variant="info"
              style={{ height: "80%" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(getMovies(searchString));
              }}
              type="submit"
            >
              Search
            </Button>{" "}
          </form>
        </Col>
      </Row>
      {data?.length ? (
        <>
          <Row className="moviesWrapper">
            <Col className="allItems" sm={focusedMovie ? 6 : 12}>
              <Row className="left">
                {data?.map((item) =>
                  item.poster_path !== null ? (
                    <Col
                      key={item.imdbID}
                      sm={3}
                      onClick={() => {
                        setFocusedMovieID(item.id);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Card className="p-4 m-3 singleItem d-flex ">
                        <img
                          src={
                            `https://image.tmdb.org/t/p/original` +
                            item.poster_path
                          }
                          alt="img"
                        />
                        <h5 className="text-center mt-2"> {item.title}</h5>
                      </Card>
                    </Col>
                  ) : null
                )}
              </Row>
            </Col>
            {focusedMovie && (
              <Col className="p-3 singleMovie">
                <Row>
                  <SingleItem movie={focusedMovie}></SingleItem>
                </Row>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <>
          <h3 className="text-center mt-5">Please enter search terms !</h3>
        </>
      )}
    </Container>
  );
};
export default Home;
