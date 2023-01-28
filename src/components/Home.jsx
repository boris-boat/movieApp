import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import {
  getItems,
  getSingleMovie,
  resetFocusedMovie,
  resetMovies,
} from "../slices/moviesSlices";
import Form from "react-bootstrap/Form";
import "./Home.styles.css";
import SingleItem from "./SingleItem";
import Serbia from "../assets/serbia.png";
import USA from "../assets/united-states-of-america.png";
// c2e8864a
const Home = () => {
  const dispatch = useDispatch();
  const [focusedMovieID, setFocusedMovieID] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [type, setType] = useState("movie");
  const [lang, setLang] = useState("us");
  const data = useSelector((state) => state.movies);
  const focusedMovie = useSelector((state) => state.focusedMovie);
  const searchInput = useRef();
  const reset = () => {
    dispatch(resetFocusedMovie());
    dispatch(resetMovies());
    setSearchString("");
    searchInput.current.value = "";
  };
  useEffect(() => {
    if (focusedMovieID)
      dispatch(getSingleMovie({ type, id: focusedMovieID, lang }));
    // eslint-disable-next-line
  }, [focusedMovieID, lang]);
  useEffect(() => {
    if (searchString) dispatch(getItems({ type, query: searchString, lang }));
    // eslint-disable-next-line
  }, [lang]);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center flex-row header">
        <Col
          lg="10"
          xs="12"
          className="d-flex justify-content-center align-items-center flex-row headerWrapper"
        >
          {" "}
          <div
            className="titleWrapper d-flex justify-content-start align-items-start
          "
          >
            <h3
              className="me-lg-5 user-select-none title m-0"
              onClick={() => {
                reset();
              }}
            >
              Movie Search App
            </h3>
          </div>
          <div className="formWrapper  d-flex  justify-content-center align-items-center">
            <Form.Select
              className="categoryPicker"
              onChange={(e) => {
                reset();
                setType(e.target.value);
              }}
            >
              <option value="movie">Movies</option>
              <option value="tv">TV shows</option>
            </Form.Select>
            <form className="d-flex flex-row justify-content-center align-items-center w-50">
              <input
                type="text"
                className="form-control m-2 me-sm-2"
                placeholder={
                  type === "tv" ? "Search for a tv show" : "Search for a movie"
                }
                ref={searchInput}
                onChange={(e) => {
                  if (e.target.value.length >= 3)
                    setSearchString(e.target.value);
                  if (e.target.value.length === 0) {
                    setSearchString("");
                    searchInput.current.value = "";
                    dispatch(resetMovies());
                  }
                }}
              />
              <Button
                variant="outline-info"
                style={{ height: "80%" }}
                onClick={(e) => {
                  if (searchString.length <= 3) {
                    alert("Please enter 3 or more characters");
                    e.preventDefault();
                    return;
                  } else {
                    e.preventDefault();
                    dispatch(getItems({ type, query: searchString, lang }));
                  }
                }}
                type="submit"
              >
                Search
              </Button>{" "}
            </form>
            <button
              style={{
                height: "40px",
                background: "none",
                border: "none",
                borderRadius: "50%",
                marginLeft: "2px",
              }}
              className={lang === "us" ? "active" : " "}
              onClick={() => setLang("us")}
            >
              <img
                src={USA}
                alt=""
                className="icon"
                style={{ height: "70%" }}
              />
            </button>
            <button
              style={{
                height: "40px",
                background: "none",
                border: "none",
                borderRadius: "50%",
              }}
              className={lang === "sr" ? "active" : " "}
              onClick={() => setLang("sr")}
            >
              <img
                src={Serbia}
                alt=""
                className="icon"
                style={{ height: "30px" }}
              />
            </button>
          </div>
        </Col>
      </Row>
      {data?.results?.length ? (
        <>
          <Row className="moviesWrapper">
            <Col className="allItems" sm={focusedMovie ? 6 : 12}>
              <Row className="left">
                {data?.results?.map((item, index) =>
                  item.poster_path !== null ? (
                    <Col
                      key={index}
                      sm={3}
                      onClick={() => {
                        setFocusedMovieID(item.id);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Card className="p-4 m-3 singleItem">
                        <img
                          src={
                            `https://image.tmdb.org/t/p/original` +
                            item.poster_path
                          }
                          alt="img"
                          style={{ maxHeight: "500px" }}
                        />
                        <h5 className="text-center mt-2">
                          {" "}
                          {type === "movie" ? item.title : item.name}
                        </h5>
                      </Card>
                    </Col>
                  ) : null
                )}
              </Row>
            </Col>
            {focusedMovie && (
              <Col className="p-3 singleMovie">
                <Row>
                  <SingleItem movie={focusedMovie} reset={reset}></SingleItem>
                </Row>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <div className="noResults">
          {data?.total_results === 0 ? (
            <h3 className="text-center mt-5 user-select-none">
              No matches found !
            </h3>
          ) : (
            <h3 className="text-center mt-5 user-select-none">
              Please enter search terms !
            </h3>
          )}
        </div>
      )}
    </Container>
  );
};
export default Home;
