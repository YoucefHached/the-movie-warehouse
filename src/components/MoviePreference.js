import React, { useEffect, useState } from "react";
import "../App.css";
import CardPreference from "./CardPreference";
import axios from "axios";

const MoviePreference = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length > 0) {
      const fetchMovies = async () => {
        const movies = [];
        for (const favorite of favorites) {
          const movie = await fetchData(favorite);
          if (movie) movies.push(movie);
        }
        setData(movies);
      };
      fetchMovies();
    }
  }, []);

  const fetchData = async (favorite) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${favorite}?api_key=fc69c9d0e3d11f3f848f7d75194c9bc1&language=fr-FR`;
      const movieRes = await axios.get(url);
      return movieRes.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const removeMovie = (id) => {
    const updatedData = data.filter((movie) => movie.id !== id);
    setData(updatedData);
  };

  return (
    <div>
      <h2 className="titlePref">
        Coupe de cœur {"     "}
        <i className="fas fa-heart"></i>
      </h2>
      <ul className="movie">
        {data.length > 0 ? (
          data.map((movie) => (
            <CardPreference
              key={movie.id}
              movie={movie}
              onRemove={removeMovie}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </ul>
    </div>
  );
};

export default MoviePreference;
