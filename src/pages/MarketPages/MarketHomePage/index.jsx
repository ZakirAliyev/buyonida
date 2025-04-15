import './index.scss';
import MarketSwiperHero from '../../../components/MarketComponents/MarketSwiperHero/index.jsx';
import MarketCard from '../../../components/MarketComponents/MarketCard/index.jsx';
import MarketTitle from '../../../components/MarketComponents/MarketTitle/index.jsx';
import {
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
} from '../../../service/userApi.js';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function MarketHomePage() {

    const location = useLocation();
    const cleanedPath = location.pathname
        .replace(/\//g, '')
        .replace(/%20/g, ' ')
        .replace(/@/g, '');

    const { data: getStoreByName } = useGetStoreByNameQuery(cleanedPath);
    const store = getStoreByName?.data;
    const id = Cookies.get('chooseMarket');
    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(id);
    const sections = getStoreWithSections?.data?.sections || [];
    const palets = getStoreWithSections?.data?.palets || [];
    const selectedPaletId = getStoreWithSections?.data?.selectedPaletId;
    const palet = palets?.filter((p) => p.id === selectedPaletId);

    // Sort sections by displayOrderId
    const sortedSections = [...sections].sort(
        (a, b) => a.displayOrderId - b.displayOrderId
    );

    return (
        <>
            <section id="marketHomePage">


                <MarketSwiperHero />
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
                                    <div className="container" key={section.category.id}>
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
                                    <div className="container" key={section.collection.id}>
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