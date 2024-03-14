import { Tabs } from "antd";
import TopFilms from "../TopFilms/TopFilms";
import "./MyTabs.css";
import Films from "../Films/Films";
import MainPage from "../MainPage/MainPage";
import WishList from "../WishList/WishList";
import { useState } from "react";

export default function MyTabs() {
  const [id, setId] = useState(null)

  const items = [
    {
      key: "2",
      label: "Main",
      children: <MainPage />,
    },
    {
      key: "4",
      label: "Top 20 Films",
      children: <TopFilms setId={setId}/>,
    },
    {
      key: "3",
      label: "Genres",
      children: <Films setId={setId}/>,
    },
    {
      key: "1",
      label: "Wish list",
      children: <WishList id={id}/>,
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
