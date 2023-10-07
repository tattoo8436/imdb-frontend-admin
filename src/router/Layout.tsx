import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import NotFound from "../pages/not-found/NotFound";
import Movie from "../pages/movie";
import Actor from "../pages/actor";

const Layout = () => {
  const isLogin = Boolean(localStorage.getItem("account"));

  return (
    <div className="layout">
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/actor" element={<Actor />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Layout;
