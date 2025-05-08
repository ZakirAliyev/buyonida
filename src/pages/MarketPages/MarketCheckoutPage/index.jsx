import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import "./index.scss";
import image1 from "/src/assets/qaraLogo.png";
import {PRODUCT_LOGO} from "../../../../constants.js";
import {
    useGetBasketGetOrCreateQuery,
    useGetStoreWithSectionsQuery,
    usePostOrderMutation,
    usePostPaymentStartMutation
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {Helmet} from "react-helmet-async";

function MarketCheckoutPage() {
    const {
        t
    } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const marketId = params?.id;
    const uniqueCode = Cookies.get("uniqueCode");
    const [postPaymentStart] = usePostPaymentStartMutation()
    // Fetch basket data
    const {
        data: getBasketGetOrCreate,
        refetch: basketRefetch,
        isLoading: isBasketLoading,
        error: basketError
    } = useGetBasketGetOrCreateQuery({
        marketId,
        uniqueCode
    }, {
        skip: !marketId || !uniqueCode
    });
    const {
        data: getStoreWithSections,
        isLoading: isSectionsLoading,
        isError: isSectionsError
    } = useGetStoreWithSectionsQuery(marketId, {
        skip: !marketId
    });
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
        specialNote: ""
    });
    const [errors, setErrors] = useState({});

    // Sync cart items with basket data
    useEffect(() => {
        if (getBasketGetOrCreate?.data?.basketItems) {
            setCartItems(getBasketGetOrCreate.data.basketItems);
        }
        basketRefetch();
    }, [getBasketGetOrCreate, basketRefetch]);
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Matches image ($0 shipping)
    const total = subTotal + shipping;
    const handleInputChange = e => {
        const {
            name,
            value
        } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };
    const [postOrder] = usePostOrderMutation();
    const handleSubmit = async e => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!formData.name) newErrors.name = "First name is required";
        if (!formData.surname) newErrors.surname = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address1) newErrors.address1 = "Address line 1 is required";
        if (!formData.country) newErrors.country = "Country/Region is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.region) newErrors.region = "Region is required";
        if (!formData.postCode) newErrors.postCode = "Post code is required";
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
                specialNote: formData.specialNote
            };

            Cookies.set('redirectMarketName', params?.marketName)

            try {
                const orderResponse = await postOrder(jsonPayload).unwrap();
                if (orderResponse?.statusCode === 201) {
                    const orderId = orderResponse?.data?.id;
                    const paymentResponse = await postPaymentStart({ orderId }).unwrap();

                    if (paymentResponse?.statuscode === 200) {
                        basketRefetch();
                        window.location.href = paymentResponse?.data?.redirectUrl;
                    } else {
                        throw new Error("Payment initiation failed");
                    }
                } else {
                    throw new Error("Order creation failed");
                }
            } catch (error) {
                console.error("Error placing order:", error);
                toast.error("Failed to place order. Please try again.", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark"
                });
            }
        }
    };

    // Handle loading and error states
    if (isBasketLoading || isSectionsLoading) {
        return <p>{t("loading_checkout")}</p>;
    }
    if (basketError || isSectionsError) {
        return <p>{t("error_loading_checkout_please_try_again_later")}</p>;
    }
    return <section id="marketCheckoutPage">
        <Helmet>
            <title>{'Market Checkout Page'}</title>
            <link rel="icon" href={'/src/assets/favicon-32x32.png'}/>
        </Helmet>
        {/* Top Logo Section */}
        <div className="yuxari">
            <img src={image1} alt="Logo"/>
        </div>

        <div className="section">
            <div className="row">
                {/* Left Column: Contact and Delivery Form */}
                <div className="box1 col-6 col-md-12 col-sm-12 col-xs-12">
                    <form className="container2 left-container" onSubmit={handleSubmit}>
                        <h3>{t("contact")}</h3>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Email" value={formData.email}
                                   onChange={handleInputChange}/>
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <input type="tel" name="phone" placeholder="Phone number" value={formData.phone}
                                   onChange={handleInputChange}/>
                            {errors.phone && <span className="error">{errors.phone}</span>}
                        </div>

                        <h3>{t("delivery")}</h3>
                        <div className="form-group">
                            <select name="country" value={formData.country} onChange={handleInputChange}>
                                <option value="" disabled>{t("country_region")}</option>
                                <option value="Azerbaijan">{t("azerbaijan")}</option>
                                {/* Add more countries as needed */}
                            </select>
                            {errors.country && <span className="error">{errors.country}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="name" placeholder="First Name" value={formData.name}
                                       onChange={handleInputChange}/>
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" name="surname" placeholder="Last Name" value={formData.surname}
                                       onChange={handleInputChange}/>
                                {errors.surname && <span className="error">{errors.surname}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" name="address1" placeholder="Address line 1" value={formData.address1}
                                   onChange={handleInputChange}/>
                            {errors.address1 && <span className="error">{errors.address1}</span>}
                        </div>
                        <div className="form-group">
                            <input type="text" name="address2" placeholder="Address line 2" value={formData.address2}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" name="city" placeholder="City" value={formData.city}
                                       onChange={handleInputChange}/>
                                {errors.city && <span className="error">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <select name="region" value={formData.region} onChange={handleInputChange}>
                                    <option value="" disabled>{t("region")}</option>
                                    <option value="Baku">{t("baku")}</option>
                                    {/* Add more regions as needed */}
                                </select>
                                {errors.region && <span className="error">{errors.region}</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" name="postCode" placeholder="Zip Code" value={formData.postCode}
                                       onChange={handleInputChange}/>
                                {errors.postCode && <span className="error">{errors.postCode}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea name="specialNote" placeholder="Special Note (optional)"
                                      value={formData.specialNote} onChange={handleInputChange} rows="4"/>
                        </div>

                        <button type="submit" className="pay-now-btn">{t("pay_now")}</button>
                    </form>
                </div>

                {/* Right Column: Cart Summary */}
                <div className="box2 col-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="container2 right-container">
                        {cartItems.map((item, index) => {
                            const product = item.product;
                            return <div key={index} className="cart-item">
                                <div className="product-block">
                                    <div className="product-image">
                                        <img src={PRODUCT_LOGO + product.imageNames[0]} alt={product.title}
                                             onError={e => e.target.src = "/fallback-image.png"}/>
                                    </div>
                                    <div className="product-info">
                                        <h4>{product.title}</h4>
                                        {item.basketItemOptions && item.basketItemOptions.map(opt => <p
                                            key={opt.productOptionId}>
                                            {opt.productOptionName}{t("")}{opt.optionValue}
                                        </p>)}
                                    </div>
                                    <div className="product-price">
                                        <p>{t("")}{item.price}</p>
                                    </div>
                                </div>
                            </div>;
                        })}

                        <div className="totals">
                            <div className="line-item">
                                <span>{t("sub_total")}</span>
                                <span>{t("")}{subTotal.toFixed(2)}</span>
                            </div>
                            <div className="line-item">
                                <span>{t("shipping")}</span>
                                <span>{t("")}{shipping.toFixed(2)}</span>
                            </div>
                            <div className="line-item total">
                                <span>{t("total")}</span>
                                <span>{t("")}{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </section>;
}

export default MarketCheckoutPage;