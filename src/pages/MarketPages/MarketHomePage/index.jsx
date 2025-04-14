import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketSwiperHero from "../../../components/MarketComponents/MarketSwiperHero/index.jsx";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import MarketTitle from "../../../components/MarketComponents/MarketTitle/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import {
    useGetAllCategoriesByMarketIdQuery, useGetAllCollectionsByMarketIdQuery, useGetCategoryByMarketIdQuery,
    useGetStoreByNameQuery, useGetStoreWithSectionsQuery
} from "../../../service/userApi.js";
import {useLocation} from "react-router";
import Cookies from "js-cookie";

function MarketHomePage() {

    const location = useLocation();
    const cleanedPath = location.pathname
        .replace(/\//g, '')
        .replace(/%20/g, ' ')
        .replace(/@/g, '');

    const {data: getStoreByName} = useGetStoreByNameQuery(cleanedPath)
    const store = getStoreByName?.data
    const id = Cookies.get("chooseMarket")
    console.log(id)
    const {data: getStoreWithSections} = useGetStoreWithSectionsQuery(id)
    const categories = getStoreWithSections?.data?.sections[1].category

    const collections = getStoreWithSections?.data?.sections[2].collection
    console.log(collections)
    return (
        <section id={"marketHomePage"}>
            <MarketNavbar/>
            <MarketSwiperHero/>
            <div className={"section"}>


                <MarketTitle title={`${categories?.name} :`} categories={categories}/>
                <div className={"container"} key={categories?.id}>
                    <div className={"row"}>
                        {categories?.products && categories?.products.map((product) => (
                            <MarketCard number={12} key={product.id} product={product}/>
                        ))}
                    </div>
                </div>


                        <MarketTitle title={`${collections?.title} :`} collections={collections}/>
                        <div className={"container"} key={collections?.id}>
                            <div className={"row"}>
                                {collections?.products && collections?.products.map((product) => (
                                    <MarketCard number={12} key={product.id} product={product}/>
                                ))}
                            </div>
                        </div>
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketHomePage;