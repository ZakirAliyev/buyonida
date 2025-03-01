import React, {useState, useEffect} from "react";
import "./index.scss";
import {FaRegTrashAlt, FaShoppingBag, FaTrash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const MarketCart = ({isOpen, onClose}) => {
    // Local storage-dan basket məlumatını oxuyuruq
    const [basketItems, setBasketItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasketItems(basket);
    }, [isOpen]); // Cart açıldıqda yenilənir

    // Miqdarı yeniləyən funksiya
    const updateQuantity = (item, delta) => {
        const updatedItems = basketItems.map((basketItem) => {
            // Eyni məhsulu və variant konfiqurasiyasını yoxlayırıq
            if (
                basketItem.id === item.id &&
                JSON.stringify(basketItem.selectedVariants) ===
                JSON.stringify(item.selectedVariants)
            ) {
                const newQuantity = basketItem.quantity + delta;
                return {...basketItem, quantity: newQuantity > 0 ? newQuantity : 1};
            }
            return basketItem;
        });
        setBasketItems(updatedItems);
        localStorage.setItem("basket", JSON.stringify(updatedItems));
    };

    // Məhsul silmə funksiyası
    const removeItem = (id) => {
        const updatedItems = basketItems.filter((item) => item.id !== id);
        setBasketItems(updatedItems);
        localStorage.setItem("basket", JSON.stringify(updatedItems));
    };

    // Subtotal hesablanması (sadəcə məhsulların qiymətləri və miqdarı)
    const subtotal = basketItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <section id="marketCart">
            <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
                <div>
                    <h2 className="cart-title">YOUR SHOPPING BAG</h2>

                    {/* Basketdəki məhsullar */}
                    <div className="cart-items">
                        {basketItems.length > 0 ? (
                            basketItems.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}>
                                            <h3>{item.title}</h3>
                                            <button
                                                className="delete-btn"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <FaRegTrashAlt/>
                                            </button>
                                        </div>
                                        {/* Seçilmiş variantları göstəririk */}
                                        {item.selectedVariants &&
                                            Object.entries(item.selectedVariants).map(
                                                ([variant, value]) => (
                                                    <p key={variant}>
                                                        {variant}: {value}
                                                    </p>
                                                )
                                            )}
                                        <div className="cart-item-footer">
                                            <span className="price">${item.price}</span>
                                            <div className="quantity">
                                            <span style={{
                                                fontSize: '14px',
                                                marginRight: '10px'
                                            }}>Quantity:</span>
                                                <div className={"btnWrapper"}>
                                                    <button onClick={() => updateQuantity(item, -1)}>
                                                        -
                                                    </button>
                                                    <input type="text" value={item.quantity} readOnly/>
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

                    {/* Aşağı hissə: Subtotal, Shipping və Total */}
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

                <button className="checkout-btn" onClick={() => {
                    navigate('/checkout')
                }}><FaShoppingBag/>CHECKOUT SECURELY
                </button>
            </div>
        </section>
    );
};

export default MarketCart;
