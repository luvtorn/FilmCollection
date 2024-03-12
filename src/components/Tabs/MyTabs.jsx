import { Tabs } from "antd";
import TopFilms from "../TopFilms/TopFilms";
import "./MyTabs.css";
import Films from "../Films/Films";
import MainPage from "../MainPage/MainPage";

const items = [
  {
    key: "1",
    label: "Main",
    children: <MainPage />,
  },
  {
    key: "2",
    label: "Top 20 Films",
    children: <TopFilms />,
  },
  {
    key: "3",
    label: "Genres",
    children: <Films />,
  },
];

export default function MyTabs() {
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
