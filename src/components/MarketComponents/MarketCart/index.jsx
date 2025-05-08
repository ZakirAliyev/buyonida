import { useTranslation } from "react-i18next";
import "./index.scss";
import { useEffect, useState, useCallback } from "react";
import { FaRegTrashAlt, FaShoppingBag } from "react-icons/fa";
import {FaManatSign, FaX} from "react-icons/fa6";
import Fingerprint from "../../Fingerprint/index.jsx";
import { useDeleteBasketItemMutation, useGetBasketGetOrCreateQuery, useGetStoreByNameQuery, useGetStoreWithSectionsQuery, usePostAddProductMutation, usePostBasketCheckoutMutation } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_LOGO } from "../../../../constants.js";
import { toast } from "react-toastify";
const MarketCart = ({
  isOpen,
  onClose,
  basketItems: initialBasketItems
}) => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const marketName = params?.marketName?.substring(1);
  const {
    data: storeData
  } = useGetStoreByNameQuery(marketName, {
    skip: !marketName
  });
  const store = storeData?.data;
  const marketId = store?.id;
  const uniqueCode = Cookies.get("uniqueCode");

  // Fetch store sections and palette
  const {
    data: getStoreWithSections,
    isLoading: isSectionsLoading,
    isError: isSectionsError
  } = useGetStoreWithSectionsQuery(marketId, {
    skip: !marketId
  });

  // Extract selected palette
  const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
  const selectedPalette = getStoreWithSections?.data?.palets?.find(palette => palette.id === selectedPaletId) || {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonBgColor: "#000000",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#ffffff"
  }; // Fallback palette

  // Fetch basket data
  const {
    data: basketData,
    refetch,
    isLoading: isBasketLoading,
    error: basketError,
    isUninitialized: isBasketUninitialized
  } = useGetBasketGetOrCreateQuery({
    uniqueCode,
    marketId
  }, {
    skip: !uniqueCode || !marketId
  });
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

  // Refetch basket data when cart opens
  useEffect(() => {
    if (isOpen && !isBasketUninitialized && uniqueCode && marketId) {
      refetch();
    }
  }, [isOpen, refetch, isBasketUninitialized, uniqueCode, marketId]);

  // Disable body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  // Calculate subtotal
  const subtotal = localBasketItems.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);

  // Update item quantity
  const updateQuantity = useCallback(async (item, change) => {
    if (item.quantity === 1 && change < 0) return;
    setLocalBasketItems(prevItems => prevItems.map(it => it.id === item.id ? {
      ...it,
      quantity: it.quantity + change
    } : it));
    try {
      await postAddProduct({
        uniqueCode,
        productId: item.productId,
        quantity: change,
        marketId,
        selectedOptions: item.basketItemOptions ? item.basketItemOptions.map(option => ({
          productOptionId: option.productOptionId,
          optionValueId: option.optionValueId
        })) : []
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity!", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      refetch();
    }
  }, [postAddProduct, uniqueCode, marketId, refetch]);

  // Remove item from basket
  const handleRemoveItem = useCallback(async item => {
    setLocalBasketItems(prevItems => prevItems.filter(it => it.id !== item.id));
    try {
      await deleteBasketItem({
        basketItemId: item.id,
        marketId,
        uniqueCode
      }).unwrap();
      toast.success("Item removed from cart!", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      refetch();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item!", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      refetch();
    }
  }, [deleteBasketItem, marketId, uniqueCode, refetch]);

  // Handle checkout
  const handleYasinCheckPut = useCallback(async marketId => {
    if (!uniqueCode || !marketId) {
      toast.error("Invalid session or market. Please try again.", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      return;
    }
    try {
      await postBasketCheckout({
        uniqueCode,
        marketId
      }).unwrap();
      navigate(`/@${marketName}/checkout/${marketId}`);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
    }
  }, [postBasketCheckout, uniqueCode, marketId, navigate]);
  if (isSectionsError || basketError) {
    return <p>{t("error_loading_cart_please_try_again_later")}</p>;
  }
  return <section id="marketCart">
            <div className={`cart-sidebar ${isOpen ? "open" : ""}`} style={{
      backgroundColor: selectedPalette.backgroundColor,
      color: selectedPalette.textColor
    }}>
                <div className="cart-header">
                    <h2 className="cart-title">
                        <FaX style={{
            visibility: "hidden"
          }} />{t("your_shopping_bag")}<FaX style={{
            fontSize: "12px"
          }} onClick={onClose} />
                    </h2>
                    <Fingerprint />
                </div>
                <div className="cart-items">
                    {localBasketItems.length > 0 ? localBasketItems.map(item => <div className="cart-item" key={item.id}>
                                <img src={`${PRODUCT_LOGO}${item.product?.imageNames?.[0] || ""}`} alt={item.product?.title || "Product Image"} className="cart-item-image" onError={e => e.target.src = "/fallback-image.png"} />
                                <div className="cart-item-info">
                                    <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
                                        <h3>{item.product?.title || "Unknown Product"}</h3>
                                        <button className="delete-btn" onClick={() => handleRemoveItem(item)} style={{
                color: selectedPalette.textColor
              }}>
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                    {item.basketItemOptions?.length > 0 ? item.basketItemOptions.map((option, idx) => <p key={idx}>
                                                {option.productOptionName}: {option.optionValue}
                                            </p>) : <p>{t("no_options_selected")}</p>}
                                    <div className="cart-item-footer">
                                        <span className="price"><FaManatSign style={{
                                          marginBottom: '5px',
                                          marginRight: '5px'
                                        }}/>{(item.price || 0).toFixed(2)}</span>
                                        <div className="quantity">
                                            <span style={{
                  fontSize: "14px",
                  marginRight: "10px"
                }}>{t("quantity")}</span>
                                            <div className="btnWrapper">
                                                <button onClick={() => updateQuantity(item, -1)} style={{
                    backgroundColor: selectedPalette.buttonBgColor,
                    color: selectedPalette.buttonTextColor,
                    borderColor: selectedPalette.buttonBorderColor
                  }}>+</button>
                                                <input type="text" value={item.quantity || 0} readOnly />
                                                <button onClick={() => updateQuantity(item, 1)} style={{
                    backgroundColor: selectedPalette.buttonBgColor,
                    color: selectedPalette.buttonTextColor,
                    borderColor: selectedPalette.buttonBorderColor
                  }}>-</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>) : <p>{t("your_shopping_bag_is_empty")}</p>}
                </div>
                <div className="cart-footer">
                    <div className="cart-summary">
                        <div className="cart-summary-row">
                            <span>{t("sub_total")}</span>
                            <span>{t("")}{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-summary-row">
                            <span>{t("estimated_shipping")}</span>
                            <span>{t("0_00")}</span>
                        </div>
                        <div className="cart-summary-row total">
                            <span>{t("total")}</span>
                            <span>{t("")}{subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="checkout-btn" onClick={() => handleYasinCheckPut(marketId)} disabled={!marketId || localBasketItems.length === 0} style={{
          backgroundColor: selectedPalette.buttonBgColor,
          color: selectedPalette.buttonTextColor,
          borderColor: selectedPalette.buttonBorderColor
        }}>
                        <FaShoppingBag />{t("checkout_securely")}</button>
                </div>
            </div>
        </section>;
};
export default MarketCart;