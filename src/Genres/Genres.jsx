import { useState, useEffect, useCallback } from "react";
import { Spin } from "antd";
import "./Genres.css";

function Genres({ setGenre }) {
  const [genres, setGenres] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
    },
  };

  const fetchGenres = useCallback(async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list",
      options
    );
    const genres = await res.json();
    setGenres(genres);
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleGenreClick = (genreId) => {
    setGenre(genreId);
  };

  return (
    <div className="genres-menu">
      <ul>
        {genres.genres ? (
          genres.genres.map((genre) => {
            return <li className="genre-item" key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</li>;
          })
        ) : (
          <Spin style={{ margin: "0 auto" }} tip="Loading" size="large" />
        )}
      </ul>
    </div>
  );
}

export default Genres;
