import React from "react";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from "../slices/moviesSlices";
// c2e8864a
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies);
  const isLoading = useSelector((state) => state.isLoading);

  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    dispatch(getMovies(searchString));
    console.log(isLoading);
  }, [searchString]);
  // if (isLoading) {
  //   return <h1>LOADING</h1>;
  // }
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col lg="6" xs="10" className="mt-5">
          <input
            type="text"
            className="form-control m-2 mr-sm-2"
            placeholder="Search for a movie"
            onChange={(e) => {
              if (e.target.value.length > 3) setSearchString(e.target.value);
            }}
          />
        </Col>
      </Row>
      {data?.length ? (
        <>
          <Row>
            {data?.map((item) =>
              item.Poster !== "N/A" ? (
                <Col
                  key={item.imdbID}
                  style={{ height: "100%" }}
                  sm="3"
                  onClick={() => {
                    navigate("/item", {
                      state: {
                        id: item.imdbID,
                      },
                    });
                  }}
                >
                  <Card className="p-4 m-3 singleItem">
                    <img src={item.Poster} alt="img" />
                    {item.Title}
                  </Card>
                </Col>
              ) : null
            )}
          </Row>
        </>
      ) : (
        <>
          <h1 className="text-center mt-5">Welcome to movie database !</h1>
          <h3 className="text-center">Please enter search terms !</h3>
        </>
      )}
    </Container>
  );
};
export default Home;
