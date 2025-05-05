import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import About from "../../../components/LegalComponents/About/index.jsx";
import {Helmet} from "react-helmet-async";

function AboutPage() {
    return (
        <section id={"aboutPage"}>
            <Helmet>
                <title>{'About Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar/>
            <About/>
            <HomeFooter/>
        </section>
    );
}

export default AboutPage;