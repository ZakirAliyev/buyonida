import "./index.scss";
import {useEffect, useState} from "react";
import {FaRegTrashAlt, FaShoppingBag} from "react-icons/fa";
import Fingerprint from "../../Fingerprint/index.jsx";
import {
    useDeleteBasketItemMutation,
    useGetBasketGetOrCreateQuery,
    useGetStoreByNameQuery,
    usePostAddProductMutation,
    usePostBasketCheckoutMutation
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {PRODUCT_LOGO} from "../../../../constants.js";
import {toast} from "react-toastify";

const MarketCart = ({isOpen, onClose}) => {
    const navigate = useNavigate();
    const params = useParams();

    const marketName = params?.marketName?.substring(1);

    const {data: storeData} = useGetStoreByNameQuery(marketName);
    const store = storeData?.data;
    const marketId = store?.id;

    // Get uniqueCode from Cookies
    const uniqueCode = Cookies.get("uniqueCode");

    const {data: basketData, refetch} = useGetBasketGetOrCreateQuery({
        marketId,
        uniqueCode
    });
    const basket = basketData?.data;
    const basketItems = basket?.basketItems || [];

    const [deleteBasketItem] = useDeleteBasketItemMutation();
    const [postBasketCheckout] = usePostBasketCheckoutMutation();
    const [postAddProduct] = usePostAddProductMutation();

    const [localBasketItems, setLocalBasketItems] = useState(basketItems);

    const subtotal = localBasketItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    async function updateQuantity(item, change) {
        if (item.quantity === 1 && change < 0) return;

        setLocalBasketItems(prevItems =>
            prevItems.map(it => {
                if (it.id === item.id) {
                    return {...it, quantity: it.quantity + change};
                }
                return it;
            })
        );

        try {
            await postAddProduct({
                uniqueCode: uniqueCode,
                productId: item.productId,
                quantity: change,
                marketId: marketId,
                selectedOptions: item.basketItemOptions
                    ? item.basketItemOptions.map(option => ({
                        productOptionId: option.productOptionId,
                        optionValueId: option.optionValueId
                    }))
                    : []
            }).unwrap();
        } catch (error) {
            console.error("Error updating quantity:", error);
            refetch();
        }
    }

    async function handleRemoveItem(item) {
        setLocalBasketItems(prevItems => prevItems.filter(it => it.id !== item.id));

        try {
            await deleteBasketItem({
                basketItemId: item.id,
                marketId: marketId,
                uniqueCode: uniqueCode
            }).unwrap();
            toast.success("Məhsul səbətdən silindi!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark"
            });
            refetch();
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Məhsul silinirken xəta baş verdi!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark"
            });
            refetch();
        }
    }

    const handleYasinCheckPut = async (marketId) => {
        try {
            const uniqueCodeFromCookie = Cookies.get("uniqueCode");
            const response = await postBasketCheckout({
                uniqueCode: uniqueCodeFromCookie, marketId
            }).unwrap();
            toast.success("Checkout completed successfully!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark"
            });
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Xəta baş verdi! Zəhmət olmasa yenidən cəhd edin.", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark"
            });
        }
    };

    return (
        <section id="marketCart">
            <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
                <div>
                    <h2 className="cart-title">YOUR SHOPPING BAG</h2>
                    <Fingerprint/>
                    <div className="cart-items">
                        {localBasketItems.length > 0 ? (
                            localBasketItems.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <img
                                        src={`${PRODUCT_LOGO}${item.product.imageNames[0]}`}
                                        alt={item.product.title}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <h3>{item.product.title}</h3>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                <FaRegTrashAlt/>
                                            </button>
                                        </div>
                                        {item.basketItemOptions &&
                                            item.basketItemOptions.map((option, idx) => (
                                                <p key={idx}>
                                                    {option.productOptionName}: {option.optionValue}
                                                </p>
                                            ))}
                                        <div className="cart-item-footer">
                                            <span className="price">${item.price}</span>
                                            <div className="quantity">
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        marginRight: "10px"
                                                    }}
                                                >
                                                    Quantity:
                                                </span>
                                                <div className="btnWrapper">
                                                    <button onClick={() => updateQuantity(item, -1)}>
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button onClick={() => updateQuantity(item, 1)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your shopping bag is empty.</p>
                        )}
                    </div>
                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span>Sub Total</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>Estimated Shipping</span>
                            <span>$0</span>
                        </div>
                        <div className="cart-summary-row total">
                            <span>Total</span>
                            <span>${subtotal}</span>
                        </div>
                    </div>
                </div>
                <button
                    className="checkout-btn"
                    onClick={() => {
                        navigate(`/checkout/${marketId}`);
                        handleYasinCheckPut(marketId)
                    }}
                >
                    <FaShoppingBag/> CHECKOUT SECURELY
                </button>
            </div>
        </section>
    );
};

export default MarketCart;
