import './index.scss';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaShoppingBag, FaTimes, FaBars, FaChevronDown } from 'react-icons/fa';
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

    // Extract categories and collections
    const categories = sections
        .filter((section) => section.sectionType === 'Category')
        .map((section) => section.category)
        .filter(Boolean);
    const collections = sections
        .filter((section) => section.sectionType === 'Collection')
        .map((section) => section.collection)
        .filter(Boolean);

    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const uniqueCode = Cookies.get('uniqueCode');
    const { data: basketData, refetch } = useGetBasketGetOrCreateQuery(
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
        setIsCategoriesOpen(false); // Close dropdowns when toggling menu
        setIsCollectionsOpen(false);
    };

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
        setIsCollectionsOpen(false); // Close other dropdown
    };

    const toggleCollections = () => {
        setIsCollectionsOpen(!isCollectionsOpen);
        setIsCategoriesOpen(false); // Close other dropdown
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

                    <div className={`links ${isMenuOpen ? 'active' : ''}`}>
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
                                                color: palet?.[0]?.navbarTextColor || '#000000',
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
                                            color: palet?.[0]?.navbarTextColor || '#000000',
                                        }}
                                    >
                                        No Categories
                                    </div>
                                )}
                            </div>
                        </div>
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
                                                color: palet?.[0]?.navbarTextColor || '#000000',
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
                                            color: palet?.[0]?.navbarTextColor || '#000000',
                                        }}
                                    >
                                        No Collections
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            to={`/${params.marketName}/about`}
                            className="link"
                            style={{
                                color: palet?.[0]?.navbarTextColor || '#000000',
                            }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            ABOUT US
                        </Link>
                    </div>

                    <div className="search">
                        <input placeholder="Search" />
                        <div>
                            <FaShoppingBag
                                className="icon"
                                onClick={handleOpenCart}
                                style={{
                                    color: palet?.[0]?.navbarTextColor || '#000000',
                                }}
                            />
                            {basketItems.length > 0 && (
                                <sup style={{ color: 'black' }}>
                                    {basketItems.reduce((total, item) => total + (item.quantity || 0), 0)}
                                </sup>
                            )}
                        </div>
                        <FaBars className="burger-icon" onClick={toggleMenu} />
                    </div>
                </nav>
            </div>
            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}
            <MarketCart basketItems={basketItems} isOpen={isOpen} onClose={handleCloseCart} />
        </section>
    );
}

export default MarketNavbar;