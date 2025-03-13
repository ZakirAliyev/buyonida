import './index.scss'
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import {
    useGetStoreWithSectionsQuery
} from "../../../service/userApi.js";
import CSMarketSwiperHero from "../CustomMarket/CSMarketSwiperHero/index.jsx";
import CSMarketNavbar from "../CustomMarket/CSMarketNavbar/index.jsx";
import Cookies from "js-cookie";
import CSMarketTitle from "../CustomMarket/CSMarketTitle/index.jsx";
import CSMarketCard from "../CustomMarket/CSMarketCard/index.jsx";

function CustomizeStoreMarketHomePage({swipers}) {

    const {data: getStoreWithSections} = useGetStoreWithSectionsQuery(Cookies.get('chooseMarket'))
    const mySections = getStoreWithSections?.data
    const sections = mySections?.sections


    return (
        <section id={"customizeStoreMarketHomePage"}>
            <CSMarketNavbar/>
            <CSMarketSwiperHero swipers={swipers}/>
            <div className={"section"}>
                {sections && sections.map((section, index) => (
                    <div key={index}>
                        {section?.sectionType === 'Category' ? (
                            <>
                                <CSMarketTitle
                                    title={`${section?.category?.name} :`}
                                    category={section?.category}
                                />
                                <div className={"container"}>
                                    <div className={"row"}>
                                        {section?.category?.products && section?.category?.products.map((product) => (
                                            <CSMarketCard number={60 / section?.displayColumns} product={product}
                                                          key={product.id}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : section?.sectionType === 'Collection' ? (
                            <>
                                <CSMarketTitle
                                    title={`${section?.collection?.title} :`}
                                    category={section?.collection}
                                />
                                <div className={"container"}>
                                    <div className={"row"}>
                                        {section?.collection?.products && section?.collection?.products.map((product) => (
                                            <CSMarketCard number={60 / section?.displayColumns} product={product}
                                                          key={product.id}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                ))}
            </div>
            <MarketFooter/>
        </section>
    );
}

export default CustomizeStoreMarketHomePage;