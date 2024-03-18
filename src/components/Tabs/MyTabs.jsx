import { Tabs } from "antd";
import TopFilms from "../TopFilms/TopFilms";
import "./MyTabs.css";
import Films from "../Films/Films";
import MainPage from "../MainPage/MainPage";
import WishList from "../WishList/WishList";
import { useState } from "react";

export default function MyTabs() {
  const [id, setId] = useState([]);
  const [isAddButton, setIsAddButton] = useState(false);

  const items = [
    {
      key: "1",
      label: "Main",
      children: <MainPage />,
    },
    {
      key: "2",
      label: "Top 20 Films",
      children: <TopFilms setId={setId} setIsAddButton={setIsAddButton} />,
    },
    {
      key: "3",
      label: "Genres",
      children: <Films setId={setId} setIsAddButton={setIsAddButton} />,
    },
    {
      key: "4",
      label: "Wish list",
      children: <WishList id={id} isAddButton={isAddButton} />,
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
