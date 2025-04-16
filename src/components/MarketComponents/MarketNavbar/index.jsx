// MarketNavbar.jsx
import './index.scss';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    FaShoppingBag,
    FaTimes,
    FaBars,
    FaChevronDown,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa';

import MarketCart from '../MarketCart';
import {
    useGetBasketGetOrCreateQuery,
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
} from '../../../service/userApi.js';
import { MARKET_LOGO } from '../../../../constants.js';
import Cookies from 'js-cookie';

function MarketNavbar({ palet }) {
    const params = useParams();
    const navigate = useNavigate();
    const name = params?.marketName?.substring(1, params.marketName.length);

    const { data: getStoreByName } = useGetStoreByNameQuery(name || 'Zakir magaza');
    const store = getStoreByName?.data;
    const marketId = store?.id;

    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(marketId, { skip: !marketId });
    const sections = getStoreWithSections?.data?.sections || [];

    // Kategorileri ve koleksiyonları al
    const categories = sections
        .filter((section) => section.sectionType === 'Category')
        .map((section) => section.category)
        .filter(Boolean);

    const collections = sections
        .filter((section) => section.sectionType === 'Collection')
        .map((section) => section.collection)
        .filter(Boolean);

    const [isOpen, setIsOpen] = useState(false); // Sepet aç/kapa
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobil menü aç/kapa
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

    const uniqueCode = Cookies.get('uniqueCode');
    const { data: basketData } = useGetBasketGetOrCreateQuery(
        { marketId, uniqueCode },
        { skip: !marketId || !uniqueCode }
    );
    const basket = basketData?.data;
    const basketItems = basket?.basketItems || [];

    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsCategoriesOpen(false); // Menü tekrar açılınca alt menüleri kapat
        setIsCollectionsOpen(false);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
        setIsCollectionsOpen(false); // Öteki alt menüyü kapat
    };

    const toggleCollections = () => {
        setIsCollectionsOpen(!isCollectionsOpen);
        setIsCategoriesOpen(false);
    };

    return (
        <section
            id="marketNavbar"
            style={{
                backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                color: palet?.[0]?.navbarTextColor || '#000000',
            }}
        >
            <div className="container">
                <nav>
                    {/* LOGO */}
                    <div
                        className="logo"
                        onClick={() => {
                            navigate(`/${params?.marketName || ''}`);
                        }}
                    >
                        <img
                            style={{ width: `${store?.logoWidth}px` }}
                            src={store?.logoImageName ? MARKET_LOGO + store.logoImageName : ''}
                            alt="Logo"
                        />
                    </div>

                    {/* LİNKLER / DROPDOWNLAR / SOSYAL İKONLAR */}
                    <div
                        className={`links ${isMenuOpen ? 'active' : ''}`}
                        style={{
                            backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                            color: palet?.[0]?.navbarTextColor || '#000000',
                        }}
                    >
                        <FaTimes className="close-icon" onClick={toggleMenu} />

                        <div className="dropdown">
                            <div
                                className="link dropdown-toggle"
                                onClick={toggleCategories}
                                style={{
                                    color: palet?.[0]?.navbarTextColor || '#000000',
                                }}
                            >
                                CATEGORIES <FaChevronDown className="chevron" />
                            </div>
                            <div
                                className={`dropdown-menu ${isCategoriesOpen ? 'show' : ''}`}
                                style={{
                                    backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                                    borderColor: palet?.[0]?.buttonBorderColor || '#ffffff',
                                }}
                            >
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/${params?.marketName}/category/${category.id}`}
                                            className="dropdown-item"
                                            style={{
                                                color: palet?.[0]?.navbarTextColor || '#ffffff',
                                            }}
                                            onClick={() => {
                                                setIsCategoriesOpen(false);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {category.name}
                                        </Link>
                                    ))
                                ) : (
                                    <div
                                        className="dropdown-item"
                                        style={{
                                            color: palet?.[0]?.navbarTextColor || '#ffffff',
                                        }}
                                    >
                                        No Categories
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLLECTIONS */}
                        <div className="dropdown">
                            <div
                                className="link dropdown-toggle"
                                onClick={toggleCollections}
                                style={{
                                    color: palet?.[0]?.navbarTextColor || '#000000',
                                }}
                            >
                                COLLECTIONS <FaChevronDown className="chevron" />
                            </div>
                            <div
                                className={`dropdown-menu ${isCollectionsOpen ? 'show' : ''}`}
                                style={{
                                    backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                                    borderColor: palet?.[0]?.buttonBorderColor || '#ffffff',
                                }}
                            >
                                {collections.length > 0 ? (
                                    collections.map((collection) => (
                                        <Link
                                            key={collection.id}
                                            to={`/${params?.marketName}/collection/${collection.id}`}
                                            className="dropdown-item"
                                            style={{
                                                color: palet?.[0]?.navbarTextColor || '#ffffff',
                                            }}
                                            onClick={() => {
                                                setIsCollectionsOpen(false);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            {collection.title}
                                        </Link>
                                    ))
                                ) : (
                                    <div
                                        className="dropdown-item"
                                        style={{
                                            color: palet?.[0]?.navbarTextColor || '#ffffff',
                                        }}
                                    >
                                        No Collections
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ABOUT US */}
                        <Link
                            to={`/${params.marketName}/about`}
                            className="link"
                            style={{
                                color: palet?.[0]?.navbarTextColor || '#ffffff',
                            }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ABOUT US
                        </Link>

                        <div className="social-icons">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <FaFacebookF />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* ARAMA, SEPET ve BURGER ICON */}
                    <div className="search">
                        <input placeholder="Search" />
                        <div>
                            <FaShoppingBag
                                className="icon"
                                onClick={handleOpenCart}
                                style={{
                                    color: palet?.[0]?.navbarTextColor || '#ffffff',
                                }}
                            />
                            {basketItems.length > 0 && (
                                <sup style={{ color: 'black' }}>
                                    {basketItems.reduce(
                                        (total, item) => total + (item.quantity || 0),
                                        0
                                    )}
                                </sup>
                            )}
                        </div>
                        <FaBars
                            className="burger-icon"
                            onClick={toggleMenu}
                            style={{
                                color: palet?.[0]?.navbarTextColor || '#000000',
                            }}
                        />
                    </div>
                </nav>
            </div>

            {/* SEPET OVERLAY */}
            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}

            {/* SEPET KOMPONENTİ */}
            <MarketCart basketItems={basketItems} isOpen={isOpen} onClose={handleCloseCart} />
        </section>
    );
}

export default MarketNavbar;
