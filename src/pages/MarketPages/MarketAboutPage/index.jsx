import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import image1 from "/src/assets/mohtesem.jpg"
import {useParams} from "react-router-dom";
import {useGetStoreByNameQuery} from "../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../constants.js";

function MarketAboutPage() {

    const params = useParams();
    const marketName = params.marketName.substring(1, params.marketName.length);

    const {data: getStoreByName} = useGetStoreByNameQuery(marketName)
    const store = getStoreByName?.data
    return (
        <section id={"marketAboutPage"}>
            <MarketNavbar/>
            <div className={"section123"}>
                <div className={"container"}>
                    <div className={"titleWrapper"}>
                        <img src={MARKET_LOGO + store?.logoImageName} alt={"Image"}/>
                        <div className={"textWrapper"}>
                            <h2>{store?.name}</h2>
                            <h3>{store?.description}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketAboutPage;