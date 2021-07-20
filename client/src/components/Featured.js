import React, { useState } from "react";
import "./Featured.css";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import Grow from "@material-ui/core/Grow";
import Rating from "@material-ui/lab/Rating";
import TextTruncate from "react-text-truncate";
import Button from "@material-ui/core/Button";
import ModalVideo from "react-modal-video";
import "./modelVideo.css";
import { fetchMovieId, TMDB_API } from "../api/tmdbRequests";
import { useDispatch } from "react-redux";

const largeImageBase = "https://image.tmdb.org/t/p/original";

function Featured({ featuredMovie }) {
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [overviewText, setOverviewText] = useState(2);

  const dispatch = useDispatch();

  const getReleaseYear = (date) => {
    let year = new Date(date);
    return year.getFullYear();
  };
  const handleClick = async (id) => {
    dispatch({ type: "START_LOADING" });
    setVideoId("");
    await TMDB_API.get(fetchMovieId(id)).then((response) => {
      console.log(response);
      setVideoId(response.data.videos.results[0]?.key || "oN0BKg3FGqs");
    });
    dispatch({ type: "END_LOADING" });

    setPlaying(true);
  };
  return (
    <div className="app__featured">
      {videoId && (
        <Grow in={playing} mountOnEnter unmountOnExit>
          <ModalVideo
            channel="youtube"
            isOpen="true"
            videoId={videoId}
            onClose={() => setPlaying(false)}
          />
        </Grow>
      )}
      <div
        className="app__overlay"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${largeImageBase}${
            featuredMovie?.backdrop_path || featuredMovie?.poster_path
          }")`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="featured__deatils">
        <p>Today's featured film</p>
        <h2 className="featured__title">
          {featuredMovie?.title ||
            featuredMovie?.original_title ||
            featuredMovie?.name ||
            featuredMovie?.original_name}

          <span className="featured_year">
            (
            {getReleaseYear(
              featuredMovie?.release_date || featuredMovie?.first_air_date
            )}
            )
          </span>
        </h2>
        <TextTruncate
          line={overviewText}
          element="p"
          containerClassName="app__featuredDesc"
          textTruncateChild={
            <button
              className="featured__overviewMore"
              onClick={() => {
                setOverviewText(0);
              }}
            >
              <small>[more]</small>
            </button>
          }
          truncateText="…"
          text={featuredMovie?.overview?.substr(0, 300)}
        />
        {featuredMovie?.number_of_seasons && (
          <p className="app__seriesSeasons">
            {featuredMovie?.number_of_seasons} Seasons,{" "}
            {featuredMovie?.number_of_episodes} Episodes
          </p>
        )}
        <div className="featured__rating">
          <Rating
            name="movie-rating"
            value={featuredMovie?.vote_average / 2}
            precision={0.5}
            icon={<StarRoundedIcon fontSize="inherit" readOnly />}
          />
          <span className="featured__voteAvarage">
            {(featuredMovie?.vote_average / 2).toFixed(1)}
          </span>
          <span className="featured__voteCount">{`(${featuredMovie?.vote_count})`}</span>
        </div>
        <Button
          className="featured__playButton"
          variant="contained"
          onClick={() => {
            handleClick(featuredMovie?.id);
          }}
          startIcon={<PlayArrowRoundedIcon />}
        >
          Play Trailer
        </Button>
      </div>

      <div className="featured__fadeBottom" />
    </div>
  );
}

export default Featured;
