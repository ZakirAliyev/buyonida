import './index.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    FaShoppingBag,
    FaTimes,
    FaChevronDown,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaSearch,
} from 'react-icons/fa';

import MarketNavbarDrawer from '../MarketNavbarDrawer';
import MarketCart from '../MarketCart';
import {
    useGetAllCategoriesByMarketIdQuery, useGetAllCollectionsByMarketIdQuery,
    useGetBasketGetOrCreateQuery,
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery,
} from '../../../service/userApi.js';
import { MARKET_LOGO } from '../../../../constants.js';
import Cookies from 'js-cookie';

function MarketNavbar({ palet }) {
    const params = useParams();
    const navigate = useNavigate();
    const name = params?.marketName?.substring(1) || '';

    const { data: getStoreByName } = useGetStoreByNameQuery(name || 'Zakir magaza');
    const store = getStoreByName?.data;
    const marketId = store?.id;

    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(marketId, { skip: !marketId });
    const sections = getStoreWithSections?.data?.sections || [];

    const {data: getAllCategoriesByMarketId} = useGetAllCategoriesByMarketIdQuery(marketId);
    const categ = getAllCategoriesByMarketId?.data

    const {data: getAllCollectionsByMarketId} = useGetAllCollectionsByMarketIdQuery(marketId);
    const colle = getAllCollectionsByMarketId?.data

    // Categories and collections
    const categories = sections
        .filter((section) => section.sectionType === 'Category')
        .map((section) => section.category)
        .filter(Boolean);
    const collections = sections
        .filter((section) => section.sectionType === 'Collection')
        .map((section) => section.collection)
        .filter(Boolean);

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Refs for outside click
    const categoriesRef = useRef(null);
    const collectionsRef = useRef(null);
    const searchRef = useRef(null);

    // Close dropdowns and search on outside click
    useEffect(() => {
        function handleOutsideClick(e) {
            console.log('Outside click detected');
            if (
                isCategoriesOpen &&
                categoriesRef.current &&
                !categoriesRef.current.contains(e.target)
            ) {
                console.log('Closing categories');
                setIsCategoriesOpen(false);
            }
            if (
                isCollectionsOpen &&
                collectionsRef.current &&
                !collectionsRef.current.contains(e.target)
            ) {
                console.log('Closing collections');
                setIsCollectionsOpen(false);
            }
            if (
                isSearchOpen &&
                searchRef.current &&
                !searchRef.current.contains(e.target)
            ) {
                console.log('Closing search sidebar');
                setIsSearchOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            console.log('Removing outside click listener');
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isCategoriesOpen, isCollectionsOpen, isSearchOpen]);

    // Basket
    const uniqueCode = Cookies.get('uniqueCode');
    const { data: basketData } = useGetBasketGetOrCreateQuery(
        { marketId, uniqueCode },
        { skip: !marketId || !uniqueCode }
    );
    const basketItems = basketData?.data?.basketItems || [];

    // Handlers
    const handleOpenCart = () => {
        console.log('Opening cart');
        setIsOpen(true);
    };
    const handleCloseCart = () => {
        console.log('Closing cart');
        setIsOpen(false);
    };
    const toggleMenu = () => {
        console.log('Toggling menu:', !isMenuOpen);
        setIsMenuOpen((open) => !open);
        setIsCategoriesOpen(false);
        setIsCollectionsOpen(false);
        setIsSearchOpen(false);
    };
    const toggleCategories = () => {
        console.log('Toggling categories:', !isCategoriesOpen);
        setIsCategoriesOpen((open) => !open);
        setIsCollectionsOpen(false);
        setIsSearchOpen(false);
    };
    const toggleCollections = () => {
        console.log('Toggling collections:', !isCollectionsOpen);
        setIsCollectionsOpen((open) => !open);
        setIsCategoriesOpen(false);
        setIsSearchOpen(false);
    };
    const toggleSearch = () => {
        console.log('Toggling search:', !isSearchOpen);
        setIsSearchOpen((open) => !open);
        setIsCategoriesOpen(false);
        setIsCollectionsOpen(false);
        setIsMenuOpen(false);
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
                    {/* Logo */}
                    <div className="logo" onClick={() => navigate(`/${params?.marketName || ''}`)}>
                        <img
                            style={{ width: `${store?.logoWidth}px` }}
                            src={store?.logoImageName ? MARKET_LOGO + store?.logoImageName : ''}
                            alt="Logo"
                        />
                    </div>

                    {/* Links / dropdowns / social icons */}
                    <div
                        className={`links ${isMenuOpen ? 'active' : ''}`}
                        style={{
                            backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                            color: palet?.[0]?.navbarTextColor || '#000000',
                        }}
                    >
                        <FaTimes className="close-icon" onClick={toggleMenu} />

                        <div className="dropdown" ref={categoriesRef}>
                            <div
                                className="link dropdown-toggle"
                                onClick={toggleCategories}
                                style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
                            >
                                CATEGORIES <FaChevronDown className="chevron" />
                            </div>
                            <div
                                className={`dropdown-menu ${isCategoriesOpen ? 'show' : ''}`}
                                style={{
                                    backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                                    borderColor: palet?.[0]?.buttonBorderColor || '#ffffff',
                                    maxHeight: '180px',
                                    overflowY: 'auto',
                                }}
                            >
                                {categ?.length > 0 ? (
                                    categ?.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/${params?.marketName}/category/${category.id}`}
                                            className="dropdown-item"
                                            style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
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
                                        style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
                                    >
                                        No Categories
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="dropdown" ref={collectionsRef}>
                            <div
                                className="link dropdown-toggle"
                                onClick={toggleCollections}
                                style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
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
                                {colle?.length > 0 ? (
                                    colle?.map((collection) => (
                                        <Link
                                            key={collection.id}
                                            to={`/${params?.marketName}/collection/${collection.id}`}
                                            className="dropdown-item"
                                            style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
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
                                        style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
                                    >
                                        No Collections
                                    </div>
                                )}
                            </div>
                        </div>

                        <Link
                            to={`/${params.marketName}/about`}
                            className="link"
                            style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
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

                    <div className="search">
                        <div className="desktop-search">
                            <input placeholder="Search" />
                        </div>
                        <div className="mobile-search-icon" onClick={toggleSearch}>
                            <FaSearch
                                className="icon"
                                style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <FaShoppingBag
                                className="icon"
                                onClick={handleOpenCart}
                                style={{ color: palet?.[0]?.navbarTextColor || '#000000' }}
                            />
                            <div
                                style={{
                                    backgroundColor: 'red',
                                    width: '15px',
                                    height: '15px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '50%',
                                    fontSize: '10px',
                                    color: 'white',
                                    position: 'relative',
                                    left: '-5px',
                                }}
                            >
                                {basketItems.length}
                            </div>
                        </div>

                        <div className="mobile-only">
                            <MarketNavbarDrawer
                                palet={palet}
                                logo={store?.logoImageName}
                                toggleMenu={toggleMenu}
                            />
                        </div>
                    </div>

                    {/* Mobile Search Sidebar */}
                    <div
                        className={`mobile-search-sidebar ${isSearchOpen ? 'active' : ''}`}
                        ref={searchRef}
                        style={{
                            backgroundColor: palet?.[0]?.navbarBgColor || '#ffffff',
                            color: palet?.[0]?.navbarTextColor || '#000000',
                        }}
                    >
                        <div className="mobile-search-header">
                            <h3>Search</h3>
                            <FaTimes className="close-icon" onClick={toggleSearch} />
                        </div>
                        <input placeholder="Search products..." />
                    </div>
                </nav>
            </div>

            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}
            {isSearchOpen && <div className="search-overlay" onClick={toggleSearch}></div>}
            <MarketCart
                palet={palet}
                basketItems={basketItems}
                isOpen={isOpen}
                onClose={handleCloseCart}
            />
        </section>
    );
}

export default MarketNavbar;