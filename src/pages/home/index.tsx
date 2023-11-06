import { Tabs, TabsProps } from "antd";
import NumberVote from "./NumberVote";

const Home = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Số lượng đánh giá",
      children: <NumberVote />,
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
