import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Contact from "../../../components/LegalComponents/Contact/index.jsx";
import {Helmet} from "react-helmet-async";

function ContactPage() {
    return (
        <section id={"contactPage"}>
            <Helmet>
                <title>{'Contact Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar/>
            <Contact/>
            <HomeFooter/>
        </section>
    );
}

export default ContactPage;