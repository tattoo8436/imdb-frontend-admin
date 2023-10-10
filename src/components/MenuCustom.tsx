import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  MailOutlined,
  SolutionOutlined,
  StarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const MenuCustom = () => {
  const itemPages = [
    {
      key: "/home",
      label: "Trang chủ",
      icon: <HomeOutlined />,
    },
    {
      key: "/movie",
      label: "Phim",
      icon: <VideoCameraOutlined />,
    },
    {
      key: "/actor",
      label: "Diễn viên",
      icon: <StarOutlined />,
    },
    {
      key: "/director",
      label: "Đạo diễn",
      icon: <SolutionOutlined />,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState(
    itemPages.find((i) => location.pathname.includes(i.key))?.key ?? "/"
  );

  useEffect(() => {
    setMenu(
      itemPages.find((i) => location.pathname.includes(i.key))?.key ?? "/"
    );
  }, [location]);

  const handleChangeMenu = (e: any) => {
    navigate(e.key);
    setMenu(e.key);
  };

  return (
    <div className="menu-custom">
      <Menu
        style={{ width: 250, height: "100vh" }}
        selectedKeys={[menu]}
        mode="inline"
        items={itemPages}
        onClick={handleChangeMenu}
      />
    </div>
  );
};

export default MenuCustom;
