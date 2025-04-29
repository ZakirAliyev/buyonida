import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import TermsOfService from "../../../components/LegalComponents/TermsOfService/index.jsx";

function TermsOfServicePage() {
    return (
        <section id={"termsOfServicePage"}>
            <HomeNavbar/>
            <TermsOfService/>
            <HomeFooter/>
        </section>
    );
}

export default TermsOfServicePage;