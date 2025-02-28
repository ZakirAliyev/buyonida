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
import AdminAddCategoryMenu from "../../../components/AdminComponents/AdminMenus/AdminAddCategoryMenu/index.jsx";
import AdminCategoriesMenu from "../../../components/AdminComponents/AdminMenus/AdminCategoriesMenu/index.jsx";
import AdminEditCategoryMenu from "../../../components/AdminComponents/AdminMenus/AdminEditCategoryMenu/index.jsx";
import AdminEditProductMenu from "../../../components/AdminComponents/AdminMenus/AdminEditProductMenu/index.jsx";
import AdminEditCollectionMenu from "../../../components/AdminComponents/AdminMenus/AdminEditCollectionMenu/index.jsx";
import AdminOrderDetails from "../../../components/AdminComponents/AdminMenus/AdminOrderDetails/index.jsx";

function AdminHomePage() {
    const url = useLocation();
    const pathname = url.pathname;
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
                        ) : url.pathname === '/cp/order-details' ? (
                            <AdminOrderDetails/>
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
                        ) : /^\/cp\/edit-product\/\d+\/\d+$/.test(pathname) ? (
                            <AdminEditProductMenu/>
                        ) : url.pathname === '/cp/collections' ? (
                            <AdminCollectionsMenu/>
                        ) : url.pathname === '/cp/add-collection' ? (
                            <AdminAddCollectionMenu/>
                        ) : /^\/cp\/edit-collection\/\d+\/\d+$/.test(pathname) ? (
                            <AdminEditCollectionMenu/>
                        ) : url.pathname === '/cp/categories' ? (
                            <AdminCategoriesMenu/>
                        ) : url.pathname === '/cp/add-category' ? (
                            <AdminAddCategoryMenu/>
                        ) : /^\/cp\/edit-category\/\d+\/\d+$/.test(pathname) ? (
                            <AdminEditCategoryMenu/>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminHomePage;
