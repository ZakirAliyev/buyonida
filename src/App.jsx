import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/ROUTES.jsx";
import Cookies from 'js-cookie';
import { ConfigProvider } from "antd";

const routes = createBrowserRouter(ROUTES);

function App() {
    if (!Cookies.get("chooseMarket")) {
        Cookies.set("chooseMarket", "null");
    }

    if (!Cookies.get("uniqueCode")) {
        Cookies.set("uniqueCode", "null");
    }

    return (
        <ConfigProvider>
            <RouterProvider router={routes} />
        </ConfigProvider>
    );
}

export default App;