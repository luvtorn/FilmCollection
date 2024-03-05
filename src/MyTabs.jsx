import React, { useState } from "react";
import { Radio, Tabs } from "antd";
export default function MyTabs() {
  const [mode, setMode] = useState("top");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition='left'
        style={{
          height: 220,
        }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
}
