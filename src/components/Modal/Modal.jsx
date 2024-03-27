import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import "./Modal.css";

export default function Modal({ open, setIsOpenModal, filmData }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return createPortal(
    <div
      className={open ? "modal active" : "modal"}
      onClick={() => setIsOpenModal(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filmInfo">
          <img
            className="modal-img"
            src={`https://image.tmdb.org/t/p/original${filmData.poster_path}`}
          />
          <div className="details">
            <p className="title">{filmData.title}</p>
            <p className="description">{filmData.overview}</p>
            <p className="release-date">
              Release date: {filmData.release_date}
            </p>
            <p className="raiting">
              Raiting: {filmData.vote_average?.toFixed(2)}
            </p>
            <p className="raiting">Quantity: {filmData.vote_count}</p>
            <img
              className={windowWidth < 700 ? "modal-img none" : "modal-img"}
              style={{ width: 550 }}
              src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
