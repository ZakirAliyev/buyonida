import './index.scss';
import AdminLeftMenu from "../../../components/AdminComponents/AdminLeftMenu/index.jsx";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import {useLocation} from "react-router";
import AdminHomeMenu from "../../../components/AdminComponents/AdminMenus/AdminHomeMenu/index.jsx";
import AdminOrdersMenu from "../../../components/AdminComponents/AdminMenus/AdminOrdersMenu/index.jsx";
import AdminProductsMenu from "../../../components/AdminComponents/AdminMenus/AdminProductsMenu/index.jsx";
import AdminAnalyticsMenu from "../../../components/AdminComponents/AdminMenus/AdminAnalyticsMenu/index.jsx";
import AdminCustomizeStoreMenu from "../../../components/AdminComponents/AdminMenus/AdminCustomizeStoreMenu/index.jsx";
import AdminDiscountsMenu from "../../../components/AdminComponents/AdminMenus/AdminDiscountsMenu/index.jsx";
import AdminSettingsMenu from "../../../components/AdminComponents/AdminMenus/AdminSettingsMenu/index.jsx";
import AdminAddProductMenu from "../../../components/AdminComponents/AdminMenus/AdminAddProductMenu/index.jsx";
import AdminCollectionsMenu from "../../../components/AdminComponents/AdminMenus/AdminCollectionsMenu/index.jsx";
import AdminAddCollectionMenu from "../../../components/AdminComponents/AdminMenus/AdminAddCollectionMenu/index.jsx";

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
                        ) : url.pathname === '/cp/analytics' ? (
                            <AdminAnalyticsMenu/>
                        ) : url.pathname === '/cp/customize-store' ? (
                            <AdminCustomizeStoreMenu/>
                        ) : url.pathname === '/cp/discounts' ? (
                            <AdminDiscountsMenu/>
                        ) : url.pathname === '/cp/settings' ? (
                            <AdminSettingsMenu/>
                        ) : url.pathname === '/cp/add-product' ? (
                            <AdminAddProductMenu/>
                        ) : url.pathname === '/cp/collections' ? (
                            <AdminCollectionsMenu/>
                        ) : url.pathname === '/cp/add-collection' ? (
                            <AdminAddCollectionMenu/>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminHomePage;
