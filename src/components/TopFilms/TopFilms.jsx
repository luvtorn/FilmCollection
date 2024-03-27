import { useEffect, useState } from "react";
import { Spin, Input } from "antd";
import FilmCard from "../FilmCard/FilmCard";
import { filmsService } from "../../services/film.service";
import "./TopFilms.css";

export default function TopFilms({ setId, setIsAddButton }) {
  const [films, setFilms] = useState([]);
  const [filterFilm, setFilterFilm] = useState("");

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData("topFilms");
        setFilms(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchNewFilms();
  }, []);

  return (
    <div className="container">
      <div className="top-films">
        <Input
          className="find-film-input"
          placeholder="Find your film"
          value={filterFilm}
          onChange={(e) => setFilterFilm(e.target.value)}
        />
        <ul>
          {films.results ? (
            films.results
              .filter((film) =>
                film.title.toLowerCase().includes(filterFilm.toLowerCase())
              )
              .map((film) => {
                return (
                  <li key={film.id}>
                    <FilmCard
                      filmData={film}
                      setWishFilmId={setId}
                      setIsAddButton={setIsAddButton}
                    />
                  </li>
                );
              })
          ) : (
            <Spin style={{ margin: "0 auto" }} tip="Loading" size="large" />
          )}
        </ul>
      </div>
    </div>
  );
}
