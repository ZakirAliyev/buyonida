import { Navigate } from "react-router-dom";
import AdminMain from "../pages/AdminPages/index.jsx";
import HomePage from "../pages/HomePage/index.jsx";
import AdminLoginPage from "../pages/AdminPages/AdminLoginPage/index.jsx";
import NotFoundPage from "../pages/NotFoundPage/index.jsx";
import AdminRegisterPage from "../pages/AdminPages/AdminRegisterPage/index.jsx";
import AdminRegisterViaEmailPage from "../pages/AdminPages/AdminRegisterViaEmailPage/index.jsx";
import AdminHomePage from "../pages/AdminPages/AdminHomePage/index.jsx";
import AdminEmailVerificationPage from "../pages/AdminPages/AdminEmailVerificationPage/index.jsx";
import AdminLoginVerificationPage from "../pages/AdminPages/AdminLoginVerificationPage/index.jsx";
import AdminChooseMarketPage from "../pages/AdminPages/AdminChooseMarketPage/index.jsx";
import AdminManageAccount from "../pages/AdminPages/AdminManageAccount/index.jsx";
import AdminForgotPassPage from "../pages/AdminPages/AdminForgotPassPage/index.jsx";
import AdminReEnterPassPage from "../pages/AdminPages/AdminReEnterPassPage/index.jsx";
import AdminSuccessPage from "../pages/AdminPages/AdminSuccessPage/index.jsx";
import AdminCreateMaketPage from "../pages/AdminPages/AdminCreateMaketPage/index.jsx";
import AdminCreateMaketFinishPage from "../pages/AdminPages/AdminCreateMaketFinishPage/index.jsx";
import MarketHomePage from "../pages/MarketPages/MarketHomePage/index.jsx";
import MarketAboutPage from "../pages/MarketPages/MarketAboutPage/index.jsx";
import MarketCategoryPage from "../pages/MarketPages/MarketCategoryPage/index.jsx";
import MarketCollectionPage from "../pages/MarketPages/MarketCollectionPage/index.jsx";
import MarketProductDetailsPage from "../pages/MarketPages/MarketProductDetailsPage/index.jsx";
import MarketCheckoutPage from "../pages/MarketPages/MarketCheckoutPage/index.jsx";
import CustomizeStorePages from "../pages/CustomizeStorePages/index.jsx";
import MarketLayout from "../pages/MarketPages/index.jsx";
import AdminGeneralMenu from "../components/AdminComponents/AdminMenus/AdminGeneralMenu/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <AdminMain/>,
        children: [
            // Index route
            {
                index: true,
                element: <HomePage/>
            },
            // Authentication and account-related routes
            {
                path: 'login',
                element: <AdminLoginPage/>
            },
            {
                path: 'register',
                element: <AdminRegisterPage/>
            },
            {
                path: 'reg-via-email',
                element: <AdminRegisterViaEmailPage/>
            },
            {
                path: 'email-verification',
                element: <AdminEmailVerificationPage/>
            },
            {
                path: 'login-verification',
                element: <AdminLoginVerificationPage/>
            },
            {
                path: 'choose-market',
                element: <AdminChooseMarketPage/>
            },
            {
                path: 'forgot-pass',
                element: <AdminForgotPassPage/>
            },
            {
                path: 're-enter-pass',
                element: <AdminReEnterPassPage/>
            },
            {
                path: 'success-page',
                element: <AdminSuccessPage/>
            },
            {
                path: 'create-market',
                element: <AdminCreateMaketPage/>
            },
            {
                path: 'create-market-finish',
                element: <AdminCreateMaketFinishPage/>
            },
            // Admin control panel routes
            {
                path: 'cp',
                element: <Navigate to="/cp/home" replace/>
            },
            {
                path: 'cp/general',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/balance-payout',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/payments',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/shipping-and-delivery',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/policies',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/home',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/orders',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/order-details/:marketId/:orderId',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/products',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/customers',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/content',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/analytics/:marketId',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/settings',
                element: <Navigate to="/cp/general" replace/>
            },
            {
                path: 'cp/customize-store',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/discounts',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/collections',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/add-collection',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/edit-collection/:marketId/:id',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/categories',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/add-category',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/edit-category/:marketId/:id',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/manage-account',
                element: <AdminManageAccount/>
            },
            {
                path: 'cp/add-product',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/edit-product/:marketId/:id',
                element: <AdminHomePage/>
            },
            // Nested market routes
            {
                path: ':marketName',
                element: <MarketLayout/>,
                children: [
                    {
                        index: true,
                        element: <MarketHomePage/>
                    },
                    {
                        path: 'category/:id',
                        element: <MarketCategoryPage/>
                    },
                    {
                        path: 'collection/:id',
                        element: <MarketCollectionPage/>
                    },
                    {
                        path: 'product/:id',
                        element: <MarketProductDetailsPage/>
                    },
                    {
                        path: 'about',
                        element: <MarketAboutPage/>
                    }
                ]
            },
            // Other standalone routes
            {
                path: 'checkout/:marketId',
                element: <MarketCheckoutPage/>
            },
            {
                path: 'customize-store-page',
                element: <CustomizeStorePages/>
            },
            // Catch-all route
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    }
];