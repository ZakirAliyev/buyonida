import { useTranslation } from "react-i18next";
import './index.scss';
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import TermsOfService from "../../../components/LegalComponents/TermsOfService/index.jsx";
import { Helmet } from "react-helmet-async";
function TermsOfServicePage() {
  const {
    t
  } = useTranslation();
  return <section id={"termsOfServicePage"}>
            <Helmet>
                <title>{'Terms Of Service Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar />
            <TermsOfService />
            <HomeFooter />
        </section>;
}
export default TermsOfServicePage;