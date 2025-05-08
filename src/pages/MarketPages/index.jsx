import {useTranslation} from "react-i18next";
import {Outlet, useParams} from "react-router-dom";
import MarketNavbar from "../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../components/MarketComponents/MarketFooter/index.jsx";
import {useGetStoreByNameQuery, useGetStoreWithSectionsQuery} from "../../service/userApi.js";
import {useLocation} from "react-router";
import {PulseLoader} from "react-spinners";
import logo from "/src/assets/qaraLogo.png";
import {Helmet} from "react-helmet-async";
import {MARKET_FAVICON} from "../../../constants.js";
import FacebookPixel from "../../components/FacebookPixelComponents/FacebookPixel/index.jsx";

const MarketLayout = () => {
    const {
        t
    } = useTranslation();
    const location = useLocation();
    const decodedPath = decodeURIComponent(location.pathname);
    const cleanedPath = decodedPath.startsWith('/@') ? decodedPath.split('/')[1].replace(/^@/, '') : decodedPath.split('/')[1] || '';
    const {
        data: getStoreByName,
        isLoading: isStoreLoading,
        error: storeError
    } = useGetStoreByNameQuery(cleanedPath);
    const store = getStoreByName?.data;
    const id = store?.id;
    const {
        data: getStoreWithSections,
        isLoading: isSectionsLoading,
        isError: isSectionsError
    } = useGetStoreWithSectionsQuery(id, {
        skip: !id
    });

    const font = getStoreWithSections?.data?.fontName;
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter(p => p.id === selectedPaletId);
    const screenWidth = window.innerWidth;
    let imgWidth, loaderSize;
    if (screenWidth < 400) {
        imgWidth = 200;
        loaderSize = 10;
    } else if (screenWidth < 576) {
        imgWidth = 250;
        loaderSize = 15;
    } else {
        imgWidth = 300;
        loaderSize = 20;
    }
    const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    if (isStoreLoading || isSectionsLoading) {
        return <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "20px"
        }}>
            <img src={logo} alt="logo" style={{
                width: `${imgWidth}px`
            }}/>
            <PulseLoader size={loaderSize}/>
        </div>;
    }
    if (storeError) {
        return <div>{t("error_loading_store")}{storeError.message}</div>;
    }
    if (isSectionsError) {
        return <div>{t("error_loading_store_sections_please_try_again_later")}</div>;
    }
    return <div style={{
        fontFamily: font || "inherit"
    }}>
        <Helmet>
            <title>{capitalize(store?.name) || 'Store'}</title>
            <link rel="icon" href={MARKET_FAVICON + store?.faviconName || '/src/assets/favicon-32x32.png'}/>
        </Helmet>
        <FacebookPixel pixelId={store?.facebookPixelId} />
        <MarketNavbar palet={palet}/>
        <Outlet/>
        <MarketFooter palet={palet} store={store}/>
    </div>;
};
export default MarketLayout;