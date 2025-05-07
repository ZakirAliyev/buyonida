import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "/src/assets/failed.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function FailedComponent() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <section id="failedComponent">
            <Helmet>
                <title>{'Failed!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <img src={image1} alt={"Image"} />
            <h4>{t("payment_failed")}</h4>
            <p>{t("something_went_wrong_please_try_again_or_use_a_different_payment_method")}</p>
            <button onClick={() => navigate('/')}>{t("try_again")}</button>
        </section>;
}
export default FailedComponent;