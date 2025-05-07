import { useTranslation } from "react-i18next";
import './index.scss';
import { PulseLoader } from "react-spinners";
function AdminAreYouSure({
  onCancel,
  onRefund,
  isRefunding
}) {
  const {
    t
  } = useTranslation();
  return <section id="adminAreYouSure">
            <h2>{t("are_you_sure_to_refund")}</h2>
            <div className="ending">
                <button className="btnbtntb" onClick={onCancel} disabled={isRefunding}>{t("cancel")}</button>
                <button className="btn-done" onClick={onRefund} disabled={isRefunding}>
                    {isRefunding ? <PulseLoader color={"white"} size={10} /> : "Refund"}
                </button>
            </div>
        </section>;
}
export default AdminAreYouSure;