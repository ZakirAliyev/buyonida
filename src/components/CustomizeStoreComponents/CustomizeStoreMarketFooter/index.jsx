import { useTranslation } from "react-i18next";
import './index.scss';
import { useGetStoreWithSectionsQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { MARKET_LOGO } from "../../../../constants.js";
function CustomizeStoreMarketFooter({
  customLogo,
  customLogoWidth
}) {
  const {
    t
  } = useTranslation();
  const {
    data: getStoreWithSections
  } = useGetStoreWithSectionsQuery(Cookies.get('chooseMarket'));
  const store = getStoreWithSections?.data;
  return <section id={"customizeStoreMarketFooter"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <img style={{
            width: customLogoWidth ? `${customLogoWidth}px` : '150px'
          }} src={customLogo ? customLogo : MARKET_LOGO + store?.logoImageName} alt="Logo" />
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>{t("pages")}</h3>
                        <p>{t("collections")}</p>
                        <p>{t("categories")}</p>
                        <p>{t("about_us")}</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>{t("social_links")}</h3>
                        <p>{t("instagram")}</p>
                        <p>{t("facebook")}</p>
                        <p>{t("tiktok")}</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>{t("get_help")}</h3>
                        <p>{t("faq")}</p>
                        <p>{t("buyonida_support")}</p>
                        <p>{t("documentary")}</p>
                    </div>
                </div>
                <div className={"bottom"}>
                    <h4>{t("powered_by_buyonida")}</h4>
                </div>
            </div>
        </section>;
}
export default CustomizeStoreMarketFooter;