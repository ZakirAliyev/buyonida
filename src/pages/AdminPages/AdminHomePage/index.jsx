import './index.scss';
import AdminLeftMenu from "../../../components/AdminComponents/AdminLeftMenu/index.jsx";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import {useLocation} from "react-router";
import AdminHomeMenu from "../../../components/AdminComponents/AdminMenus/AdminHomeMenu/index.jsx";
import AdminOrdersMenu from "../../../components/AdminComponents/AdminMenus/AdminOrdersMenu/index.jsx";
import AdminProductsMenu from "../../../components/AdminComponents/AdminMenus/AdminProductsMenu/index.jsx";

function AdminHomePage() {
    const url = useLocation();

    return (
        <section id="adminHomePage">
            <AdminNavbar/>
            <div className="wrapper">
                <AdminLeftMenu/>
                <div className="adminWrapper">
                    <div className="container1">
                        {url.pathname === '/cp/home' ? (
                            <AdminHomeMenu/>
                        ) : url.pathname === '/cp/orders' ? (
                            <AdminOrdersMenu/>
                        ) : url.pathname === '/cp/products' ? (
                            <AdminProductsMenu/>
                        ) : url.pathname === '/cp/customers' ? (
                            <AdminOrdersMenu/>
                        ) : url.pathname === '/cp/content' ? (
                            <AdminOrdersMenu/>
                        ) : url.pathname === '/cp/analytics' ? (
                            <AdminOrdersMenu/>
                        ) : url.pathname === '/cp/marketing' ? (
                            <AdminOrdersMenu/>
                        ) : url.pathname === '/cp/discounts' ? (
                            <AdminOrdersMenu/>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminHomePage;
