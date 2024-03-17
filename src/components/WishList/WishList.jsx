import { wishListService } from "../../services/film.service";
import { useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";
import "./WishList.css";

function WishList(id, isAddButton) {
  const [wishFilms, setWishFilms] = useState([]);

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const { data } = await wishListService.getData(id);
        if (!wishFilms.find((film) => film.id === data.id)) {
          setWishFilms((prev) => [...prev, data]);
          const saveFilms = getFilms();
          saveFilms.push(data);
          setFilms(saveFilms);
        }
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();

    const localFilms = getFilms()
    setWishFilms(localFilms)
  }, [id]);

  const deleteFilm = (idToDelete) => {
    const filteredFilmList = wishFilms.filter((film) => film.id !== idToDelete);
    setWishFilms(filteredFilmList);
    setFilms(filteredFilmList);
  };

  const getFilms = () => {
    return JSON.parse(localStorage.getItem("films")) ?? [];
  };

  const setFilms = (film) => {
    localStorage.setItem("films", JSON.stringify(film));
  };

  return (
    <div className="wishfilms">
      <ul>
        {wishFilms.length > 0 ? (
          <>
            {wishFilms.map((elem) => (
              <li key={elem.id}>
                <FilmCard filmData={elem} isAddButton={isAddButton} />
                {isAddButton && (
                  <button
                    className="delete-btn"
                    onClick={() => deleteFilm(elem.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </>
        ) : (
          <h2 style={{ color: "white" }}>Films are empty</h2>
        )}
      </ul>
    </div>
  );
}

export default WishList;
