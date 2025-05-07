import { useTranslation } from "react-i18next";
import './index.scss';
import { IoMdSettings } from "react-icons/io";
import { FaStoreAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { useState, useEffect } from "react";
import image1 from "/src/assets/art1.png";
import image2 from "/src/assets/art2.png";
import image3 from "/src/assets/art3.png";
import { useGetAllProductsByMarketIdQuery, useGetStoreByIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function AdminHomeMenu() {
  const {
    t
  } = useTranslation();
  const {
    data: getStoreById
  } = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
  const store = getStoreById?.data;
  const {
    data: getAllProductsByMarketId
  } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
  const products = getAllProductsByMarketId?.data;
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  useEffect(() => {
    if (store) {
      setStoreName(store.name || "");
      setStoreDescription(store.description || "");
    }
  }, [store]);
  const navigate = useNavigate();
  return <section id="adminHomeMenu">
            <h1>{t("let_s_start_to_setup")}</h1>

            {/*<div className="wrapper">*/}
            {/*    <div>*/}
            {/*        <div className="storeLogo">Store Logo</div>*/}
            {/*        <img src={MARKET_LOGO + store?.logoImageName} alt="Image"/>*/}
            {/*    </div>*/}
            {/*    <div className="inputWrapper">*/}
            {/*        <div className="storeNameWrapper">*/}
            {/*            <input*/}
            {/*                value={storeName}*/}
            {/*                onChange={(e) => setStoreName(e.target.value)}*/}
            {/*            />*/}
            {/*            <div className="storeName">Store name</div>*/}
            {/*        </div>*/}
            {/*        <div className="storeNameWrapper1">*/}
            {/*            <div className="storeName1">Store description</div>*/}
            {/*            <textarea*/}
            {/*                rows={3}*/}
            {/*                value={storeDescription}*/}
            {/*                onChange={(e) => setStoreDescription(e.target.value)}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="wrapper wrapper1">
                <div className="textWrapper1">
                    <div className="blackDot"></div>
                    <span>{t("add_your")}{products && products.length === 0 ? <></> : <>{t("first")}</>}
                        {products && products.length === 0 ? <>{t("products")}</> : <>{t("product")}</>}
                        </span>
                </div>
                <div className="rightBar" onClick={() => {
        navigate('/cp/products');
      }}><AiFillProduct />{t("product")}</div>
            </div>
            <div className="wrapper wrapper1">
                <div className="textWrapper1">
                    <div className="blackDot"></div>
                    <span>{t("customize_your_store")}</span>
                </div>
                <div className="rightBar" onClick={() => {
        navigate('/cp/customize-store');
      }}><FaStoreAlt />{t("customize_store")}</div>
            </div>
            <div className="wrapper wrapper1">
                <div className="textWrapper1">
                    <div className="blackDot"></div>
                    <span>{t("add_your_bank_details_and_personal_information")}</span>
                </div>
                <div className="rightBar" onClick={() => {
        navigate('/cp/settings');
      }}><IoMdSettings />{t("settings")}</div>
            </div>
            <div className="row">
                <div className="col-4">
                    <img src={image1} alt="Image" />
                    <p>{t("how_to_customize_your_store_in_10_steps")}</p>
                    <p className="p">{t("in_this_tutorial_you_can_customize_your_store_in_an_easy_way")}</p>
                </div>
                <div className="col-4">
                    <img src={image2} alt="Image" />
                    <p>{t("how_to_customize_your_store_in_10_steps")}</p>
                    <p className="p">{t("in_this_tutorial_you_can_customize_your_store_in_an_easy_way")}</p>
                </div>
                <div className="col-4">
                    <img src={image3} alt="Image" />
                    <p>{t("how_to_customize_your_store_in_10_steps")}</p>
                    <p className="p">{t("in_this_tutorial_you_can_customize_your_store_in_an_easy_way")}</p>
                </div>
                <button>{t("find_more")}</button>
            </div>
        </section>;
}
export default AdminHomeMenu;