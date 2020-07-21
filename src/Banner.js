import React, { useState, useEffect } from "react";
import axois from "./service/axios";
import requests from "./service/request";
import "./Banner.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axois.get(requests.fetchNetflixOriginals);
      const randomMovie = Math.floor(
        Math.random() * response.data.results.length - 1
      );
      setMovie(response.data.results[randomMovie]);
    };
    fetchMovie();
  }, []);

  const truncate = (str, maxLength = 150) =>
    str?.length > maxLength ? str.substr(0, maxLength - 1) + "..." : str;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl + movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* title */}
        <h1 className="banner__title">
          {movie?.original_title || movie?.title}
        </h1>
        {/* 2 buttons */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* description */}
        <h1 className="banner__description">{truncate(movie?.overview)}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
