import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllProductsByMarketIdQuery, useGetProductByIdQuery, useGetStoreByNameQuery, usePostAddProductMutation, useGetBasketGetOrCreateQuery, useGetStoreWithSectionsQuery, usePostBasketCheckoutMutation } from "../../../service/userApi.js";
import { PRODUCT_LOGO } from "../../../../constants.js";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import { HiOutlineArrowLongRight, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import MarketCard2 from "../../../components/MarketComponents/MarketCard2/index.jsx";
import MarketCard3 from "../../../components/MarketComponents/MarketCard3/index.jsx";
import { Helmet } from "react-helmet-async";
function MarketProductDetailsPage() {
  const {
    t
  } = useTranslation();
  // URL parametrelerini al
  const {
    marketName,
    id
  } = useParams();
  const decodedMarketName = decodeURIComponent(marketName);
  const cleanedMarketName = decodedMarketName.startsWith('@') ? decodedMarketName.split('/')[0].substring(1) : decodedMarketName.split('/')[0];
  const {
    data: getStoreByName,
    isLoading: isStoreLoading,
    error: storeError
  } = useGetStoreByNameQuery(cleanedMarketName);
  const store = getStoreByName?.data;
  const marketId = store?.id;
  const uniqueCode = Cookies.get("uniqueCode");
  const {
    data: getProductById,
    isLoading: isProductLoading
  } = useGetProductByIdQuery({
    marketId,
    id
  }, {
    skip: !marketId
  });
  const product = getProductById?.data;
  const {
    data: getAllProductsByMarketId,
    isLoading: isProductsLoading
  } = useGetAllProductsByMarketIdQuery(marketId, {
    skip: !marketId
  });
  const products = getAllProductsByMarketId?.data;

  // Sepeti oluştur ya da getir
  const {
    refetch: refetchBasket
  } = useGetBasketGetOrCreateQuery({
    marketId,
    uniqueCode
  }, {
    skip: !marketId || !uniqueCode
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [triggerBasket] = usePostAddProductMutation();

  // Masaüstü thumbnail slider için state
  const [thumbStartIndex, setThumbStartIndex] = useState(0);

  // Ana resmin gösterimi için state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ürünler kısmındaki mobil slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideCount = products ? products?.slice(0, 5).length : 0;

  // Otomatik ürün slider (Products you might like) timer
  useEffect(() => {
    if (slideCount === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideCount]);
  const {
    data: getStoreWithSections
  } = useGetStoreWithSectionsQuery(marketId, {});
  const palets = getStoreWithSections?.data?.palets || [];
  const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
  const palet = palets?.filter(p => p.id === selectedPaletId);
  // Variant seçimi
  const handleVariantChange = (optionName, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [optionName]: value
    }));
  };
  const handleImageChange = index => {
    setCurrentImageIndex(index);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? product?.imageNames?.length - 1 : prev - 1);
  };
  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % product?.imageNames?.length);
  };
  const handleAddToCart = async () => {
    if (!marketId || !product) return;
    if (product?.productOptions) {
      for (let option of product.productOptions) {
        if (!selectedVariants[option.name]) {
          toast.warning(`Zəhmət olmasa ${option.name} seçin`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          });
          return;
        }
      }
    }
    const selectedOptions = product?.productOptions.map(option => {
      const selectedValue = selectedVariants[option.name];
      const valueObj = option.values.find(val => val.value === selectedValue);
      return {
        productOptionId: option.id,
        optionValueId: valueObj?.id
      };
    });
    const payload = {
      uniqueCode: uniqueCode,
      productId: product.id,
      quantity: quantity,
      marketId: marketId,
      selectedOptions: selectedOptions
    };
    const response = await triggerBasket(payload).unwrap();
    if (response?.statusCode === 201) {
      toast.success("Məhsul səbətə əlavə edildi!", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setSelectedVariants({});
      setQuantity(1);
      refetchBasket();
    }
  };

  // Ürünler kısmındaki slider ok butonları
  const handlePrev = () => {
    setCurrentSlideIndex(prevIndex => prevIndex === 0 ? slideCount - 1 : prevIndex - 1);
  };
  const handleNext = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slideCount);
  };

  // --> Yeni: Thumbnail slider fonksiyonları (masaüstü)
  const visibleCount = 6;
  const totalThumbs = product?.imageNames?.length || 0;
  // Görüntülenen thumbnail listesi
  const visibleThumbs = product?.imageNames?.slice(thumbStartIndex, thumbStartIndex + visibleCount) || [];
  const handleThumbPrev = () => {
    setThumbStartIndex(prev => prev - visibleCount >= 0 ? prev - visibleCount : 0);
  };
  const handleThumbNext = () => {
    setThumbStartIndex(prev => prev + visibleCount < totalThumbs ? prev + visibleCount : prev);
  };
  const navigate = useNavigate();
  const [postBasketCheckout] = usePostBasketCheckoutMutation();
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
      navigate(`/checkout/${marketId}`);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
    }
  }, [postBasketCheckout, uniqueCode, marketId, navigate]);
  return <section id="marketProductDetailsPage" style={{
    backgroundColor: palet?.[0]?.backgroundColor || '#ffffff',
    color: palet?.[0]?.textColor || '#000000'
  }}>
            <Helmet>
                <title>{'Product Details Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-12 col-sm-12 col-xs-12">
                            {/* Masaüstü için Thumbnail Gallery */}
                            <div className="desktop-image-gallery">
                                {totalThumbs > 0 && <div className="thumbnail-container">
                                        {thumbStartIndex > 0 && <button className="thumb-nav prev" onClick={handleThumbPrev}>{t("")}</button>}
                                        {visibleThumbs.map((image, index) => {
                  // global index hesaplaması
                  const globalIndex = thumbStartIndex + index;
                  return <img key={globalIndex} src={PRODUCT_LOGO + image} alt="Thumbnail" className={currentImageIndex === globalIndex ? 'active' : ''} onClick={() => {
                    handleImageChange(globalIndex);
                  }} />;
                })}
                                        {thumbStartIndex + visibleCount < totalThumbs && <button className="thumb-nav next" onClick={handleThumbNext}>{t("")}</button>}
                                    </div>}
                                <div className="main-image-container">
                                    <img src={PRODUCT_LOGO + product?.imageNames?.[currentImageIndex]} alt="Main" className="main-image" />
                                </div>
                            </div>

                            {/* Mobil Image Carousel */}
                            <div className="mobile-image-carousel">
                                <div className="carousel-container">
                                    {product?.imageNames?.map((image, index) => <div key={index} className={`carousel-slide ${currentImageIndex === index ? 'active' : ''}`}>
                                            <img src={PRODUCT_LOGO + image} alt={`Product ${index + 1}`} />
                                        </div>)}
                                </div>
                                {totalThumbs > 1 && <>
                                        <button className="carousel-prev" onClick={handlePrevImage}>
                                            <HiOutlineArrowLeft />
                                        </button>
                                        <button className="carousel-next" onClick={handleNextImage}>
                                            <HiOutlineArrowRight />
                                        </button>
                                        <div className="carousel-indicators">
                                            {product.imageNames.map((_, index) => <span key={index} className={currentImageIndex === index ? 'active' : ''} onClick={() => handleImageChange(index)} />)}
                                        </div>
                                    </>}
                            </div>
                        </div>
                        <div className="col-6 col-md-12 col-sm-12 col-xs-12">
                            <h2>{product?.title}</h2>
                            <h3>
                                <span className="span1">{product?.price}{t("azn")}</span>
                                <span className="span2">{product?.comparePrice}{t("azn")}</span>
                            </h3>
                            <h4 dangerouslySetInnerHTML={{
              __html: product?.description
            }}></h4>
                            {product?.productOptions && product.productOptions.map((option, index) => <div key={index}>
                                        <h5>{option?.name}</h5>
                                        <div className="variantWrapper">
                                            {option?.values && option.values.map((opt, idx) => <button key={idx} className={selectedVariants[option.name] === opt.value ? "optVal active" : "optVal"} onClick={() => handleVariantChange(option.name, opt.value)}>
                                                        {opt.value}
                                                    </button>)}
                                        </div>
                                    </div>)}
                            <div className="allWrapper">
                                <div className="incDecWrapper">
                                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" readOnly />
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                                <button onClick={handleAddToCart}>{t("add_to_cart")}</button>
                            </div>
                            <button onClick={() => handleYasinCheckPut(marketId)}>{t("buy_it_now")}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products you might like section */}
            <div className="container" key={product?.id} style={{
      paddingBottom: 70
    }}>
                <div className="section-header">
                    <h1 style={{
          padding: "16px"
        }}>{t("products_you_might_like")}</h1>
                    <div className="desktop-button">
                        <button>{t("find_out_more")}<HiOutlineArrowLongRight className="icon" />
                        </button>
                    </div>
                </div>
                {/* Desktop grid view */}
                <div className="desktop-grid">
                    <div className="row">
                        {products && products?.slice(0, 5).map(prod => <MarketCard2 number={5} key={prod.id} product={prod} marketName={cleanedMarketName} />)}
                    </div>
                </div>
                {/* Mobile Swiper view with animated sliding */}
                <div className="mobile-swiper">
                    <div className="custom-swiper-buttons">
                        <button onClick={handlePrev} className="swiper-button-prev">
                            <HiOutlineArrowLeft size={24} />
                        </button>
                        <button onClick={handleNext} className="swiper-button-next">
                            <HiOutlineArrowRight size={24} />
                        </button>
                    </div>
                    <div className="custom-swiper">
                        <div className="custom-swiper-container" style={{
            transform: `translateX(-${currentSlideIndex * 100}%)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          }}>
                            {products && products?.slice(0, 5).map(prod => <div key={prod.id} className="custom-slide">
                                        <MarketCard3 number={1} product={prod} marketName={cleanedMarketName} />
                                    </div>)}
                        </div>
                        <div className="custom-swiper-pagination">
                            {products?.slice(0, 5).map((_, idx) => <span key={idx} className={currentSlideIndex === idx ? "active" : ""} onClick={() => setCurrentSlideIndex(idx)} />)}
                        </div>

                    </div>
                    <div className="mobile-button">
                        <button onClick={() => navigate('/')}>{t("find_out_more")}<HiOutlineArrowLongRight className="icon" />
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>;
}
export default MarketProductDetailsPage;