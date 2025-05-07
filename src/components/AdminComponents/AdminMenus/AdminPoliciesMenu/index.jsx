import { useTranslation } from "react-i18next";
import './index.scss';
import { TbCreditCardRefund } from "react-icons/tb";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiChevronRight } from "react-icons/bi";
function AdminPoliciesMenu() {
  const {
    t
  } = useTranslation();
  return <section id={"adminPoliciesMenu"}>
            <h2>{t("policies")}</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>{t("written_policies")}</div>
                <div className={"boz"}>{t("policies_are_linked_in_the_footer_of_checkout_and_can_be_added_to_your_online_store_menu")}</div>
                <div className={"box wrapper"} style={{
        padding: "16px"
      }}>
                    <div className={"padding"}>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <TbCreditCardRefund />{t("return_and_refund_policy")}</div>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <div className={"policy"}>{t("no_policy_yet")}</div>
                            <BiChevronRight />
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <IoLockOpenOutline />{t("privacy_policy")}</div>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <div className={"policy"}>{t("no_policy_yet")}</div>
                            <BiChevronRight />
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <FiFileText />{t("terms_of_service")}</div>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <div className={"policy"}>{t("no_policy_yet")}</div>
                            <BiChevronRight />
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <MdOutlineLocalShipping />{t("shipping_policy")}</div>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <div className={"policy"}>{t("no_policy_yet")}</div>
                            <BiChevronRight />
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <HiOutlineClipboardDocumentList />{t("contact_information")}</div>
                        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
                            <div className={"policy"}>{t("no_policy_yet")}</div>
                            <BiChevronRight />
                        </div>
                    </div>
                </div>
            </div>
        </section>;
}
export default AdminPoliciesMenu;