import './index.scss'
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import {FaChevronRight} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {
    useGetAllProductsByMarketIdQuery,
    useGetCategoryByMarketIdQuery,
    useGetStoreByNameQuery, useGetStoreWithSectionsQuery
} from "../../../service/userApi.js";
import {CATEGORY_LOGO} from "../../../../constants.js";
import MarketCard2 from "../../../components/MarketComponents/MarketCard2/index.jsx";
import {useLocation} from "react-router";

function MarketCategoryPage() {
    const params = useParams()

    const marketName = params?.marketName.substring(1, params?.marketName.length)
    const {data: getStoreByName} = useGetStoreByNameQuery(marketName)
    const store = getStoreByName?.data
    const marketId = store?.id
    const id = params?.id
    const {data: getCategoryByMarketId} = useGetCategoryByMarketIdQuery({marketId, id})
    const category = getCategoryByMarketId?.data
    const {data: getAllProductsByMarketId} = useGetAllProductsByMarketIdQuery(store?.id)
    const products = getAllProductsByMarketId?.data
    const location = useLocation();


    const { data: getStoreWithSections, isLoading: isSectionsLoading, isError: isSectionsError } = useGetStoreWithSectionsQuery(marketId, {
        skip: !id, // Skip this query until id is available
    });

    const font = getStoreWithSections?.data?.fontName;
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);
    return (
        <section id={"marketCategoryPage"}>
            <div className={"section"}  style={{
                backgroundColor: palet?.[0]?.backgroundColor || '#ffffff',
                color: palet?.[0]?.textColor || '#000000',
            }}>
                <div className={"container"}>
                    <div className={"titleWrapper"}>
                        <img src={CATEGORY_LOGO + category?.imageName} alt={"Image"}/>
                        <div className={"textWrapper"} >
                            <h2>{category?.name}</h2>
                            <h3>A short description about product. You will see product details and good sentences in
                                here because i want like that because i want like that</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="line"></div>
                        {category?.products &&
                            category.products.map((product, index) => (
                                <>
                                    <MarketCard2 number={5} product={product} palet={palet} marketName={marketName}/>
                                    {(index + 1) % 5 === 0 && <div className="line"></div>}
                                </>
                            ))}
                        <div className="line"></div>
                    </div>
                    <div className={"lookOther"}>
                        <h4>Lets look to other products:</h4>
                        <div className={"row"}>
                            <div className={"box box1 col-2-60"}>
                                <FaChevronRight className={"icon"}/>
                            </div>
                            {products && products.slice(0, 4).map((product) => (
                                <MarketCard2 number={5} product={product} key={product.id} palet={palet} marketName={marketName}/>
                            ))}
                            <div className={"box col-2-60"}>
                                <FaChevronRight className={"icon"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MarketCategoryPage;