import { useTranslation } from "react-i18next";
import './index.scss';
import { PRODUCT_LOGO } from "../../../../../constants.js";
import Cookies from "js-cookie";
import { useGetStoreWithSectionsQuery } from "../../../../service/userApi.js";
function CSMarketCard({
  number,
  product
}) {
  const {
    t
  } = useTranslation();
  const {
    data: getStoreWithSectionsByMarketId
  } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
  const storeWithSections = getStoreWithSectionsByMarketId?.data;
  const selectedPaletId = storeWithSections?.selectedPaletId;
  const selectedPalette = storeWithSections?.palets?.find(p => p.id === selectedPaletId);
  const cardStyles = selectedPalette ? {
    '--card-bg-color': selectedPalette.cardBgColor,
    '--card-text-color': selectedPalette.cardTextColor
  } : {};
  return <div className={`col-${number}-60`} onClick={() => navigate(`product/${product?.id}`)}>
            <section id="cSMarketCard" style={cardStyles}>
                    <img src={PRODUCT_LOGO + product?.imageNames[0]} alt="Image" />
                <div className="textWrapper">
                    <h2>{product?.title}</h2>
                    <h3>{product?.price}{t("azn")}</h3>
                </div>
            </section>
        </div>;
}
export default CSMarketCard;