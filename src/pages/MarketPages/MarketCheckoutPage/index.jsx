import {useEffect, useState} from "react";
import "./index.scss";
import image1 from "/src/assets/qaraLogo.png";
import {PRODUCT_LOGO} from "../../../../constants.js";
import {useGetBasketGetOrCreateQuery, usePostOrderMutation} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

function MarketCheckoutPage() {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address1: "",
        country: "",
        address2: "",
        city: "",
        region: "",
        postCode: "",
        specialNote: "",
    });
    const [errors, setErrors] = useState({});

    const params = useParams();
    const marketId = params?.marketId;
    const uniqueCode = Cookies.get("uniqueCode");

    const {data: getBasketGetOrCreate, refetch: basketRefetch} =
        useGetBasketGetOrCreateQuery({marketId, uniqueCode});

    // API-dən gələn məlumatı cartItems state-nə yazırıq
    useEffect(() => {
        if (getBasketGetOrCreate?.data?.basketItems) {
            setCartItems(getBasketGetOrCreate.data.basketItems);
        }
        basketRefetch();
    }, [getBasketGetOrCreate]);

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = 100;
    const total = subTotal + shipping;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    };

    const [postOrder] = usePostOrderMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasiya yoxlamaları
        const newErrors = {};
        if (!formData.name) newErrors.name = "Ad daxil edilməlidir";
        if (!formData.surname) newErrors.surname = "Soyad daxil edilməlidir";
        if (!formData.email) newErrors.email = "Email daxil edilməlidir";
        if (!formData.phone) newErrors.phone = "Telefon nömrəsi daxil edilməlidir";
        if (!formData.address1)
            newErrors.address1 = "Ünvan (sətir 1) daxil edilməlidir";
        if (!formData.country)
            newErrors.country = "Ölkə/Region daxil edilməlidir";
        if (!formData.address2)
            newErrors.address2 = "Ünvan (sətir 2) daxil edilməlidir";
        if (!formData.city) newErrors.city = "Şəhər daxil edilməlidir";
        if (!formData.region) newErrors.region = "Region daxil edilməlidir";
        if (!formData.postCode)
            newErrors.postCode = "Post kodu daxil edilməlidir";
        // specialNote üçün validasiya etmək istəmirsinizsə, buranı əlavə etməyə bilərsiniz

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const jsonPayload = {
                uniqueCode,
                marketId,
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                phone: formData.phone,
                address1: formData.address1,
                country: formData.country,
                address2: formData.address2,
                city: formData.city,
                region: formData.region,
                postCode: formData.postCode,
                specialNote: formData.specialNote,
            };
            const response = await postOrder(jsonPayload).unwrap()
            if (response?.statusCode === 201) {
                toast.success('Sifariş uğurla tamamlandı!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    onClose: () => navigate('/')
                });
                basketRefetch();
            }
        }
    };

    return (
        <section id="marketCheckoutPage">
            {/* Üst Logo Alanı */}
            <div className="yuxari">
                <img src={image1} alt="Logo"/>
            </div>

            <div className="section">
                <div className="row">
                    {/* SOL KISIM: Əlaqə və Çatdırılma Məlumatları */}
                    <div className="box1 col-6">
                        <form className="container2 left-container" onSubmit={handleSubmit}>
                            <h3>CONTACT</h3>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <span className="error">{errors.email}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                                {errors.phone && (
                                    <span className="error">{errors.phone}</span>
                                )}
                            </div>

                            <h3>DELIVERY</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country/Region"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                    />
                                    {errors.country && (
                                        <span className="error">{errors.country}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="First Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && (
                                        <span className="error">{errors.name}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Last Name"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                    />
                                    {errors.surname && (
                                        <span className="error">{errors.surname}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="address1"
                                    placeholder="Address line 1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                />
                                {errors.address1 && (
                                    <span className="error">{errors.address1}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="address2"
                                    placeholder="Address line 2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                />
                                {errors.address2 && (
                                    <span className="error">{errors.address2}</span>
                                )}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                    {errors.city && (
                                        <span className="error">{errors.city}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="region"
                                        placeholder="Region"
                                        value={formData.region}
                                        onChange={handleInputChange}
                                    />
                                    {errors.region && (
                                        <span className="error">{errors.region}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="postCode"
                                        placeholder="Post Code"
                                        value={formData.postCode}
                                        onChange={handleInputChange}
                                    />
                                    {errors.postCode && (
                                        <span className="error">{errors.postCode}</span>
                                    )}
                                </div>
                                <div className="form-group">
                  <textarea
                      name="specialNote"
                      placeholder="Special Note"
                      value={formData.specialNote}
                      onChange={handleInputChange}
                      rows="1"
                  />
                                </div>
                            </div>

                            <button type="submit" className="pay-now-btn">
                                PAY NOW
                            </button>
                        </form>
                    </div>

                    {/* SAĞ KISIM: Sepet Özeti */}
                    <div className="box2 col-6">
                        <div className="container2 right-container">
                            <h2>Shopping cart</h2>
                            <div className="cart-items">
                                {cartItems.map((item, index) => {
                                    const product = item.product;
                                    return (
                                        <div key={index} className="cart-item">
                                            <div className="product-block">
                                                <div className="product-image">
                                                    <img
                                                        src={PRODUCT_LOGO + product.imageNames[0]}
                                                        alt={product.title}
                                                    />
                                                </div>
                                                <div className="product-info">
                                                    <h4>{product.title}</h4>
                                                    {item.basketItemOptions &&
                                                        item.basketItemOptions.map((opt) => (
                                                            <p key={opt.productOptionId}>
                                                                {opt.productOptionName}: {opt.optionValue}
                                                            </p>
                                                        ))}
                                                    <p>Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="product-price">
                                                    <p>${item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

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
            <ToastContainer/>
        </section>
    );
}

export default MarketCheckoutPage;
