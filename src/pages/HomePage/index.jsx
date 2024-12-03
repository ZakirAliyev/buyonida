import './index.scss'
import HomeNavbar from "../../components/HomeSections/HomeNavbar/index.jsx";
import HomeBanner from "../../components/HomeSections/HomeBanner/index.jsx";
import HomeSectOne from "../../components/HomeSections/HomeSectOne/index.jsx";
import HomeMainSlogan from "../../components/HomeSections/HomeMainSlogan/index.jsx";
import HomeSectTwo from "../../components/HomeSections/HomeSectTwo/index.jsx";
import HomeSectThree from "../../components/HomeSections/HomeSectThree/index.jsx";
import HomeSectFour from "../../components/HomeSections/HomeSectFour/index.jsx";
import HomeFooter from "../../components/HomeSections/HomeFooter/index.jsx";

function HomePage() {
    return (
        <section id={"homePage"}>
            <HomeNavbar/>
            <HomeBanner/>
            <HomeSectOne/>
            <HomeMainSlogan/>
            <HomeSectTwo/>
            <HomeSectThree/>
            <HomeSectFour/>
            <HomeFooter/>
        </section>
    );
}

export default HomePage;