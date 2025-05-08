import {useTranslation} from "react-i18next";
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
import MarketAboutPage from "../pages/MarketPages/MarketAboutPage/index.jsx";
import MarketCategoryPage from "../pages/MarketPages/MarketCategoryPage/index.jsx";
import MarketCollectionPage from "../pages/MarketPages/MarketCollectionPage/index.jsx";
import MarketProductDetailsPage from "../pages/MarketPages/MarketProductDetailsPage/index.jsx";
import MarketCheckoutPage from "../pages/MarketPages/MarketCheckoutPage/index.jsx";
import CustomizeStorePages from "../pages/CustomizeStorePages/index.jsx";
import MarketLayout from "../pages/MarketPages/index.jsx";
import SuccessComponent from "../components/PaymentComponents/SuccessComponent/index.jsx";
import FailedComponent from "../components/PaymentComponents/FailedComponent/index.jsx";
import TermsOfServicePage from "../pages/LegalPages/TermsOfServicePage/index.jsx";
import PrivacyPolicyPage from "../pages/LegalPages/PrivacyPolicyPage/index.jsx";
import AboutPage from "../pages/LegalPages/AboutPage/index.jsx";
import ContactPage from "../pages/LegalPages/ContactPage/index.jsx";
import BlogPage from "../pages/LegalPages/BlogPage/index.jsx";
import BlogDetailsPage from "../pages/LegalPages/BlogDetailsPage/index.jsx";
import VideoPage from "../pages/LegalPages/VideoPage/index.jsx";

export const ROUTES = [{
    path: "/",
    element: <AdminMain/>,
    children: [{
        index: true,
        element: <HomePage/>
    }, {
        path: "login",
        element: <AdminLoginPage/>
    }, {
        path: "register",
        element: <AdminRegisterPage/>
    }, {
        path: "reg-via-email",
        element: <AdminRegisterViaEmailPage/>
    }, {
        path: "email-verification",
        element: <AdminEmailVerificationPage/>
    }, {
        path: "login-verification",
        element: <AdminLoginVerificationPage/>
    }, {
        path: "forgot-pass",
        element: <AdminForgotPassPage/>
    }, {
        path: "re-enter-pass",
        element: <AdminReEnterPassPage/>
    }, {
        path: "choose-market",
        element: <AdminChooseMarketPage/>
    }, {
        path: "create-market",
        element: <AdminCreateMaketPage/>
    }, {
        path: "create-market-finish",
        element: <AdminCreateMaketFinishPage/>
    }, {
        path: "card-success",
        element: <SuccessComponent/>
    }, {
        path: "card-failed",
        element: <FailedComponent/>
    }, {
        path: "success",
        element: <SuccessComponent/>
    }, {
        path: "failed",
        element: <FailedComponent/>
    }, {
        path: "success-page",
        element: <AdminSuccessPage/>
    }, {
        path: "cp",
        children: [{
            index: true,
            element: <Navigate to="/cp/home" replace/>
        }, {
            path: "home",
            element: <AdminHomePage/>
        }, {
            path: "general",
            element: <AdminHomePage/>
        }, {
            path: "balance-payout",
            element: <AdminHomePage/>
        }, {
            path: "payments",
            element: <AdminHomePage/>
        }, {
            path: "shipping-and-delivery",
            element: <AdminHomePage/>
        }, {
            path: "policies",
            element: <AdminHomePage/>
        }, {
            path: "analytics-integration",
            element: <AdminHomePage/>
        }, {
            path: "orders",
            element: <AdminHomePage/>
        }, {
            path: "abandoned-checkouts",
            element: <AdminHomePage/>
        }, {
            path: "order-details/:marketId/:orderId",
            element: <AdminHomePage/>
        }, {
            path: "products",
            element: <AdminHomePage/>
        }, {
            path: "customers",
            element: <AdminHomePage/>
        }, {
            path: "content",
            element: <AdminHomePage/>
        }, {
            path: "analytics/:marketId",
            element: <AdminHomePage/>
        }, {
            path: "customize-store",
            element: <AdminHomePage/>
        }, {
            path: "discounts",
            element: <AdminHomePage/>
        }, {
            path: "collections",
            element: <AdminHomePage/>
        }, {
            path: "add-collection",
            element: <AdminHomePage/>
        }, {
            path: "edit-collection/:marketId/:id",
            element: <AdminHomePage/>
        }, {
            path: "categories",
            element: <AdminHomePage/>
        }, {
            path: "add-category",
            element: <AdminHomePage/>
        }, {
            path: "edit-category/:marketId/:id",
            element: <AdminHomePage/>
        }, {
            path: "add-product",
            element: <AdminHomePage/>
        }, {
            path: "edit-product/:marketId/:id",
            element: <AdminHomePage/>
        }, {
            path: "manage-account",
            element: <AdminManageAccount/>
        }, {
            path: "settings",
            element: <Navigate to="/cp/general" replace/>
        }]
    }, {
        path: ":marketName",
        element: <MarketLayout/>,
        children: [{
            index: true,
            element: <MarketHomePage/>
        }, {
            path: "category/:id",
            element: <MarketCategoryPage/>
        }, {
            path: "collection/:id",
            element: <MarketCollectionPage/>
        }, {
            path: "product/:id",
            element: <MarketProductDetailsPage/>
        }, {
            path: "about",
            element: <MarketAboutPage/>
        }, {
            path: "checkout/:id",
            element: <MarketCheckoutPage/>
        }]
    }, {
        path: "privacy",
        element: <PrivacyPolicyPage/>
    }, {
        path: "terms",
        element: <TermsOfServicePage/>
    }, {
        path: "about",
        element: <AboutPage/>
    }, {
        path: "contact",
        element: <ContactPage/>
    }, {
        path: "blogs",
        element: <BlogPage/>
    }, {
        path: "blogs/:id",
        element: <BlogDetailsPage/>
    }, {
        path: "tutorials",
        element: <VideoPage/>
    }, {
        path: "customize-store-page",
        element: <CustomizeStorePages/>
    }, {
        path: "*",
        element: <NotFoundPage/>
    }]
}];