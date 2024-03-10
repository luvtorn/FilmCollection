import { useCallback, useEffect, useState } from "react";
import { Spin, Input } from "antd";
import FilmCard from "../FilmCard/FilmCard";
import "./MainPage.css";

export default function MainPage() {
  const [films, setFilms] = useState([]);
  const [filterFilm, setFilterFilm] = useState("")

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGU1ZTBiZjU2OTk5MTM2MjVlNTczMmJlMWRmNzgyNiIsInN1YiI6IjY1ZTI4NmRkZGI3MmMwMDE3Y2Y1MDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Es6eAgreUvmnlH11qO6vzVOFGcxENSUqxX3OpRIN81Q",
    },
  };

  const fetchFilms = useCallback(async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc",
      options
    );
    const films = await res.json();
    setFilms(films);
    console.log(films);
  }, []);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return (
    <div className="top-films">
      <Input className="find-film-input" placeholder="Find your film" value={filterFilm} onChange={(e) => setFilterFilm(e.target.value)}/>
      <ul>
        {films.results ? (
          films.results.filter((film) => film.title.toLowerCase().includes(filterFilm.toLowerCase())).map((film) => {
            return (
              <li key={film.id}>
                <FilmCard
                  filmData={film}
                />
              </li>
            );
          })
        ) : (
          <Spin style={{margin: '0 auto'}} tip="Loading" size="large" />
        )}
      </ul>
    </div>
  );
}
