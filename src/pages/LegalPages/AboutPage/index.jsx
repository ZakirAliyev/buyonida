import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import About from "../../../components/LegalComponents/About/index.jsx";

function AboutPage() {
    return (
        <section id={"aboutPage"}>
            <HomeNavbar/>
            <About/>
            <HomeFooter/>
        </section>
    );
}

export default AboutPage;