import './index.scss'
import {IoMdSettings} from "react-icons/io";
import {FaStoreAlt} from "react-icons/fa";
import {AiFillProduct} from "react-icons/ai";
import {useState, useEffect} from "react";
import image1 from "/src/assets/bg.jpg";
import image2 from "/src/assets/miniPhoto.png";
import {useGetAllProductsByMarketIdQuery, useGetStoreByIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {BASE_URL, MARKET_LOGO} from "../../../../../constants.js";
import {Link, useNavigate} from "react-router-dom";

function AdminHomeMenu() {
    const {data: getStoreById} = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
    const store = getStoreById?.data;

    const {data: getAllProductsByMarketId} = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
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

    return (
        <section id="adminHomeMenu">
            <h1>Let's start to setup!</h1>

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
                    <span>Add your {products && products.length === 0 ? (
                        <></>
                    ) : (
                        <>first </>
                    )}
                        {products && products.length === 0 ? (
                            <>products</>
                        ) : (
                            <>product</>
                        )}
                        </span>
                </div>
                <div className="rightBar" onClick={() => {
                    navigate('/cp/products')
                }}><AiFillProduct/>Product
                </div>
            </div>
            <div className="wrapper wrapper1">
                <div className="textWrapper1">
                    <div className="blackDot"></div>
                    <span>Customize your store</span>
                </div>
                <div className="rightBar" onClick={() => {
                    navigate('/cp/customize-store')
                }}><FaStoreAlt/>Customize Store
                </div>
            </div>
            <div className="wrapper wrapper1">
                <div className="textWrapper1">
                    <div className="blackDot"></div>
                    <span>Add your bank details and personal information</span>
                </div>
                <div className="rightBar" onClick={() => {
                    navigate('/cp/settings')
                }}><IoMdSettings/>Settings
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <img src={image2} alt="Image"/>
                    <p>How to customize your store in 10 steps</p>
                    <p className="p">In this tutorial you can customize your store in an easy way.</p>
                </div>
                <div className="col-4">
                    <img src={image2} alt="Image"/>
                    <p>How to customize your store in 10 steps</p>
                    <p className="p">In this tutorial you can customize your store in an easy way.</p>
                </div>
                <div className="col-4">
                    <img src={image2} alt="Image"/>
                    <p>How to customize your store in 10 steps</p>
                    <p className="p">In this tutorial you can customize your store in an easy way.</p>
                </div>
                <button>Find more...</button>
            </div>
        </section>
    );
}

export default AdminHomeMenu;
