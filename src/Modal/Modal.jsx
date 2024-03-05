import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import "./Modal.css";

export default function Modal({
  open,
  path,
  setIsOpenModal,
  filmData,
}) {
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
        <img src={`https://image.tmdb.org/t/p/original${path}`} />
        <div className="details">
          <p className="title">{filmData.title}</p>
          <p className="description">{filmData.overview}</p>
          <p className="release-date">Release date: {filmData.release_date}</p>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
