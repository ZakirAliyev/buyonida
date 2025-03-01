import React, { useState } from "react";
import "./index.scss";
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import { useParams } from "react-router-dom";
import {
    useGetAllProductsByMarketIdQuery,
    useGetProductByIdQuery,
    useGetStoreByNameQuery,
} from "../../../service/userApi.js";
import { PRODUCT_LOGO } from "../../../../constants.js";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

function MarketProductDetailsPage() {
    const params = useParams();
    const marketName = params.marketName.substring(1);
    const { data: getStoreByName } = useGetStoreByNameQuery(marketName);
    const store = getStoreByName?.data;
    const marketId = store?.id;
    const id = params?.id;
    const { data: getProductById } = useGetProductByIdQuery({ marketId, id });
    const product = getProductById?.data;
    const { data: getAllProductsByMarketId } = useGetAllProductsByMarketIdQuery(marketId);
    const products = getAllProductsByMarketId?.data;

    // State for quantity and selected variants
    const [quantity, setQuantity] = useState(1);
    // Bu nümunədə variantların obyekt şəklində saxlanması nəzərdə tutulur, məsələn: { color: 'red', size: 'M' }
    const [selectedVariants, setSelectedVariants] = useState({});

    const handleVariantChange = (optionName, value) => {
        setSelectedVariants((prev) => ({ ...prev, [optionName]: value }));
    };

    const handleAddToCart = () => {
        // Yerlərdə olan səbəti oxuyuruq, əgər yoxdursa, boş array
        const basket = JSON.parse(localStorage.getItem("basket")) || [];
        // Əgər hər variantdan yalnız bir dənə əlavə etmək istəyirsinizsə,
        // əvvəlcədən eyni variant konfiqurasiyasına malik məhsul varsa onu update edin.
        const existingIndex = basket.findIndex(
            (item) =>
                item.id === product.id &&
                JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
        );
        if (existingIndex > -1) {
            // Miqdarı artırırıq
            basket[existingIndex].quantity += quantity;
        } else {
            // Yeni obyekt yaradırıq
            const basketItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product?.imageNames ? PRODUCT_LOGO + product.imageNames[0] : "",
                selectedVariants,
                quantity,
            };
            basket.push(basketItem);
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        // İstəyə bağlı olaraq, uğur mesajı və ya modal göstərmək olar
        alert("Məhsul səbətə əlavə edildi!");
    };

    return (
        <section id="marketProductDetailsPage">
            <MarketNavbar />

            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                {product?.imageNames.length > 1 ? (
                                    <div className="pd8 col-2">
                                        {product?.imageNames &&
                                            product.imageNames.slice(1, 6).map((image, index) => (
                                                <img src={PRODUCT_LOGO + image} alt="Image" key={index}/>
                                            ))}
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className={product?.imageNames.length > 1 ? 'col-10' : 'col-12'}>
                                    <img src={PRODUCT_LOGO + product?.imageNames[0]} alt="Image"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <h2>{product?.title}</h2>
                            <h3>
                                <span className="span1">{product?.price} AZN </span>
                                <span className="span2">{product?.comparePrice} AZN</span>
                            </h3>
                            <h4 dangerouslySetInnerHTML={{ __html: product?.description }}></h4>
                            {product?.productOptions &&
                                product.productOptions.map((option, index) => (
                                    <div key={index}>
                                        <h5>{option?.name}</h5>
                                        <div className="variantWrapper">
                                            {option?.values &&
                                                option.values.map((opt, idx) => (
                                                    <button
                                                        key={idx}
                                                        className={
                                                            selectedVariants[option.name] === opt.value
                                                                ? "optVal active"
                                                                : "optVal"
                                                        }
                                                        onClick={() => handleVariantChange(option.name, opt.value)}
                                                    >
                                                        {opt.value}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            <div className="allWrapper">
                                <div className="incDecWrapper">
                                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        min="1"
                                        readOnly
                                    />
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                                <button onClick={handleAddToCart}>ADD TO CART</button>
                            </div>
                            <button>BUY IT NOW</button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container"
                key={product?.id}
                style={{ margin: "0 auto 70px" }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h1 style={{ padding: "16px" }}>Products you might like</h1>
                    <button>
                        Find out more <HiOutlineArrowLongRight className="icon" />
                    </button>
                </div>
                <div className="row">
                    {products &&
                        products.slice(0, 5).map((prod) => (
                            <MarketCard number={12} key={prod.id} product={prod} />
                        ))}
                </div>
            </div>
            <MarketFooter />
        </section>
    );
}

export default MarketProductDetailsPage;
