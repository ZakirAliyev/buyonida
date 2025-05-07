import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "../../../assets/sariLogo.png";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
function AdminSuccessPage() {
  const {
    t
  } = useTranslation();
  return <section id={"adminSuccessPage"}>
            <Helmet>
                <title>{'Success!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"} />
                </div>
                <div className={"title"}>
                    <h2>{t("success")}</h2>
                    <h3>{t("your_password_reseted_succesfully")}</h3>
                </div>
                <div className={"links"}>
                    <Link to={'/help'} className={"link"}>{t("help")}</Link>
                    <Link to={'/privacy'} className={"link"}>{t("privacy")}</Link>
                    <Link to={'/terms'} className={"link"}>{t("terms")}</Link>
                </div>
            </div>
        </section>;
}
export default AdminSuccessPage;