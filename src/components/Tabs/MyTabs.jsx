import { Tabs } from "antd";
import "./MyTabs.css";
import TopFilms from "../TopFilms/TopFilms";
import MainPage from "../MainPage/MainPage";
import WishList from "../WishList/WishList";
import { useState } from "react";
import GenreSelect from "../Select/GenreSelect";
import FilmsOnGenres from "../FilmsOnGenres/FilmsOnGenres";

export default function MyTabs() {
  const [id, setId] = useState([]);
  const [isAddButton, setIsAddButton] = useState(false);
  const [genre, setGenre] = useState(28);

  const items = [
    {
      key: "1",
      label: "Main",
      children: <MainPage />,
    },
    {
      key: "2",
      label: "Top 20 Films",
      children: (
        <div>
          <WishList id={id} isAddButton={isAddButton} />,
          <TopFilms setId={setId} setIsAddButton={setIsAddButton} />
        </div>
      ),
    },
    {
      key: "3",
      label: <GenreSelect setGenre={setGenre} />,
      children: (
        <div>
          <WishList id={id} isAddButton={isAddButton} />
          <FilmsOnGenres
            genre={genre}
            setId={setId}
            setIsAddButton={setIsAddButton}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="page-container">
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        tabPosition="left"
        color="white"
        items={items}
        style={{
          height: 220,
        }}
      ></Tabs>
    </div>
  );
}
