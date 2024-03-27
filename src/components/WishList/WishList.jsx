import { wishListService } from "../../services/film.service";
import { useEffect, useState } from "react";
import "../../index.css";
import "./WishList.css";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";

function WishList(id, isAddButton) {
  const [wishFilms, setWishFilms] = useState([]);
  const [openWishList, setOpenWishList] = useState(false);

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
        console.error("Error: ", error);
      }
    };

    fetchNewFilms();

    const localFilms = getFilms();
    setWishFilms(localFilms);
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
    <div className="container">
      <div className="wish" onClick={() => setOpenWishList(!openWishList)}>
        <p>WishList</p>
        {openWishList ? <CaretUpOutlined /> : <CaretDownOutlined />}
        <CSSTransition
          in={openWishList}
          timeout={200}
          classNames="wish-list"
          unmountOnExit
        >
          <ul className="wish-list">
            {wishFilms.length > 0 ? (
              wishFilms.map((elem) => (
                <li
                  key={elem.id}
                  onClick={(e) => e.stopPropagation()}
                  className="wish-item"
                >
                  
                  <div className="wish-content">
                    <img
                      src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
                      alt={elem.title}
                    />
                    <p>{elem.title}</p>
                  </div>
                  {isAddButton && (
                    <button
                      className="delete-btn"
                      onClick={() => deleteFilm(elem.id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))
            ) : (
              <h2 style={{ color: "black" }}>WishList is empty</h2>
            )}
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
}

export default WishList;
