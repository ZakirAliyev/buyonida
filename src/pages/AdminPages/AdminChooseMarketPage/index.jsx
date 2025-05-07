import { useTranslation } from "react-i18next";
import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import image1 from "/src/assets/bg.jpg";
import image2 from "/src/assets/sariLogo.png";
import { useGetAllStoresQuery } from "../../../service/userApi.js";
import { MARKET_LOGO } from "../../../../constants.js";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";
function AdminChooseMarketPage() {
  const {
    t
  } = useTranslation();
  const [chooseMarket, setChooseMarket] = useState(null);
  const [chooseMarketName, setChooseMarketName] = useState(null);
  const navigate = useNavigate();
  const {
    data: getAllStores,
    refetch
  } = useGetAllStoresQuery();
  const stores = getAllStores?.data || [];
  useEffect(() => {
    refetch();
  }, [refetch]);
  return <section id={"adminChooseMarketPage"}>
            <Helmet>
                <title>{'Choose Market Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className={"wrapper"}>
                <div className="img">
                    <img src={image2} alt="Logo" />
                </div>
                <h2>{t("ma_azan_se")}</h2>
                <div className={"boxWrapper"}>
                    {stores.length > 0 ? stores.map(store => <div onClick={() => {
          setChooseMarket(store?.id);
          setChooseMarketName(store?.name);
        }} key={store?.id} className={`box ${chooseMarket === store?.id ? 'selected' : ''}`}>
                                <img src={MARKET_LOGO + store?.logoImageName} alt="" />
                                <div>
                                    <h3>{store.name}</h3>
                                </div>
                            </div>) : <></>}
                    {stores.length < 10 && <div className={"newBox"} onClick={() => {
          navigate('/create-market');
        }}>
                            <p>{t("yeni_ma_aza_yarat")}</p>
                        </div>}
                </div>
                <form>
                    {chooseMarket === null ? <button disabled>{t("daxil_ol")}</button> : <button onClick={() => {
          navigate(`/cp`);
          Cookies.set('chooseMarket', chooseMarket);
          Cookies.set('chooseMarketName', chooseMarketName);
        }}>{t("daxil_ol")}</button>}
                </form>
                <div className="links">
                    <Link to={'/help'} className={"link"}>{t("help")}</Link>
                    <Link to={'/privacy'} className={"link"}>{t("privacy")}</Link>
                    <Link to={'/terms'} className={"link"}>{t("terms")}</Link>
                </div>
            </div>
        </section>;
}
export default AdminChooseMarketPage;