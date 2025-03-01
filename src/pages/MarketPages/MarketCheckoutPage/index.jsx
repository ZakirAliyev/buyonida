import React, { useEffect, useState } from "react";
import "./index.scss";
import image1 from "/src/assets/qaraLogo.png";
import { PRODUCT_LOGO } from "../../../../constants.js";

function MarketCheckoutPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // localStorage'de cartItems diye bir key varsa onu oku
        const itemsFromStorage = localStorage.getItem("cartItems");
        if (itemsFromStorage) {
            setCartItems(JSON.parse(itemsFromStorage));
        }
    }, []);

    // Subtotal hesaplama (fiyat * adet)
    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );

    // Örnek kargo ücreti (istersen dinamik yapabilirsin)
    const shipping = 10;
    const total = subTotal + shipping;

    return (
        <section id="marketCheckoutPage">
            {/* Üst Logo Alanı */}
            <div className="yuxari">
                <img src={image1} alt="Logo" />
            </div>

            <div className="section">
                <div className="row">
                    {/* SOL KISIM: İletişim ve Teslimat Bilgileri */}
                    <div className="box1 col-6">
                        <div className="container2 left-container">
                            <h3>CONTACT</h3>
                            <div className="form-group">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="tel" placeholder="Phone number" />
                            </div>

                            <h3>DELIVERY</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Country/Region" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Address line 1" />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Address line 2" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="City" />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="ZIP Code" />
                                </div>
                            </div>

                            <button className="pay-now-btn">PAY NOW</button>
                        </div>
                    </div>

                    {/* SAĞ KISIM: Sepet Özeti */}
                    <div className="box2 col-6">
                        <div className="container2 right-container">
                            <h2>Shopping cart</h2>

                            {/* Ürün Listesi */}
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="product-block">
                                        <div className="product-image">
                                            {/* Əgər resim varsa göstər, yoxsa placeholder */}
                                            <img
                                                src={PRODUCT_LOGO + item.image}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4>{item.title}</h4>
                                            {/* selectedVariants varsa Rəng və Ölçü bilgilerini göstər */}
                                            {item.selectedVariants && item.selectedVariants["Rəng"] && (
                                                <p>Color: {item.selectedVariants["Rəng"]}</p>
                                            )}
                                            {item.selectedVariants && item.selectedVariants["Ölçü"] && (
                                                <p>Size: {item.selectedVariants["Ölçü"]}</p>
                                            )}
                                            <p>Quantity: {item.quantity || 1}</p>
                                        </div>
                                        <div className="product-price">
                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Toplam Bilgileri */}
                            <div className="totals">
                                <div className="line-item">
                                    <span>Sub Total</span>
                                    <span>${subTotal}</span>
                                </div>
                                <div className="line-item">
                                    <span>Shipping</span>
                                    <span>${shipping}</span>
                                </div>
                                <div className="line-item total">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MarketCheckoutPage;
