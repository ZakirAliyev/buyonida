import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes/ROUTES.jsx";
import Cookies from 'js-cookie'

const routes = createBrowserRouter(ROUTES);

function App() {

    const token = Cookies.get("buyonidaToken");
    if (!token) {
        Cookies.set("buyonidaToken", "null");
    }

    return (
        <RouterProvider router={routes}/>
    );
}

export default App;
