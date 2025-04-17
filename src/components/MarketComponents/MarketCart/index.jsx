import "./index.scss";
import { useEffect, useState, useCallback } from "react";
import { FaRegTrashAlt, FaShoppingBag } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Fingerprint from "../../Fingerprint/index.jsx";
import {
    useDeleteBasketItemMutation,
    useGetBasketGetOrCreateQuery,
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
    usePostAddProductMutation,
    usePostBasketCheckoutMutation,
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_LOGO } from "../../../../constants.js";
import { toast } from "react-toastify";

const MarketCart = ({ isOpen, onClose, basketItems: initialBasketItems }) => {
    const navigate = useNavigate();
    const params = useParams();
    const marketName = params?.marketName?.substring(1);
    const { data: storeData } = useGetStoreByNameQuery(marketName, { skip: !marketName });
    const store = storeData?.data;
    const marketId = store?.id;
    const uniqueCode = Cookies.get("uniqueCode");

    // Fetch store sections and palette
    const {
        data: getStoreWithSections,
        isLoading: isSectionsLoading,
        isError: isSectionsError,
    } = useGetStoreWithSectionsQuery(marketId, {
        skip: !marketId,
    });

    // Extract selected palette
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const selectedPalette = getStoreWithSections?.data?.palets?.find(
        (palette) => palette.id === selectedPaletId
    ) || {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        buttonBgColor: "#000000",
        buttonTextColor: "#ffffff",
        buttonBorderColor: "#ffffff",
    }; // Fallback palette

    // Fetch basket data
    const {
        data: basketData,
        refetch,
        isLoading: isBasketLoading,
        error: basketError,
        isUninitialized: isBasketUninitialized,
    } = useGetBasketGetOrCreateQuery(
        { uniqueCode, marketId },
        { skip: !uniqueCode || !marketId }
    );

    const basketItems = basketData?.data?.basketItems || [];

    const [deleteBasketItem] = useDeleteBasketItemMutation();
    const [postBasketCheckout] = usePostBasketCheckoutMutation();
    const [postAddProduct] = usePostAddProductMutation();
    const [localBasketItems, setLocalBasketItems] = useState(initialBasketItems || []);

    // Sync localBasketItems with server-fetched basketItems
    useEffect(() => {
        if (basketItems.length > 0) {
            setLocalBasketItems(basketItems);
        } else {
            setLocalBasketItems([]);
        }
    }, [basketItems]);

    // Refetch basket data when cart opens, but only if the query has started
    useEffect(() => {
        if (isOpen && !isBasketUninitialized && uniqueCode && marketId) {
            refetch();
        }
    }, [isOpen, refetch, isBasketUninitialized, uniqueCode, marketId]);

    // Calculate subtotal
    const subtotal = localBasketItems.reduce(
        (acc, item) => acc + (item.price * item.quantity || 0),
        0
    );

    // Update item quantity
    const updateQuantity = useCallback(async (item, change) => {
        if (item.quantity === 1 && change < 0) return;

        // Optimistic UI update
        setLocalBasketItems((prevItems) =>
            prevItems.map((it) =>
                it.id === item.id ? { ...it, quantity: it.quantity + change } : it
            )
        );

        try {
            await postAddProduct({
                uniqueCode,
                productId: item.productId,
                quantity: change,
                marketId,
                selectedOptions: item.basketItemOptions
                    ? item.basketItemOptions.map((option) => ({
                        productOptionId: option.productOptionId,
                        optionValueId: option.optionValueId,
                    }))
                    : [],
            }).unwrap();
            refetch(); // Ensure basket is in sync
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            refetch(); // Revert to server state
        }
    }, [postAddProduct, uniqueCode, marketId, refetch]);

    // Remove item from basket
    const handleRemoveItem = useCallback(async (item) => {
        // Optimistic UI update
        setLocalBasketItems((prevItems) => prevItems.filter((it) => it.id !== item.id));

        try {
            await deleteBasketItem({
                basketItemId: item.id,
                marketId,
                uniqueCode,
            }).unwrap();
            toast.success("Item removed from cart!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            refetch();
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            refetch();
        }
    }, [deleteBasketItem, marketId, uniqueCode, refetch]);

    // Handle checkout
    const handleYasinCheckPut = useCallback(async (marketId) => {
        if (!uniqueCode || !marketId) {
            toast.error("Invalid session or market. Please try again.", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            return;
        }

        try {
            await postBasketCheckout({ uniqueCode, marketId }).unwrap();
            navigate(`/checkout/${marketId}`);
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Checkout failed. Please try again.", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
        }
    }, [postBasketCheckout, uniqueCode, marketId, navigate]);

    if (isSectionsError || basketError) {
        return <p>Error loading cart. Please try again later.</p>;
    }

    return (
        <section id="marketCart">
            <div
                className={`cart-sidebar ${isOpen ? "open" : ""}`}
                style={{
                    backgroundColor: selectedPalette.backgroundColor,
                    color: selectedPalette.textColor,
                }}
            >
                <div className="cart-header">
                    <h2 className="cart-title">
                        <FaX style={{visibility: 'hidden'}}/>
                        YOUR SHOPPING BAG
                        <FaX style={{fontSize: '12px'}} onClick={onClose}/>
                    </h2>
                    <Fingerprint />
                </div>
                <div className="cart-items">
                    {localBasketItems.length > 0 ? (
                        localBasketItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img
                                    src={`${PRODUCT_LOGO}${item.product?.imageNames?.[0] || ''}`}
                                    alt={item.product?.title || 'Product Image'}
                                    className="cart-item-image"
                                    onError={(e) => (e.target.src = "/fallback-image.png")} // Fallback image
                                />
                                <div className="cart-item-info">
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <h3>{item.product?.title || 'Unknown Product'}</h3>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleRemoveItem(item)}
                                            style={{
                                                color: selectedPalette.textColor,
                                            }}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                    {item.basketItemOptions?.length > 0 ? (
                                        item.basketItemOptions.map((option, idx) => (
                                            <p key={idx}>
                                                {option.productOptionName}: {option.optionValue}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No options selected</p>
                                    )}
                                    <div className="cart-item-footer">
                                        <span className="price">${(item.price || 0).toFixed(2)}</span>
                                        <div className="quantity">
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                Quantity:
                                            </span>
                                            <div className="btnWrapper">
                                                <button
                                                    onClick={() => updateQuantity(item, -1)}
                                                    style={{
                                                        backgroundColor: selectedPalette.buttonBgColor,
                                                        color: selectedPalette.buttonTextColor,
                                                        borderColor: selectedPalette.buttonBorderColor,
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity || 0}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item, 1)}
                                                    style={{
                                                        backgroundColor: selectedPalette.buttonBgColor,
                                                        color: selectedPalette.buttonTextColor,
                                                        borderColor: selectedPalette.buttonBorderColor,
                                                    }}
                                                >
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
                <div className="cart-footer">
                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span>Sub Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>Estimated Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <div className="cart-summary-row total">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => handleYasinCheckPut(marketId)}
                        disabled={!marketId || localBasketItems.length === 0}
                        style={{
                            backgroundColor: selectedPalette.buttonBgColor,
                            color: selectedPalette.buttonTextColor,
                            borderColor: selectedPalette.buttonBorderColor,
                        }}
                    >
                        <FaShoppingBag /> CHECKOUT SECURELY
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MarketCart;