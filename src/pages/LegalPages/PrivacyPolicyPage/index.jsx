import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import PrivacyPolicy from "../../../components/LegalComponents/PrivacyPolicy/index.jsx";

function PrivacyPolicyPage() {
    return (
        <section id={"privacyPolicyPage"}>
            <HomeNavbar/>
            <PrivacyPolicy/>
            <HomeFooter/>
        </section>
    );
}

export default PrivacyPolicyPage;