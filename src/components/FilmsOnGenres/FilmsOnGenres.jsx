import { useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import { filmsService } from "../../services/film.service";
import { Spin, Pagination } from "antd";

function FilmsOnGenres({ genre, setId, setIsAddButton }) {
  const [filmsByGenre, setFilmsByGenre] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const data = await filmsService.getData("", genre, page);
        setFilmsByGenre(data);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();
  }, [page]);

  return (
    <div>
      <Pagination
        className="pagination"
        onChange={(e) => setPage(e)}
        current={page}
        total={filmsByGenre.total_pages}
        showSizeChanger={false}
      />
      <ul>
        {filmsByGenre.results ? (
          filmsByGenre.results.map((film) => {
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
  );
}

export default FilmsOnGenres;
