import { useState } from "react";
import "./index.scss";
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import { useParams } from "react-router-dom";
import {
    useGetAllProductsByMarketIdQuery,
    useGetProductByIdQuery,
    useGetStoreByNameQuery,
    usePostAddProductMutation,
    useGetBasketGetOrCreateQuery,
} from "../../../service/userApi.js";
import { PRODUCT_LOGO } from "../../../../constants.js";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

function MarketProductDetailsPage() {
    const params = useParams();
    const marketName = params.marketName.substring(1);
    const { data: getStoreByName } = useGetStoreByNameQuery(marketName);
    const store = getStoreByName?.data;
    const marketId = store?.id;
    const id = params?.id;
    const uniqueCode = Cookies.get('uniqueCode');

    // Ürünü ve diğer ürünleri çekiyoruz
    const { data: getProductById } = useGetProductByIdQuery({ marketId, id });
    const product = getProductById?.data;
    const { data: getAllProductsByMarketId } = useGetAllProductsByMarketIdQuery(marketId);
    const products = getAllProductsByMarketId?.data;

    // Sepet verilerini almak için ek hook
    const { refetch: refetchBasket } = useGetBasketGetOrCreateQuery({ marketId, uniqueCode });

    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [triggerBasket] = usePostAddProductMutation();

    const handleVariantChange = (optionName, value) => {
        setSelectedVariants((prev) => ({ ...prev, [optionName]: value }));
    };

    const handleAddToCart = async () => {
        if (product?.productOptions) {
            for (let option of product.productOptions) {
                if (!selectedVariants[option.name]) {
                    toast.warning(`Zəhmət olmasa ${option.name} seçin`, {
                        position: 'bottom-right',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });
                    return;
                }
            }
        }

        const selectedOptions = product?.productOptions.map((option) => {
            const selectedValue = selectedVariants[option.name];
            const valueObj = option.values.find((val) => val.value === selectedValue);
            return {
                productOptionId: option.id,
                optionValueId: valueObj?.id,
            };
        });

        const payload = {
            uniqueCode: uniqueCode,
            productId: product.id,
            quantity: quantity,
            marketId: marketId,
            selectedOptions: selectedOptions,
        };

        const response = await triggerBasket(payload).unwrap();

        if (response?.statusCode === 201) {
            toast.success("Məhsul səbətə əlavə edildi!", {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            // Varyant seçimlerini ve miktarı sıfırla
            setSelectedVariants({});
            setQuantity(1);
            // Sepet verilerini refetch et
            refetchBasket();
        }
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
                                                <img src={PRODUCT_LOGO + image} alt="Image" key={index} />
                                            ))}
                                    </div>
                                ) : null}
                                <div className={product?.imageNames.length > 1 ? 'col-10' : 'col-12'}>
                                    <img src={PRODUCT_LOGO + product?.imageNames[0]} alt="Image" />
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
            <ToastContainer />
        </section>
    );
}

export default MarketProductDetailsPage;
