import './index.scss';
import AdminLeftMenu from "../../../components/AdminComponents/AdminLeftMenu/index.jsx";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import { useLocation } from "react-router";
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
            <AdminNavbar />
            <div className="wrapper">
                <AdminLeftMenu />
                <div className="adminWrapper">
                    {url.pathname === '/cp/home' && (
                        <div className="container1">
                            <AdminHomeMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/orders' && (
                        <div className="container1">
                            <AdminOrdersMenu />
                        </div>
                    )}
                    {/^\/cp\/order-details\/\d+\/\d+$/.test(pathname) && (
                        <div className="container1">
                            <AdminOrderDetails />
                        </div>
                    )}
                    {url.pathname === '/cp/products' && (
                        <div className="container1">
                            <AdminProductsMenu />
                        </div>
                    )}
                    {/^\/cp\/analytics\/\d+$/.test(pathname) && (
                        <div className="container3">
                            <AdminAnalyticsMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/customize-store' && (
                        <div className="container4">
                            <AdminCustomizeStoreMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/discounts' && (
                        <div className="container1">
                            <AdminDiscountsMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/settings' && (
                        <div className="container1">
                            <AdminSettingsMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/add-product' && (
                        <div className="container1">
                            <AdminAddProductMenu />
                        </div>
                    )}
                    {/^\/cp\/edit-product\/\d+\/\d+$/.test(pathname) && (
                        <div className="container1">
                            <AdminEditProductMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/collections' && (
                        <div className="container1">
                            <AdminCollectionsMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/add-collection' && (
                        <div className="container1">
                            <AdminAddCollectionMenu />
                        </div>
                    )}
                    {/^\/cp\/edit-collection\/\d+\/\d+$/.test(pathname) && (
                        <div className="container1">
                            <AdminEditCollectionMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/categories' && (
                        <div className="container1">
                            <AdminCategoriesMenu />
                        </div>
                    )}
                    {url.pathname === '/cp/add-category' && (
                        <div className="container1">
                            <AdminAddCategoryMenu />
                        </div>
                    )}
                    {/^\/cp\/edit-category\/\d+\/\d+$/.test(pathname) && (
                        <div className="container1">
                            <AdminEditCategoryMenu />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AdminHomePage;
