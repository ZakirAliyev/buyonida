import { useTranslation } from "react-i18next";
import './index.scss';
import { FaChevronRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useGetAllProductsByMarketIdQuery, useGetCategoryByMarketIdQuery, useGetStoreByNameQuery, useGetStoreWithSectionsQuery } from '../../../service/userApi.js';
import { CATEGORY_LOGO } from '../../../../constants.js';
import MarketCard2 from '../../../components/MarketComponents/MarketCard2/index.jsx';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import 'swiper/css';
import { Helmet } from "react-helmet-async";
function MarketCategoryPage() {
  const {
    t
  } = useTranslation();
  const params = useParams();
  const isMobile = useMediaQuery({
    maxWidth: 576
  });
  const swiperRef = useRef(null);
  const marketName = params?.marketName.substring(1, params?.marketName.length);
  const {
    data: getStoreByName
  } = useGetStoreByNameQuery(marketName);
  const store = getStoreByName?.data;
  const marketId = store?.id;
  const id = params?.id;
  const {
    data: getCategoryByMarketId
  } = useGetCategoryByMarketIdQuery({
    marketId,
    id
  });
  const category = getCategoryByMarketId?.data;
  const {
    data: getAllProductsByMarketId
  } = useGetAllProductsByMarketIdQuery(store?.id);
  const products = getAllProductsByMarketId?.data;
  const {
    data: getStoreWithSections,
    isLoading: isSectionsLoading,
    isError: isSectionsError
  } = useGetStoreWithSectionsQuery(marketId, {
    skip: !id
  });
  const font = getStoreWithSections?.data?.fontName;
  const sections = getStoreWithSections?.data?.sections || [];
  const palets = getStoreWithSections?.data?.palets || [];
  const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
  const palet = palets?.filter(p => p.id === selectedPaletId);
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  return <section id={'marketCategoryPage'}>
            <Helmet>
                <title>{'Category Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className={'section'} style={{
      backgroundColor: palet?.[0]?.backgroundColor || '#ffffff',
      color: palet?.[0]?.textColor || '#000000'
    }}>
                <div className={'container'}>
                    <div className={'titleWrapper'}>
                        <img src={CATEGORY_LOGO + category?.imageName} alt={'Image'} />
                        <div className={'textWrapper'}>
                            <h2>{category?.name}</h2>
                            <h3>{t("a_short_description_about_product_you_will_see_product_details_and_good_sentences_in_here_because_i_want_like_that_because_i_want_like_that")}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="line"></div>
                        {category?.products && category.products.map((product, index) => <>
                                    <MarketCard2 number={5} product={product} palet={palet} marketName={marketName} key={product.id} />
                                    {(index + 1) % 5 === 0 && <div className="line"></div>}
                                </>)}
                        <div className="line"></div>
                    </div>
                    <div className={'lookOther'}>
                        <h4>{t("lets_look_to_other_products")}</h4>
                        {isMobile ? <div className="slider-wrapper">
                                <Swiper spaceBetween={20} slidesPerView={1} onSwiper={swiper => swiperRef.current = swiper} className="product-slider">
                                    {products && products.slice(0, 4).map(product => <SwiperSlide key={product.id}>
                                                <MarketCard2 number={1} product={product} palet={palet} marketName={marketName} />
                                            </SwiperSlide>)}
                                </Swiper>
                                <div className="swiper-button-prev" onClick={handlePrev}>
                                    <FaChevronRight className="icon box1" />
                                </div>
                                <div className="swiper-button-next" onClick={handleNext}>
                                    <FaChevronRight className="icon" />
                                </div>
                            </div> : <div className="product-grid">
                                {products && products.slice(0, 4).map(product => <MarketCard2 number={1} product={product} palet={palet} marketName={marketName} key={product.id} />)}
                            </div>}
                    </div>
                </div>
            </div>
        </section>;
}
export default MarketCategoryPage;