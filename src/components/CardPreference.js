import React from "react";
import "../App.css";

const CardPreference = ({ movie, onRemove }) => {
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : "URL_D_UNE_IMAGE_PAR_DEFAUT";

  const getGenreNames = (genres) => {
    return genres
      .map((genre) => (
        <span
          key={genre.id}
          style={{
            padding: "5px",
            marginRight: "2px",
            backgroundColor: getRandomColor(),
            borderRadius: "5px",
            color: "black",
            fontSize: "10px",
          }}
        >
          {genre.name}
        </span>
      ))
      .slice(0, 3);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const genreNames = getGenreNames(movie.genres);

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const removeFromFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movie.id)) {
      const index = favorites.indexOf(movie.id);
      if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        onRemove(movie.id);
      }
    }
  };

  return (
    <li className="card">
      <div className="img-container">
        <img src={imageUrl} alt={`Affiche de ${movie.title}`} className="img" />
      </div>
      <h3 className="movie-title">{movie.title}</h3>
      {movie.release_date && (
        <p className="date">sorti le : {formatDate(movie.release_date)}</p>
      )}
      {movie.vote_average && (
        <p style={{ fontSize: "12px", marginBottom: "15px" }}>
          {movie.vote_average.toFixed(1)}/10
          <i
            className="fas fa-star"
            style={{ marginLeft: "5px", color: "gold" }}
          ></i>
        </p>
      )}
      <h5 style={{ marginBottom: "15px" }}>{genreNames}</h5>
      <p className="synopsis">synopsis : {movie.overview}</p>
      <button className="button-coupe" onClick={removeFromFavorites}>
        supprimer de coupe de cœur
      </button>
    </li>
  );
};

export default CardPreference;
