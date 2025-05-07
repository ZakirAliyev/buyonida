import { useTranslation } from "react-i18next";
import './index.scss';
import { useState, useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
function AdminPopUp() {
  const {
    t
  } = useTranslation();
  const prop = "success";
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    if (open) {
      setFade(false);
      const timer = setTimeout(() => {
        setFade(true);
        setTimeout(() => setOpen(false), 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);
  return <section id="adminPopUp">
            <button onClick={() => setOpen(true)}>{t("adminpopup")}</button>
            {open && <div className={`wrapper1 ${fade ? "fadeOut" : ""}`}>
                    <div className="popUp" style={{
        backgroundColor: prop === "error" ? "red" : prop === "warning" ? "#EED200" : "green"
      }}>
                        <AiOutlineExclamationCircle />
                        {prop === "error" ? "Error" : prop === "warning" ? "Warning" : "Success"}
                    </div>
                    <div className="popUp1">{t("you_added_your_first_product")}</div>
                </div>}
        </section>;
}
export default AdminPopUp;