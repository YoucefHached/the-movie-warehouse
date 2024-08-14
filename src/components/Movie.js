import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Movie = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState([]);

  const fetchData = async (query = "") => {
    try {
      const url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=fc69c9d0e3d11f3f848f7d75194c9bc1&query=${query}&language=fr-FR`
        : `https://api.themoviedb.org/3/discover/movie?api_key=fc69c9d0e3d11f3f848f7d75194c9bc1&language=fr-FR`;
      const moviesRes = await axios.get(url);
      setData(moviesRes.data.results);
      setSortedData(moviesRes.data.results);

      const genresRes = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=fc69c9d0e3d11f3f848f7d75194c9bc1&language=fr-FR"
      );
      setGenres(genresRes.data.genres);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setSortedData([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(search);
  };

  const handleSortTop = () => {
    const sorted = [...data].sort((a, b) => b.vote_average - a.vote_average);
    setSortedData(sorted);
  };

  const handleSortFlop = () => {
    const sorted = [...data].sort((a, b) => a.vote_average - b.vote_average);
    setSortedData(sorted);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie"
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="form">
        <button className="button-top-flop" onClick={handleSortTop}>
          {" "}
          Top <i className="fas fa-arrow-up"></i>
        </button>
        <button className="button-top-flop" onClick={handleSortFlop}>
          <i className="fas fa-arrow-down"></i> Flop
        </button>
      </div>
      <ul className="movie">
        {sortedData.length > 0 ? (
          sortedData.map((movie) => (
            <Card key={movie.id} movie={movie} genres={genres} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </ul>
    </div>
  );
};

export default Movie;
