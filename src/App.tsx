import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Layout from "./router/Layout";
import { BrowserRouter } from "react-router-dom";
import MenuCustom from "./components/MenuCustom";

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Segoe UI",
          },
        }}
      >
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <MenuCustom />
          <Layout />
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
