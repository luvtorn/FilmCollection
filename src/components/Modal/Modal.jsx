import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { StarOutlined } from "@ant-design/icons";

import "./Modal.css";

export default function Modal({ open, setIsOpenModal, filmData }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal-dialog">
      <button className="close-button" onClick={() => setIsOpenModal(false)}>
        <div className="close-icon"></div>
      </button>
      <div className="filmInfo">
        <img
          src={`https://image.tmdb.org/t/p/original${filmData.poster_path}`}
        />
        <img
          src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
        />
        <div className="details">
          <p className="title">{filmData.title}</p>
          <p className="description">{filmData.overview}</p>
          <p className="release-date">Release date: {filmData.release_date}</p>
          <p className="raiting">
            Raiting: {filmData.vote_average?.toFixed(2)} <StarOutlined />
          </p>
          <p className="raiting">Quantity: {filmData.vote_count}</p>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
