import { Outlet } from "react-router-dom";
import MarketNavbar from "../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../components/MarketComponents/MarketFooter/index.jsx";
import { useGetStoreByNameQuery, useGetStoreWithSectionsQuery } from "../../service/userApi.js";
import { useLocation } from "react-router";
import {PulseLoader} from "react-spinners";
import logo from "/src/assets/qaraLogo.png"

const MarketLayout = () => {
    const location = useLocation();

    // Decode the pathname to handle URL-encoded characters (e.g., %20 -> space)
    const decodedPath = decodeURIComponent(location.pathname);

    // Extract the store name: take the part after '@' and before the next '/'
    const cleanedPath = decodedPath.startsWith('/@')
        ? decodedPath.split('/')[1].replace(/^@/, '') // Take the second segment (after "/@") and remove "@"
        : decodedPath.split('/')[1] || ''; // Fallback if no "@" (take second segment if available)


    // Fetch store data by cleaned store name
    const { data: getStoreByName, isLoading: isStoreLoading, error: storeError } = useGetStoreByNameQuery(cleanedPath);
    const store = getStoreByName?.data;

    const id = store?.id;

    // Fetch store sections and other data using the store ID
    const { data: getStoreWithSections, isLoading: isSectionsLoading, isError: isSectionsError } = useGetStoreWithSectionsQuery(id, {
        skip: !id, // Skip this query until id is available
    });

    const font = getStoreWithSections?.data?.fontName;
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);


    // Handle loading states for both queries
    if (isStoreLoading || isSectionsLoading) {
        return <div className={"screenAll"}>
            <img src={logo} alt={"logo"}/>
            <PulseLoader size={20}/>
        </div>;
    }

    // Handle error states for both queries
    if (storeError) {
        return <div>Error loading store: {storeError.message}</div>;
    }

    if (isSectionsError) {
        return <div>Error loading store sections. Please try again later.</div>;
    }

    return (
        <div style={{ fontFamily: font || 'inherit' }}>
            <MarketNavbar palet={palet} />
            <Outlet />
            <MarketFooter palet={palet}  store={store}/>
        </div>
    );
};

export default MarketLayout;