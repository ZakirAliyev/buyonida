import { Outlet } from "react-router-dom";
import MarketNavbar from "../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../components/MarketComponents/MarketFooter/index.jsx";
import Cookies from "js-cookie";
import { useGetStoreWithSectionsQuery } from "../../service/userApi.js";

const MarketLayout = () => {
    const id = Cookies.get('chooseMarket');
    const { data: getStoreWithSections, isLoading, isError } = useGetStoreWithSectionsQuery(id);

    // Safely access data
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
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