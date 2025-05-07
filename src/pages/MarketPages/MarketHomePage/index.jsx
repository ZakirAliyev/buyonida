import { useTranslation } from "react-i18next";
import './index.scss';
import MarketSwiperHero from '../../../components/MarketComponents/MarketSwiperHero/index.jsx';
import MarketCard from '../../../components/MarketComponents/MarketCard/index.jsx';
import MarketTitle from '../../../components/MarketComponents/MarketTitle/index.jsx';
import { useGetStoreByNameQuery, useGetStoreWithSectionsQuery } from '../../../service/userApi.js';
import { useLocation } from 'react-router';

/* Swiper Kütüphanesi importları */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Helmet } from "react-helmet-async"; // Temel stiller, gerekirse "swiper/css/navigation" vs. ekleyin

function MarketHomePage() {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const cleanedPath = location.pathname.replace(/\//g, '').replace(/%20/g, ' ').replace(/@/, '');
  const {
    data: getStoreByName
  } = useGetStoreByNameQuery(cleanedPath);
  const store = getStoreByName?.data;
  const id = store?.id;
  const {
    data: getStoreWithSections
  } = useGetStoreWithSectionsQuery(id);
  const sections = getStoreWithSections?.data?.sections || [];
  const palets = getStoreWithSections?.data?.palets || [];
  const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
  const palet = palets?.filter(p => p.id === selectedPaletId);

  // Fake data for default sections
  const defaultCategory = {
    id: 'default-category',
    name: 'Featured Products',
    products: [{
      id: 'p1',
      title: 'Transparent-Back Shirt',
      price: 29.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'p2',
      title: 'Casual Sneakers',
      price: 59.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'p3',
      title: 'Slim-Fit Pants',
      price: 39.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'p4',
      title: 'Mesh-Back Top',
      price: 34.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }]
  };
  const defaultCollection = {
    id: 'default-collection',
    title: 'New Arrivals',
    products: [{
      id: 'c1',
      title: 'See-Through Blouse',
      price: 25.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'c2',
      title: 'Running Shoes',
      price: 49.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'c3',
      title: 'Chino Pants',
      price: 45.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }, {
      id: 'c4',
      title: 'Transparent-Panel Shirt',
      price: 32.99,
      imageNames: 'https://i.ibb.co/p6HWZzQs/Line-2.png'
    }]
  };
  const defaultSections = [{
    id: 'default-section-1',
    sectionType: 'Category',
    displayOrderId: 1,
    displayColumns: 4,
    category: defaultCategory
  }, {
    id: 'default-section-2',
    sectionType: 'Collection',
    displayOrderId: 2,
    displayColumns: 4,
    collection: defaultCollection
  }];

  // Check if there is at least one Category or Collection section
  const hasCategoryOrCollection = sections.some(section => section.sectionType === 'Category' || section.sectionType === 'Collection');

  // Use default sections only if there are no Category or Collection sections, otherwise use sorted sections
  const sortedSections = hasCategoryOrCollection ? [...sections].filter(section => section.sectionType === 'Category' || section.sectionType === 'Collection').sort((a, b) => a.displayOrderId - b.displayOrderId) : defaultSections;
  return <>
            <Helmet>
                <title>{'Market Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <section id="marketHomePage">
                <MarketSwiperHero id={id} />
                <div className="section" style={{
        backgroundColor: palet?.[0]?.backgroundColor || '#ffffff',
        color: palet?.[0]?.textColor || '#000000'
      }}>
                    {sortedSections.map(section => {
          if (section.sectionType === 'Category' && section.category) {
            return <div key={section.id}>
                                    <MarketTitle title={`${section.category.name} :`} categories={section.category} palet={palet} />

                                    {/* Desktop Grid */}
                                    <div className="desktop-grid">
                                        <div className="container" key={section.category.id}>
                                            <div className="row">
                                                {section.category.products?.map(product => <MarketCard number={section.displayColumns} key={product.id} product={product} palet={palet} />)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Swiper */}
                                    <div className="mobile-swiper">
                                        <Swiper spaceBetween={10} slidesPerView={2.2}>
                                            {section.category.products?.map(product => <SwiperSlide key={product.id}>
                                                    <MarketCard number={section.displayColumns} product={product} palet={palet} />
                                                </SwiperSlide>)}
                                        </Swiper>
                                    </div>
                                </div>;
          }
          if (section.sectionType === 'Collection' && section.collection) {
            return <div key={section.id}>
                                    <MarketTitle title={`${section.collection.title} :`} collections={section.collection} palet={palet} />

                                    <div className="desktop-grid">
                                        <div className="container" key={section.collection.id}>
                                            <div className="row">
                                                {section.collection.products?.map(product => <MarketCard number={section.displayColumns} key={product.id} product={product} palet={palet} />)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Swiper */}
                                    <div className="mobile-swiper">
                                        <Swiper spaceBetween={10} slidesPerView={2.2}>
                                            {section.collection.products?.map(product => <SwiperSlide key={product.id}>
                                                    <MarketCard number={section.displayColumns} product={product} palet={palet} />
                                                </SwiperSlide>)}
                                        </Swiper>
                                    </div>
                                </div>;
          }
          return null;
        })}
                </div>
            </section>
        </>;
}
export default MarketHomePage;