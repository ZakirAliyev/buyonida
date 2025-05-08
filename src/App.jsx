import {useTranslation} from "react-i18next";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes/ROUTES.jsx";
import Cookies from "js-cookie";
import {ConfigProvider} from "antd";
import {HelmetProvider} from "react-helmet-async";

const routes = createBrowserRouter(ROUTES);

function App() {
    const {
        t
    } = useTranslation();
    if (!Cookies.get("chooseMarket")) {
        Cookies.set("chooseMarket", "null");
    }
    if (!Cookies.get("uniqueCode")) {
        Cookies.set("uniqueCode", "null");
    }
    if (!Cookies.get("redirectMarketName")) {
        Cookies.set("redirectMarketName", "null");
    }
    return <HelmetProvider>
        <ConfigProvider>
            <RouterProvider router={routes}/>
        </ConfigProvider>
    </HelmetProvider>;
}

export default App;