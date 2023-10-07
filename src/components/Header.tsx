import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../utils";

const Header = () => {
  const account = getCurrentAccount();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];

  return (
    <div className="header">
      <div className="header__left" onClick={() => navigate("/")}>
        <VideoCameraOutlined className="header__left__item logo" />

        <div className="header__left__item">The Movie Database</div>
      </div>

      <div className="header__right">
        <Dropdown menu={{ items }}>
          <div className="header__right__btn">
            <UserOutlined className="header__right__btn__avatar" />
            <span>{account?.username}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
