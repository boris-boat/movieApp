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
  getRecomended,
  getSingleMovie,
  getTrending,
  resetFocusedMovie,
  resetMovies,
} from "../slices/moviesSlices";
import Form from "react-bootstrap/Form";
import "./Home.styles.css";
import SingleItem from "../components/SingleItem";
import Logo from "../assets/logo.png";
import LogoNoBackground from "../assets/logo-removebg-preview (2).png";
import Serbia from "../assets/serbia.png";
import USA from "../assets/united-states-of-america.png";
import Carousell from "../components/Carousell";
import MovieRecommend from "../components/MovieRecommend";
import Loader from "../components/Loader";
// c2e8864a
const Home = () => {
  const dispatch = useDispatch();
  const [focusedMovieID, setFocusedMovieID] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [type, setType] = useState("movie");
  const [lang, setLang] = useState("us");
  const [showModal, setShowModal] = useState(false);
  const data = useSelector((state) => state.movies);
  const trending = useSelector((state) => state.trending);
  const recomendedMovie = useSelector((state) => state.recomendedMovie);
  const focusedMovie = useSelector((state) => state.focusedMovie);
  const isLoading = useSelector((state) => state.isLoading);
  const searchInput = useRef();
  const reset = () => {
    setFocusedMovieID(null);
    dispatch(resetFocusedMovie());
    dispatch(resetMovies());
    setSearchString("");
    searchInput.current.value = "";
  };
  useEffect(() => {
    dispatch(getRecomended(lang));
    dispatch(getTrending(type));
    if (focusedMovieID) {
      dispatch(getSingleMovie({ type, id: focusedMovieID, lang }));
    }
    // eslint-disable-next-line
  }, [focusedMovieID, lang, type]);
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
          className="d-flex justify-content-center align-items-center flex-row header-wrapper"
        >
          {" "}
          <div
            className="title-wrapper 
          "
          >
            {" "}
            <img
              src={LogoNoBackground}
              alt=""
              className="logo-header"
              onClick={() => {
                reset();
              }}
            />
            <h3
              style={{ color: "white", cursor: "pointer", margin: "0" }}
              onClick={() => {
                reset();
              }}
            >
              Movie Search App
            </h3>
          </div>
          {type === "movie" ? (
            <Button
              variant="outline-info"
              onClick={() => setShowModal(true)}
              className="recommend-btn-sm"
            >
              {lang === "us" ? "Recommend" : "Preporuci"}
            </Button>
          ) : null}
          <div className="formWrapper d-flex justify-content-center align-items-center">
            {type === "movie" ? (
              <Button
                variant="outline-info"
                onClick={() => setShowModal(true)}
                className="me-3 recommend-btn-lg"
              >
                {lang === "us" ? "Recommend" : "Preporuci"}
              </Button>
            ) : null}

            <Form.Select
              className="categoryPicker"
              onChange={(e) => {
                reset();
                setType(e.target.value);
              }}
            >
              <option value="movie">
                {lang === "us" ? "Movies" : "Filmovi"}
              </option>
              <option value="tv">
                {lang === "us" ? "Tv Shows" : "Serije"}
              </option>
            </Form.Select>
            <form className="d-flex flex-row justify-content-center align-items-center w-50">
              <input
                type="text"
                className="form-control m-2 me-sm-2"
                placeholder={lang === "us" ? "Search" : "Pretrazi"}
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
                className="m-lg-3"
                onClick={(e) => {
                  if (searchString.length <= 3) {
                    alert("Please enter 3 or more characters");
                    e.preventDefault();
                    return;
                  } else {
                    e.preventDefault();
                    setFocusedMovieID(null);
                    dispatch(resetFocusedMovie());
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
          {isLoading ? (
            <Loader></Loader>
          ) : (
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
                    <SingleItem
                      movie={focusedMovie}
                      reset={reset}
                      lang={lang}
                      resetFocusedMovieID={setFocusedMovieID}
                    ></SingleItem>
                  </Row>
                </Col>
              )}
            </Row>
          )}
        </>
      ) : (
        <div className="no-results" sm={0}>
          {data?.total_results === 0 ? (
            <>
              <h3 className="text-center mt-5 user-select-none errorText">
                {lang === "us"
                  ? "No matches found ! Try again"
                  : "Nema rezultata , pokusajte ponovo"}
              </h3>
              {/* <Carousell
                trending={trending}
                setFocusedMovieID={setFocusedMovieID}
              ></Carousell> */}
            </>
          ) : (
            <Container fluid className="popular mt-3">
              <Row className="d-flex justify-content-center align-items-center popular-wrapper">
                {!focusedMovie ? (
                  <Col
                    sm={3}
                    className="d-flex justify-content-center align-items-center flex-column"
                  >
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ height: "250px", width: "250px" }}
                    />
                    <h1 className="text-center">
                      {lang === "us"
                        ? "Latest movies and TV shows"
                        : "Aktuelni filmovi i TV serije"}
                    </h1>
                  </Col>
                ) : null}
                <Col
                  // style={{ height: "100%" }}
                  className="carousel"
                  sm={focusedMovie ? 6 : 8}
                >
                  <Carousell
                    trending={trending}
                    setFocusedMovieID={setFocusedMovieID}
                  ></Carousell>
                </Col>
                {focusedMovie ? (
                  <Col sm={6} className="focused-movie-home-page">
                    <SingleItem
                      resetFocusedMovieID={setFocusedMovieID}
                      movie={focusedMovie}
                      reset={reset}
                      lang={lang}
                    ></SingleItem>
                  </Col>
                ) : null}
              </Row>
            </Container>
          )}
        </div>
      )}
      <MovieRecommend
        show={showModal}
        onHide={() => setShowModal(false)}
        movie={recomendedMovie}
        lang={lang}
      ></MovieRecommend>
    </Container>
  );
};
export default Home;
