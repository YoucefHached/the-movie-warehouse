import React, { useState } from "react";

const Card = ({ movie, genres }) => {
  const [notification, setNotification] = useState("");

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? (
          <span
            key={id}
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
        ) : null;
      })
      .filter((element) => element)
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

  const genreNames = getGenreNames(movie.genre_ids);

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : "URL_D_UNE_IMAGE_PAR_DEFAUT";

  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(movie.id)) {
      favorites.push(movie.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setNotification("Film ajouté aux favoris !");
    } else {
      setNotification("Film déjà ajouté !");
    }
    setTimeout(() => setNotification(""), 1800);
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
      <button className="button-coupe" onClick={addToFavorites}>
        Ajouter au coupe de cœur
      </button>
      {notification && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor:
              notification === "Film déjà ajouté !"
                ? "lightcoral"
                : "lightgreen",
            color: "black",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {notification}
        </div>
      )}
    </li>
  );
};

export default Card;
