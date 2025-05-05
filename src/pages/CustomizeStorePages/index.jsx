import CustomizeStorePageNavbar from "../../components/CustomizeStoreComponents/CustomizeStorePageNavbar/index.jsx";
import CustomizeStoreScreens from "../../components/CustomizeStoreComponents/CustomizeStoreScreens/index.jsx";
import Cookies from "js-cookie";
import {useGetStoreWithSectionsQuery} from "../../service/userApi.js";
import logo from "/src/assets/qaraLogo.png"
import {PulseLoader} from "react-spinners";
import {Helmet} from "react-helmet-async";
function CustomizeStorePages() {
    const { data: storeData, refetch, isLoading } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));

    if (isLoading) {
        return <div className={"screenAll"}>
            <img src={logo} alt={"logo"}/>
            <PulseLoader size={20}/>
        </div>;
    }

    return (
        <section
            id={"customizeStorePages"}
            style={{
                fontFamily: "'Space Grotesk', sans-serif",
            }}
        >
            <Helmet>
                <title>{'Customize Store Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <CustomizeStorePageNavbar />
            <CustomizeStoreScreens storeData={storeData} refetch={refetch} />
        </section>
    );
}

export default CustomizeStorePages;