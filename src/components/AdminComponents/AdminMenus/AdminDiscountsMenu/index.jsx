import { useTranslation } from "react-i18next";
import './index.scss';
function AdminDiscountsMenu() {
  const {
    t
  } = useTranslation();
  return <section id={"adminDiscountsMenu"}>
            <h1>{t("discounts")}</h1>
            <p>{t("here_s_a_guide_to_get_started_as_your_business_grows_you_ll_get_fresh_tips_and_insights_here")}</p>
        </section>;
}
export default AdminDiscountsMenu;