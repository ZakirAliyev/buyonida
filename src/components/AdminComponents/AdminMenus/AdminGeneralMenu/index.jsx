import { useTranslation } from "react-i18next";
import './index.scss';
import { IoStorefront } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
function AdminGeneralMenu() {
  const {
    t
  } = useTranslation();
  return <section id={"adminGeneralMenu"}>
            <h2>{t("general")}</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>{t("store_details")}</div>
                <div className={"wrapper10"}>
                    <div className={"choose"}>
                        <IoStorefront />{t("my_store")}</div>
                    <div className={"line"}></div>
                    <div className={"choose choose1"}>
                            <IoStorefront />
                        <div>
                            <div>{t("billing_address")}</div>
                            <div className={"asd"}>{t("azerbaijan")}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>{t("order_id")}</div>
                <div className={"boz"}>{t("shown_on_the_order_page_customer_pages_and_customer_order_notifications_to_identify_order")}</div>
                <div className={"row"}>
                    <div className={"col-6"} style={{
          padding: "16px 16px 16px 0"
        }}>
                        <div>{t("prefix")}</div>
                        <input placeholder={"#"} style={{
            width: "100%"
          }} />
                    </div>
                    <div className={"col-6"} style={{
          padding: "16px 0 16px 16px"
        }}>
                        <div>{t("suffix")}</div>
                        <input placeholder={"#"} style={{
            width: "100%"
          }} />
                    </div>
                </div>
                <div className={"boy"}>{t("your_order_id_will_appear_as_1001_1002_1003")}</div>
            </div>
            <div className={"box wrapper wrapper4"}>
                <div className={"storeDetails"}>{t("order_processing")}<AiOutlineExclamationCircle /></div>
                <div className={"boy"}>{t("after_an_order_has_been_paid")}</div>
                <div className={"form"}>
                    <div className={"flexx"}>
                        <input type={"radio"} />
                        <div>{t("automatically_fulfill_the_order_s_line_items")}</div>
                    </div>
                    <div className={"flexx"}>
                        <input type={"radio"} />
                        <div>{t("don_t_fulfill_any_of_the_order_s_line_items_automatically")}</div>
                    </div>
                </div>
                <div className={"boy"}>{t("after_an_order_has_been_fulfilled_and_paid_or_when_all_items_have_been_refunded")}</div>
                <div className={"form"}>
                    <div className={"flexx"}>
                        <input type={"checkbox"} />
                        <div>{t("automatically_fulfill_the_order_s_line_items")}</div>
                    </div>
                </div>
            </div>
            <button className={"saveButton"}>{t("save_changes")}</button>
        </section>;
}
export default AdminGeneralMenu;