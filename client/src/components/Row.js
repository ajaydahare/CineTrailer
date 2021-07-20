import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TMDB_API } from "../api/tmdbRequests";
import { toast } from "react-toastify";
import "./Row.css";
import { Link } from "react-router-dom";

const imageBase = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLarge, setFeaturedMovie, user }) {
  const [movies, setMovies] = useState([]);

  const { activePack } = useSelector((state) => state.packs);

  useEffect(() => {
    const fetchMovie = async () => {
      const request = await TMDB_API.get(fetchUrl)
        .then((response) => {
          setMovies(response.data.results.slice(1, 10));
        })
        .catch((error) => {
          console.log(error);
        });
      return request;
    };
    fetchMovie();
  }, [fetchUrl]);

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };

  const handleClick = (movie) => {
    if (activePack) {
      window.scrollTo(0, 0);
      setFeaturedMovie(movie);
    } else {
      toast.info(
        user ? (
          ` Hey! ${user?.result?.name} Please Purchase Subscription To Continue Watching`
        ) : (
          <p>
            Please Login To Continue Watching
            <Link to="/login">
              <span> Login</span>
            </Link>
          </p>
        )
      );
    }
  };

  return (
    <div className="row__container">
      <h1>{title}</h1>
      <div className="row__items">
        {movies.map((movie) => {
          return (
            <div
              className={`row__item ${isLarge && "row__itemLarge"}`}
              key={movie?.id}
              onClick={() => {
                handleClick(movie);
              }}
            >
              <img
                className="rowItem__image"
                src={`${imageBase}${
                  movie?.backdrop_path || movie?.poster_path
                } `}
                alt=""
              />
              <div className="rowItem__info">
                <h3 className="rowItem__title">
                  {movie?.title ||
                    movie?.original_title ||
                    movie?.name ||
                    movie?.original_name}
                  <span className="forItem_year">
                    (
                    {getReleaseYear(
                      movie?.release_date || movie?.first_air_date
                    )}
                    )
                  </span>
                </h3>
                <p></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
