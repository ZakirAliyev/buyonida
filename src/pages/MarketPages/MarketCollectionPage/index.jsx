import './index.scss'
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import {FaChevronRight} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {
    useGetAllProductsByMarketIdQuery,
    useGetCollectionByMarketIdQuery,
    useGetStoreByNameQuery
} from "../../../service/userApi.js";
import {CATEGORY_LOGO, COLLECTION_LOGO} from "../../../../constants.js";

function MarketCollectionPage() {

    const params = useParams()

    const marketName = params?.marketName.substring(1, params?.marketName.length)
    const {data: getStoreByName} = useGetStoreByNameQuery(marketName)
    const store = getStoreByName?.data
    const marketId = store?.id
    const id = params?.id
    const {data: getCollectionByMarketId} = useGetCollectionByMarketIdQuery({marketId, id})
    const collection = getCollectionByMarketId?.data
    const {data: getAllProductsByMarketId} = useGetAllProductsByMarketIdQuery(store?.id)
    const products = getAllProductsByMarketId?.data

    return (
        <section id={"marketCollectionPage"}>
            <div className={"section"}>
                <div className={"container"}>
                    <div className={"titleWrapper"}>
                        <img src={COLLECTION_LOGO + collection?.coverImageUrl} alt={"Image"}/>
                        <div className={"textWrapper"}>
                            <h2>{collection?.title}</h2>
                            <h3>A short description about product. You will see product details and good sentences in
                                here because i want like that because i want like that</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="line"></div>
                        {collection?.products &&
                            collection.products.map((product, index) => (
                                <>
                                    <MarketCard number={12} product={product}/>
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
                                <MarketCard number={14} product={product} key={product.id}/>
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

export default MarketCollectionPage;