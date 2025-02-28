import {Navigate} from "react-router-dom";
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
import MarketCollectionPage from "../pages/MarketPages/MarketCollectionPage/index.jsx";
import MarketAboutPage from "../pages/MarketPages/MarketAboutPage/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <AdminMain/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
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
            {
                path: 'cp',
                element: <Navigate to="/cp/home" replace/>
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
                path: 'cp/order-details',
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
                path: 'cp/analytics',
                element: <AdminHomePage/>
            },
            {
                path: 'cp/settings',
                element: <AdminHomePage/>
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
            {
                path: '/:marketName',
                element: <MarketHomePage/>
            },
            {
                path: '/:marketName/collection/:id',
                element: <MarketCollectionPage/>
            },
            {
                path: '/:marketName/about',
                element: <MarketAboutPage/>
            },
            {
                path: '*',
                element: <NotFoundPage/>
            },
        ]
    }
];
