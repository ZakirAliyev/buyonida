import {Outlet} from "react-router";
import ScrollToTop from "../../components/ScrollToTop/index.jsx";

function AdminMain() {
    return (
        <>
            <ScrollToTop/>
            <Outlet/>
        </>
    );
}

export default AdminMain;