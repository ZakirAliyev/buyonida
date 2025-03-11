import './index.scss'
import image1 from '/src/assets/theme.png'
import image2 from '/src/assets/theme1.png'
import HomeNavbar from "../../../HomeSections/HomeNavbar/index.jsx";
import HomeBanner from "../../../HomeSections/HomeBanner/index.jsx";
import HomeSectOne from "../../../HomeSections/HomeSectOne/index.jsx";
import HomeSectTwo from "../../../HomeSections/HomeSectTwo/index.jsx";
import HomeSectThree from "../../../HomeSections/HomeSectThree/index.jsx";
import HomeSectFour from "../../../HomeSections/HomeSectFour/index.jsx";
import HomeMainSlogan from "../../../HomeSections/HomeMainSlogan/index.jsx";
import HomeFooter from "../../../HomeSections/HomeFooter/index.jsx";
import MarketNavbar from "../../../MarketComponents/MarketNavbar/index.jsx";
import MarketHomePage from "../../../../pages/MarketPages/MarketHomePage/index.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AdminCustomizeStoreMenu() {
    const navigate = useNavigate();

    return (
        <section id={"adminCustomizeStoreMenu"}>
            <h2>Themes</h2>
            <div className={"wrapper"}>
                <div className={"imageWrapper"}>
                    <div className={"box"}>
                        <img src={image1} alt={"background"}/>
                    </div>
                    <div className={"box1"}>
                        <img src={image2} alt={"background"}/>
                    </div>
                </div>
                <div className={"line"}></div>
                <div className={"bottom1"}>
                    <div className={"first"}>
                        <img src={image1} alt={"Image"}/>
                        <div className={"textWrapper"}>
                            <span className={"span"}>Current theme</span>
                            <span>Premio</span>
                        </div>
                    </div>
                    <button onClick={()=> {
                        navigate('/customize-store-page')
                    }}>Customize</button>
                </div>
            </div>
            <div className={"wrapper wrapper1"}>
                <h2>Theme library</h2>
                <input placeholder={"New themes are coming soon..."}/>
            </div>
        </section>
    );
}

export default AdminCustomizeStoreMenu;