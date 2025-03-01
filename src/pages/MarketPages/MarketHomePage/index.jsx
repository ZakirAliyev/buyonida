import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketSwiperHero from "../../../components/MarketComponents/MarketSwiperHero/index.jsx";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import MarketTitle from "../../../components/MarketComponents/MarketTitle/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import {
    useGetAllCategoriesByMarketIdQuery, useGetAllCollectionsByMarketIdQuery, useGetCategoryByMarketIdQuery,
    useGetStoreByNameQuery
} from "../../../service/userApi.js";
import {useLocation} from "react-router";

function MarketHomePage() {

    const location = useLocation();
    const cleanedPath = location.pathname
        .replace(/\//g, '')
        .replace(/%20/g, ' ')
        .replace(/@/g, '');

    const {data: getStoreByName} = useGetStoreByNameQuery(cleanedPath)
    const store = getStoreByName?.data

    const {data: getAllCategoriesByMarketId} = useGetAllCategoriesByMarketIdQuery(store?.id)
    const categories = getAllCategoriesByMarketId?.data

    const {data: getAllCollectionsByMarketId} = useGetAllCollectionsByMarketIdQuery(store?.id)
    const collections = getAllCollectionsByMarketId?.data

    return (
        <section id={"marketHomePage"}>
            <MarketNavbar/>
            <MarketSwiperHero/>
            <div className={"section"}>
                {categories && categories.map((category) => (
                    <>
                        {category?.products.length > 0 && (
                            <>
                                <MarketTitle title={`${category?.name} :`} category={category}/>
                                <div className={"container"} key={category?.id}>
                                    <div className={"row"}>
                                        {category?.products && category?.products.map((product) => (
                                            <MarketCard number={12} key={product.id} product={product}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ))}
                {collections && collections.map((collection) => (
                    <>
                        <MarketTitle title={`${collection?.title} :`} collection={collection}/>
                        <div className={"container"} key={collection?.id}>
                            <div className={"row"}>
                                {collection?.products && collection?.products.map((product) => (
                                    <MarketCard number={12} key={product.id} product={product}/>
                                ))}
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketHomePage;