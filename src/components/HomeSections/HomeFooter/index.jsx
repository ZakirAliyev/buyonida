import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "/src/assets/sariLogo.png";
import { useNavigate } from "react-router-dom";
function HomeFooter() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <section id={'homeFooter'}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-12"}>
                        <img style={{
            width: "200px"
          }} src={image1} alt={"Logo"} />
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-12"}>
                        <h3>{t("product")}</h3>
                        <h4>{t("about_us")}</h4>
                        <h4>{t("contact")}</h4>
                        <h4>{t("blogs")}</h4>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>
                        <h3>{t("featured_posts")}</h3>
                        <h4>{t("what_is_e_commerce")}</h4>
                        <h4>{t("trending_products_to_sell_online")}</h4>
                        <h4>{t("business_ideas")}</h4>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>
                        <h3>{t("product")}</h3>
                        <h4>{t("features")}</h4>
                        <h4>{t("e_commerce_plans")}</h4>
                        <h4>{t("testimonials")}</h4>
                    </div>
                </div>
                <div className={"row"} style={{
        color: 'white',
        margin: '10px 0 30px'
      }}>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={() => {
          navigate('/privacy');
        }}>{t("privacy_policy")}</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={() => {
          navigate('/terms');
        }}>{t("terms_of_services")}</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={() => {
          navigate('/about');
        }}>{t("about_us")}</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={() => {
          navigate('/contact');
        }}>{t("contact_us")}</div>
                </div>
                <div style={{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        marginTop: '10px'
      }}>{t("2024_2025_buyonida_inc_all_rights_reserved")}</div>
            </div>
        </section>;
}
export default HomeFooter;