import { useTranslation } from "react-i18next";
import "./index.scss";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import CSMarketSwiperHero from "../CustomMarket/CSMarketSwiperHero/index.jsx";
import CSMarketNavbar from "../CustomMarket/CSMarketNavbar/index.jsx";
import CSMarketTitle from "../CustomMarket/CSMarketTitle/index.jsx";
import CSMarketCard from "../CustomMarket/CSMarketCard/index.jsx";
import { useEffect } from "react";
import { useGetStoreWithSectionsQuery } from "../../../service/userApi.js"; // Adjust the import path
import Cookies from "js-cookie";
import CustomizeStoreMarketFooter from "../CustomizeStoreMarketFooter/index.jsx";
function CustomizeStoreMarketHomePage({
  swipers,
  sections,
  customLogo,
  customLogoWidth
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
  const pageStyles = selectedPalette ? {
    '--background-color': selectedPalette.backgroundColor,
    // Main page background
    '--section-bg-color': selectedPalette.cardBgColor // Section background (e.g., for cards container)
  } : {};
  const sectionsArray = [...(sections.categorySections || []), ...(sections.collectionSections || [])].sort((a, b) => a.displayOrderId - b.displayOrderId);
  useEffect(() => {
    const savedFont = localStorage.getItem("selectedFont");
    if (savedFont) {
      const style = document.createElement("style");
      style.innerHTML = `body { font-family: ${savedFont} !important; }`;
      document.head.appendChild(style);
    }
  }, []);
  return <section id="customizeStoreMarketHomePage" style={pageStyles}>
            <div className="navbar-container">
                <CSMarketNavbar customLogo={customLogo} customLogoWidth={customLogoWidth} />
            </div>
            <CSMarketSwiperHero swipers={swipers} />
            <div className="section">
                {sectionsArray.map((section, index) => <div key={index}>
                        {section.type === "category" ? <>
                                <CSMarketTitle title={`${section.category} (Order: ${section.displayOrderId}) :`} category={section.category} />
                                <div className="container">
                                    <div className="row">
                                        {section.products.map(product => <CSMarketCard number={60 / section.cardsInRow} product={product} key={product.id} />)}
                                    </div>
                                </div>
                            </> : section.type === "collection" ? <>
                                <CSMarketTitle title={`${section.collection} (Order: ${section.displayOrderId}) :`} category={section.collection} />
                                <div className="container">
                                    <div className="row">
                                        {section.products.map(product => <CSMarketCard number={60 / section.cardsInRow} product={product} key={product.id} />)}
                                    </div>
                                </div>
                            </> : null}
                    </div>)}
            </div>
            <CustomizeStoreMarketFooter customLogo={customLogo} customLogoWidth={customLogoWidth} />
        </section>;
}
export default CustomizeStoreMarketHomePage;