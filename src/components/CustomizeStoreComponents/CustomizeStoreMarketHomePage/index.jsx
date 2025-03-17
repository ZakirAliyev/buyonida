import "./index.scss";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import CSMarketSwiperHero from "../CustomMarket/CSMarketSwiperHero/index.jsx";
import CSMarketNavbar from "../CustomMarket/CSMarketNavbar/index.jsx";
import CSMarketTitle from "../CustomMarket/CSMarketTitle/index.jsx";
import CSMarketCard from "../CustomMarket/CSMarketCard/index.jsx";

function CustomizeStoreMarketHomePage({ swipers, sections }) {
    // sections prop'u finalSections objesi şeklinde geliyor: { categorySections: [...], collectionSections: [...] }
    // Her iki diziyi birleştirip, displayOrderId'ya göre sıralıyoruz.
    const sectionsArray = [
        ...(sections.categorySections || []),
        ...(sections.collectionSections || [])
    ].sort((a, b) => a.displayOrderId - b.displayOrderId);

    return (
        <section id="customizeStoreMarketHomePage">
            <CSMarketNavbar />
            <CSMarketSwiperHero swipers={swipers} />
            <div className="section">
                {sectionsArray.map((section, index) => (
                    <div key={index}>
                        {section.type === "category" ? (
                            <>
                                <CSMarketTitle
                                    title={`${section.category} (Order: ${section.displayOrderId}) :`}
                                    category={section.category}
                                />
                                <div className="container">
                                    <div className="row">
                                        {section.products.map((product) => (
                                            <CSMarketCard
                                                number={60 / section.cardsInRow}
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : section.type === "collection" ? (
                            <>
                                <CSMarketTitle
                                    title={`${section.collection} (Order: ${section.displayOrderId}) :`}
                                    category={section.collection}
                                />
                                <div className="container">
                                    <div className="row">
                                        {section.products.map((product) => (
                                            <CSMarketCard
                                                number={60 / section.cardsInRow}
                                                product={product}
                                                key={product.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                ))}
            </div>
            <MarketFooter />
        </section>
    );
}

export default CustomizeStoreMarketHomePage;
