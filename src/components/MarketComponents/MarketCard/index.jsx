import { useTranslation } from "react-i18next";
import './index.scss';
import { PRODUCT_LOGO } from "../../../../constants.js";
import { useNavigate } from "react-router-dom";
function MarketCard({
  number,
  product,
  palet
}) {
  const {
    t
  } = useTranslation();
  const newNumber = 60 / number;
  const navigate = useNavigate();
  return <div className={`col-${newNumber}-60 col-md-30-60 col-sm-30-60 col-xs-30-60`} onClick={() => {
    navigate(`product/${product?.id}`);
  }}>
            <section id={"marketCard"} style={{
      backgroundColor: palet ? `${palet[0]?.cardBgColor}` : "#ffffff",
      color: palet ? `${palet[0]?.cardTextColor}` : "#000000"
    }}>
                   <div className={"img"}>
                       <img src={product?.imageNames.includes('https://i.ibb.co/p6HWZzQs/Line-2.png') ? product?.imageNames : PRODUCT_LOGO + product?.imageNames[0]} alt={"Image"} />
                   </div>
                <div className={"textWrapper"}>
                <h2>{product?.title}</h2>
                    <h3>{product?.price}{t("azn")}</h3>
                </div>
            </section>
        </div>;
}
export default MarketCard;