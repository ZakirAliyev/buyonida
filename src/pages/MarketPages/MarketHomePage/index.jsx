import './index.scss';
import MarketNavbar from '../../../components/MarketComponents/MarketNavbar/index.jsx';
import MarketSwiperHero from '../../../components/MarketComponents/MarketSwiperHero/index.jsx';
import MarketCard from '../../../components/MarketComponents/MarketCard/index.jsx';
import MarketTitle from '../../../components/MarketComponents/MarketTitle/index.jsx';
import MarketFooter from '../../../components/MarketComponents/MarketFooter/index.jsx';
import {
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
} from '../../../service/userApi.js';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function MarketHomePage() {
    const [showStart, setShowStart] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 800);

        const timer2 = setTimeout(() => {
            setShowStart(false);
        }, 1800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

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
            {showStart ? (
                <>
                    <div className={`start-page ${fadeOut ? 'fade-out' : ''}`}>
                        <p>Loading ....</p>
                    </div>
                    <div style={{ display: 'none' }}>
                        <section id="marketHomePage">
                            <MarketNavbar palet={palet} />
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
                            <MarketFooter palet={palet} />
                        </section>
                    </div>
                </>
            ) : (
                <section id="marketHomePage">
                    <MarketNavbar palet={palet} />
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
                    <MarketFooter palet={palet} />
                </section>
            )}
        </>
    );
}

export default MarketHomePage;