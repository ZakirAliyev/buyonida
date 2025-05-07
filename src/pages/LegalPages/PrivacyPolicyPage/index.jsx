import { useTranslation } from "react-i18next";
import './index.scss';
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import PrivacyPolicy from "../../../components/LegalComponents/PrivacyPolicy/index.jsx";
import { Helmet } from "react-helmet-async";
function PrivacyPolicyPage() {
  const {
    t
  } = useTranslation();
  return <section id={"privacyPolicyPage"}>
            <Helmet>
                <title>{'Privacy Policy Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar />
            <PrivacyPolicy />
            <HomeFooter />
        </section>;
}
export default PrivacyPolicyPage;