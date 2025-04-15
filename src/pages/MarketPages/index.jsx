import { Outlet } from "react-router-dom";
import MarketNavbar from "../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../components/MarketComponents/MarketFooter/index.jsx";
import Cookies from "js-cookie";
import {useGetStoreByNameQuery, useGetStoreWithSectionsQuery} from "../../service/userApi.js";
import {useLocation} from "react-router";

const MarketLayout = () => {
    const location = useLocation();
    const cleanedPath = location.pathname
        .replace(/\//g, '')
        .replace(/%20/g, ' ')
        .replace(/@/, '');
    const { data: getStoreByName } = useGetStoreByNameQuery(cleanedPath);
    const store = getStoreByName?.data;
    console.log(store);
    const id = store?.id;
    const { data: getStoreWithSections, isLoading, isError } = useGetStoreWithSectionsQuery(id);

    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading store data. Please try again later.</div>;
    }

    return (
        <>
            <MarketNavbar palet={palet} />
            <Outlet />
            <MarketFooter palet={palet} />
        </>
    );
};

export default MarketLayout;