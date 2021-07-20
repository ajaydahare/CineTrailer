import React, { useEffect, useState } from "react";
import requests from "../api/tmdbRequests";
import Featured from "./Featured";
import { TMDB_API } from "../api/tmdbRequests";
import Row from "./Row";
import { useDispatch } from "react-redux";
function Home({ user }) {
  const [featuredMovie, setFeaturedMovie] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      await TMDB_API.get(requests.fetchPopularMovies).then((response) => {
        setFeaturedMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
        dispatch({ type: "END_LOADING" });
      });
    };
    fetchMovie();
  }, []);

  return (
    <>
      <Featured featuredMovie={featuredMovie} />
      <div className="app__rows">
        <Row
          title="Trending Movies"
          fetchUrl={requests.fetchTrendingMovies}
          setFeaturedMovie={setFeaturedMovie}
          isLarge
          user={user}
        />
        <Row
          title="Latest Movies"
          fetchUrl={requests.fetchPopularMovies}
          setFeaturedMovie={setFeaturedMovie}
          user={user}
        />
        <Row
          title="Top Rated Movies"
          fetchUrl={requests.fetchTopRatedMovies}
          setFeaturedMovie={setFeaturedMovie}
          user={user}
        />
      </div>
    </>
  );
}

export default Home;
