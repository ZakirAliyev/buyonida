import './index.scss'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import image1 from "/src/assets/bg.jpg";
import image2 from "/src/assets/sariLogo.png";
import {useGetAllStoresQuery} from "../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../constants.js";
import Cookies from "js-cookie";

function AdminChooseMarketPage() {

    const [chooseMarket, setChooseMarket] = useState(null);
    const navigate = useNavigate();

    const {data: getAllStores, refetch} = useGetAllStoresQuery();
    const stores = getAllStores?.data || [];

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <section id={"adminChooseMarketPage"}>
            <div className={"wrapper"}>
                <div className="img">
                    <img src={image2} alt="Logo"/>
                </div>
                <h2>Mağazanı seç</h2>
                <div className={"boxWrapper"}>
                    {stores.length > 0 ? (
                        stores.map((store) => (
                            <div
                                onClick={() => setChooseMarket(store?.id)}
                                key={store?.id}
                                className={`box ${chooseMarket === store?.id ? 'selected' : ''}`}
                            >
                                <img src={MARKET_LOGO + store?.logoImageName} alt=""/>
                                <div>
                                    <h3>{store.name}</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                    {stores.length < 3 && (
                        <div className={"newBox"} onClick={() => {
                            navigate('/create-market')
                        }}>
                            <p>+ Yeni mağaza yarat</p>
                        </div>
                    )}
                </div>
                <form>
                    {chooseMarket === null ? (
                        <button disabled>Daxil ol</button>
                    ) : (
                        <button onClick={() => {
                            navigate(`/cp`)
                            Cookies.set('chooseMarket', chooseMarket)
                        }}>Daxil ol</button>
                    )}
                </form>
                <div className="links">
                    <Link to="/public" className="link">Help</Link>
                    <Link to="/public" className="link">Privacy</Link>
                    <Link to="/public" className="link">Terms</Link>
                </div>
            </div>
        </section>
    );
}

export default AdminChooseMarketPage;
