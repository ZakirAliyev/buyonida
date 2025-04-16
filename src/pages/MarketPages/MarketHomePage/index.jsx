import './index.scss';
import MarketSwiperHero from '../../../components/MarketComponents/MarketSwiperHero/index.jsx';
import MarketCard from '../../../components/MarketComponents/MarketCard/index.jsx';
import MarketTitle from '../../../components/MarketComponents/MarketTitle/index.jsx';
import {
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
} from '../../../service/userApi.js';
import { useLocation } from 'react-router';

/* Swiper Kütüphanesi importları */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Temel stiller, gerekirse "swiper/css/navigation" vs. ekleyin

function MarketHomePage() {
    const location = useLocation();
    const cleanedPath = location.pathname
        .replace(/\//g, '')
        .replace(/%20/g, ' ')
        .replace(/@/, '');
    const { data: getStoreByName } = useGetStoreByNameQuery(cleanedPath);
    const store = getStoreByName?.data;
    console.log(store);
    const id = store?.id;
    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(id);
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);

    // Fake data for default sections
    const defaultCategory = {
        id: 'default-category',
        name: 'Featured Products',
        products: [
            {
                id: 'p1',
                title: 'Transparent-Back Shirt',
                price: 29.99,
                imageNames:
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
            },
            {
                id: 'p2',
                title: 'Casual Sneakers',
                price: 59.99,
                imageNames:
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            },
            {
                id: 'p3',
                title: 'Slim-Fit Pants',
                price: 39.99,
                imageNames:
                    'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300&h=300&fit=crop',
            },
            {
                id: 'p4',
                title: 'Mesh-Back Top',
                price: 34.99,
                imageNames:
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&h=300&fit=crop',
            },
        ],
    };

    const defaultCollection = {
        id: 'default-collection',
        title: 'New Arrivals',
        products: [
            {
                id: 'c1',
                title: 'See-Through Blouse',
                price: 25.99,
                imageNames:
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop',
            },
            {
                id: 'c2',
                title: 'Running Shoes',
                price: 49.99,
                imageNames:
                    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop',
            },
            {
                id: 'c3',
                title: 'Chino Pants',
                price: 45.99,
                imageNames:
                    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop',
            },
            {
                id: 'c4',
                title: 'Transparent-Panel Shirt',
                price: 32.99,
                imageNames:
                    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=300&fit=crop',
            },
        ],
    };

    const defaultSections = [
        {
            id: 'default-section-1',
            sectionType: 'Category',
            displayOrderId: 1,
            displayColumns: 4,
            category: defaultCategory,
        },
        {
            id: 'default-section-2',
            sectionType: 'Collection',
            displayOrderId: 2,
            displayColumns: 4,
            collection: defaultCollection,
        },
    ];

    // Use default sections if sections are empty, otherwise use sorted sections
    const sortedSections =
        sections.length > 0
            ? [...sections].sort((a, b) => a.displayOrderId - b.displayOrderId)
            : defaultSections;
    console.log(sortedSections);

    return (
        <>
            <section id="marketHomePage">
                <MarketSwiperHero id={id} />
                <div
                    className="section"
                    style={{
                        backgroundColor: palet?.[0]?.backgroundColor || '#ffffff',
                        color: palet?.[0]?.textColor || '#000000',
                    }}
                >
                    {sortedSections.map((section) => {
                        if (section.sectionType === 'Category' && section.category) {
                            return (
                                <div key={section.id}>
                                    <MarketTitle
                                        title={`${section.category.name} :`}
                                        categories={section.category}
                                        palet={palet}
                                    />

                                    {/* Desktop Grid */}
                                    <div className="desktop-grid">
                                        <div
                                            className="container"
                                            key={section.category.id}
                                        >
                                            <div className="row">
                                                {section.category.products?.map((product) => (
                                                    <MarketCard
                                                        number={section.displayColumns}
                                                        key={product.id}
                                                        product={product}
                                                        palet={palet}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Swiper */}
                                    <div className="mobile-swiper">
                                        <Swiper
                                            spaceBetween={10}
                                            slidesPerView={2.2}
                                        >
                                            {section.category.products?.map((product) => (
                                                <SwiperSlide key={product.id}>
                                                    <MarketCard
                                                        number={section.displayColumns}
                                                        product={product}
                                                        palet={palet}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            );
                        }
                        if (section.sectionType === 'Collection' && section.collection) {
                            return (
                                <div key={section.id}>
                                    <MarketTitle
                                        title={`${section.collection.title} :`}
                                        collections={section.collection}
                                        palet={palet}
                                    />

                                    <div className="desktop-grid">
                                        <div
                                            className="container"
                                            key={section.collection.id}
                                        >
                                            <div className="row">
                                                {section.collection.products?.map((product) => (
                                                    <MarketCard
                                                        number={section.displayColumns}
                                                        key={product.id}
                                                        product={product}
                                                        palet={palet}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Swiper */}
                                    <div className="mobile-swiper">
                                        <Swiper
                                            spaceBetween={10}
                                            slidesPerView={2.2}
                                        >
                                            {section.collection.products?.map((product) => (
                                                <SwiperSlide key={product.id}>
                                                    <MarketCard
                                                        number={section.displayColumns}
                                                        product={product}
                                                        palet={palet}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </section>
        </>
    );
}

export default MarketHomePage;
