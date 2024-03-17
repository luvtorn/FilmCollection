import { useState } from "react";

import Modal from "../Modal/Modal";
import "./FilmCard.css";

import { StarOutlined } from "@ant-design/icons";
import { message } from "antd";

export default function FilmCard({ filmData, setWishFilmId, isAddButton }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleIdClick = (id) => {
    setWishFilmId(id);
    messageApi.open({
      type: "success",
      content: "Successfully added",
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpenModal}
        title={filmData.title}
        setIsOpenModal={setIsOpenModal}
        filmData={filmData}
      />
      <div className="film" onClick={() => setIsOpenModal(true)}>
        <img
          src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
          alt={filmData.title}
        />
        <p>{filmData.title}</p>
        <p>
          Raiting: {filmData.vote_average?.toFixed(2)} <StarOutlined />
        </p>
      </div>
      {!isAddButton && (
        <button
          className="add-to-wish-btn"
          onClick={() => handleIdClick(filmData.id)}
        >
          Add to Wish List
        </button>
      )}
    </>
  );
}
