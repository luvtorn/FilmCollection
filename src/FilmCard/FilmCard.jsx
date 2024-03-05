import { useState } from "react";
import Modal from "../Modal/Modal";
import "./FilmCard.css";

export default function FilmCard({ path, filmData }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Modal open={isOpenModal} title={filmData.title} path={path} setIsOpenModal={setIsOpenModal} filmData={filmData}/>
      <div className="film" onClick={() => setIsOpenModal(true)}>
        <img src={`https://image.tmdb.org/t/p/original${path}`} />
        <p>{filmData.title}</p>
        <p>Raiting: {filmData.vote_average.toFixed(2)}</p>
      </div>
    </>
  );
}

// сделать рендер всех фильмов и навесить на каждый элемент клик, который откроет подробную инфу про фильм
