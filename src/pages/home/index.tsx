import { Button, Tabs, TabsProps } from "antd";
import NumberVote from "./NumberVote";
import Trending from "./Trending";
import { useState } from "react";

const Home = () => {
  // const socket = new WebSocket("ws://localhost:4000");

  // socket.onopen = () => {
  //   console.log("WebSocket connected");
  // };

  // socket.onmessage = (e) => {
  //   console.log(e.data);
  // };

  // const handleSend = () => {
  //   socket.send("Ha");
  // };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Số lượng đánh giá",
      children: <NumberVote />,
    },
    {
      key: "2",
      label: "Top thịnh hành",
      children: <Trending />,
    },
  ];

  return (
    <div className="home">
      <div className="home__title">Thống kê phim</div>

      <div className="home__content">
        <Tabs items={items} defaultActiveKey="1" />
      </div>
    </div>
  );
};

export default Home;
