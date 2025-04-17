import './index.scss';
import { useParams } from "react-router-dom";
import { useGetStoreByNameQuery } from "../../../service/userApi.js";
import { MARKET_LOGO } from "../../../../constants.js";

function MarketAboutPage() {
    const params = useParams();
    const marketName = params.marketName.substring(1, params.marketName.length);

    const { data: getStoreByName } = useGetStoreByNameQuery(marketName);
    const store = getStoreByName?.data;

    return (
        <section id="marketAboutPage">
            <div className="section123">
                <div className="container">
                    <div className="titleWrapper">
                        <div className="imageWrapper">
                            <img src={MARKET_LOGO + store?.logoImageName} alt="Store Logo" />
                        </div>
                        <div className="textWrapper">
                            <h2>{store?.name}</h2>
                            <h3>{store?.description}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MarketAboutPage;