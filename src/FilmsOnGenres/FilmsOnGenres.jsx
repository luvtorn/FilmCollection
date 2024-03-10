import { useCallback, useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import { Spin, Pagination } from "antd";

function FilmsOnGenres(genre) {
  const [filmsByGenre, setFilmsByGenre] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
    },
  };

  const fetchfilmsByGenre = useCallback(async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.genre}`,
      options
    );
    const filmsByGenre = await res.json();
    setFilmsByGenre(filmsByGenre);
  }, [filmsByGenre]);

  useEffect(() => {
    fetchfilmsByGenre();
  }, [fetchfilmsByGenre]);

  console.log(filmsByGenre);

  return (
    <div>
      <ul>
        {filmsByGenre.results ? (
          filmsByGenre.results.map((film) => {
            return (
              <li key={film.id}>
                <FilmCard filmData={film} />
              </li>
            );
          })
        ) : (
          <Spin style={{ margin: "0 auto" }} tip="Loading" size="large" />
        )}
      </ul>
      <Pagination className="pagination" defaultCurrent={1} total={50} />
    </div>
  );
}

export default FilmsOnGenres;
