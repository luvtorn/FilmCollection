import { useState } from "react";
import Modal from "../Modal/Modal";
import { StarOutlined } from '@ant-design/icons';
import "./FilmCard.css";

export default function FilmCard({ filmData }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Modal open={isOpenModal} title={filmData.title} setIsOpenModal={setIsOpenModal} filmData={filmData}/>
      <div className="film" onClick={() => setIsOpenModal(true)}>
        <img src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`} alt={filmData.title} />
        <p>{filmData.title}</p>
        <p>Raiting: {filmData.vote_average.toFixed(2)} <StarOutlined /></p>
      </div>
    </>
  );
}

