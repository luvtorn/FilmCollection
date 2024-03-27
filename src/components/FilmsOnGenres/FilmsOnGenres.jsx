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
        console.error("Error: ", error);
      }
    };

    fetchNewFilms();
  }, [page, genre]);

  const handleChangePage = (e) => {
    setPage(e);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
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
      <Pagination
        className="pagination"
        onChange={handleChangePage}
        current={page}
        total={filmsByGenre.total_pages}
        showSizeChanger={false}
      />
    </div>
  );
}

export default FilmsOnGenres;
