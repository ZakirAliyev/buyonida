import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Contact from "../../../components/LegalComponents/Contact/index.jsx";

function ContactPage() {
    return (
        <section id={"aboutPage"}>
            <HomeNavbar/>
            <Contact/>
            <HomeFooter/>
        </section>
    );
}

export default ContactPage;