import React, { useState, useEffect } from "react";
import axios from "./service/axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, largeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };
    getMovies();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=VeEkAdt1GCs
          const urlParams = new URLSearchParams(new URL(url).search);
          const vParam = urlParams.get("v");
          setTrailerUrl(vParam);
        })
        .catch((error) => console.log(movie.name + error));
    }
  };

  return (
    <div className="row">
      {/* title */}
      <h2 className="row__title">{title}</h2>
      {/* container */}
      <div className="row__posters">
        {/* poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className={`row__poster  ${largeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              largeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt=""
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
