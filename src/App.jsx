import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes/ROUTES.jsx";
import Cookies from 'js-cookie'
import {ConfigProvider} from "antd";

const routes = createBrowserRouter(ROUTES);

function App() {

    const token = Cookies.get("buyonidaToken");
    if (!token) {
        Cookies.set("buyonidaToken", "null");
    }

    const chooseMarket = Cookies.get("chooseMarket");
    if (!chooseMarket) {
        Cookies.set("chooseMarket", "null");
    }

    const uniqueCode = Cookies.get("uniqueCode");
    if (!uniqueCode) {
        Cookies.set("uniqueCode", "null");
    }

    return (
        <ConfigProvider>
            <RouterProvider router={routes}/>
        </ConfigProvider>
    );
}

export default App;
