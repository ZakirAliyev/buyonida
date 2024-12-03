import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./routes/ROUTES.jsx";
import Cookies from 'js-cookie'

const routes = createBrowserRouter(ROUTES);

function App() {

    const token = Cookies.get("token");
    if (!token) {
        Cookies.set("token", "null");
    }
    const userId = Cookies.get("userId");
    if (!userId) {
        Cookies.set("userId", "null");
    }

    return (
        <RouterProvider router={routes}/>
    );
}

export default App;
