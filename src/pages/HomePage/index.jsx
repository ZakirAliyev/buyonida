import './index.scss'
import HomeNavbar from "../../components/HomeSections/HomeNavbar/index.jsx";
import HomeBanner from "../../components/HomeSections/HomeBanner/index.jsx";
import HomeSectOne from "../../components/HomeSections/HomeSectOne/index.jsx";
import HomeMainSlogan from "../../components/HomeSections/HomeMainSlogan/index.jsx";
import HomeSectTwo from "../../components/HomeSections/HomeSectTwo/index.jsx";
import HomeSectThree from "../../components/HomeSections/HomeSectThree/index.jsx";
import HomeSectFour from "../../components/HomeSections/HomeSectFour/index.jsx";
import HomeFooter from "../../components/HomeSections/HomeFooter/index.jsx";
import {MARKET_FAVICON} from "../../../constants.js";
import {Helmet} from "react-helmet-async";

function HomePage() {
    return (
        <section id={"homePage"}>
            <Helmet>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar/>
            <HomeBanner/>
            <HomeSectOne/>
            <HomeMainSlogan/>
            {/*<HomeSectTwo/>*/}
            <HomeSectThree/>
            <HomeSectFour/>
            <HomeFooter/>
        </section>
    );
}

export default HomePage;