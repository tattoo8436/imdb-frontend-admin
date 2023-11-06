import {
  BarsOutlined,
  SolutionOutlined,
  StarOutlined,
  StockOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuCustom = () => {
  const itemPages = [
    {
      key: "/home",
      label: "Thống kê",
      icon: <StockOutlined />,
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
    {
      key: "/genre",
      label: "Thể loại",
      icon: <BarsOutlined />,
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
