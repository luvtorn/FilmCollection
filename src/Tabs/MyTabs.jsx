import { Tabs } from "antd";
import MainPage from "../MainPage/MainPage";
import "./MyTabs.css";
import Films from "../Films/Films";

export default function MyTabs() {
  return (
    <div className="page-container">
      <Tabs
        className="tabs"
        defaultActiveKey="1"
        tabPosition="left"
        color="white"
        style={{
          height: 220,
        }}
      >
        <Tabs.TabPane tab="Top 20" key="2">
          <MainPage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Genres" key="1">
          <Films />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
