import { useTranslation } from "react-i18next";
import './index.scss';
import kapital from "../../../../assets/kapital.png";
function AdminPaymentsMenu() {
  const {
    t
  } = useTranslation();
  return <section id={"adminPaymentsMenu"}>
            <h2>{t("payments")}</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>{t("payment_providers")}</div>
                <div className={"boz"}>{t("providers_that_enable_you_to_accept_payment_methods_at_a_rate_set_by_the_third_party_an_additional_fee_will_apply_to_new_orders_once_you_select_a_plan")}</div>
                <div className={"kapu"}>
                    <img src={kapital} alt={"Image"} />
                    <div style={{
          color: '#706c6c',
          fontWeight: '500'
        }}>{t("1_5_min_3_50_azn_usd_eur")}</div>
                </div>
            </div>
        </section>;
}
export default AdminPaymentsMenu;