import { useState, useEffect } from "react";
import { Spin } from "antd";
import "./Genres.css";
import { filmsService } from "../../services/film.service";

function Genres({ setGenre }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData("Genres");
        setGenres(data);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();
  }, []);

  const handleGenreClick = (genreId) => {
    setGenre(genreId);
  };

  return (
    <div className="genres-menu">
      <ul>
        {genres.genres ? (
          genres.genres.map((genre) => {
            return (
              <li
                className="genre-item"
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
              >
                {genre.name}
              </li>
            );
          })
        ) : (
          <Spin style={{ margin: "0 auto" }} tip="Loading" size="large" />
        )}
      </ul>
    </div>
  );
}

export default Genres;
