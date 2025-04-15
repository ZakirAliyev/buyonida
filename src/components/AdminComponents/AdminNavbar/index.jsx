import './index.scss';
import { FaRegBell } from "react-icons/fa";
import image1 from "/src/assets/sariLogo.png";
import { IoStorefrontOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { FiLogOut } from "react-icons/fi";
import {
    useGetAllCategoriesByMarketIdQuery,
    useGetAllCollectionsByMarketIdQuery,
    useGetAllProductsByMarketIdQuery,
    useGetStoreByIdQuery,
    useGetUserQuery
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { MARKET_LOGO } from "../../../../constants.js";

function AdminNavbar() {
    const [layerOpen, setLayerOpen] = useState(false); // Profil açılır menüsü için
    const [isSuggestionOpen, setSuggestionOpen] = useState(false); // Arama öneri barı için
    const layerRef = useRef(null);
    const inputWrapperRef = useRef(null);

    const { data: getAllProducts } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProducts?.data || [];

    const { data: getAllCategories } = useGetAllCategoriesByMarketIdQuery(Cookies.get('chooseMarket'));
    const categories = getAllCategories?.data || [];

    const { data: getAllCollections } = useGetAllCollectionsByMarketIdQuery(Cookies.get('chooseMarket'));
    const collections = getAllCollections?.data || [];

    const staticSuggestions = [
        "Home", "Orders", "Products", "Categories", "Collections",
        "Analytics", "Discounts", "Customize", "Store", "Settings"
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Input alanı ve öneri barı dışındaki tıklamalarda öneriyi kapatma
    const handleInputWrapperClickOutside = (event) => {
        if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target)) {
            setSearchTerm("");
            setSuggestions([...staticSuggestions.slice(0, 6).map(item => ({ type: 'static', title: item }))]);
            setSuggestionOpen(false);
        }
    };

    // Profil menüsü dışındaki tıklamalarda menüyü kapatma
    const handleLayerClickOutside = (event) => {
        if (layerRef.current && !layerRef.current.contains(event.target)) {
            setLayerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleInputWrapperClickOutside);
        document.addEventListener("mousedown", handleLayerClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleInputWrapperClickOutside);
            document.removeEventListener("mousedown", handleLayerClickOutside);
        };
    }, []);

    useEffect(() => {
        // Combine static suggestions, products, categories, and collections
        const productSuggestions = products.map(product => ({
            type: 'product',
            id: product.id,
            title: product.title,
            displayTitle: `${product.title} - Product `
        }));
        const categorySuggestions = categories.map(category => ({
            type: 'category',
            id: category.id,
            title: category.name,
            displayTitle: `${category.name} - Category `
        }));
        const collectionSuggestions = collections.map(collection => ({
            type: 'collection',
            id: collection.id,
            title: collection.title,
            displayTitle: `${collection.title} - Collection`
        }));
        const staticSuggestionObjects = staticSuggestions.map(item => ({
            type: 'static',
            title: item,
            displayTitle: item
        }));
        const allSuggestions = [
            ...staticSuggestionObjects,
            ...productSuggestions,
            ...categorySuggestions,
            ...collectionSuggestions
        ];

        if (searchTerm.length > 0) {
            // Filter based on search term (filter on title, not displayTitle)
            const filtered = allSuggestions.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            // Show up to 6 static suggestions when search term is empty
            setSuggestions(staticSuggestionObjects.slice(0, 6));
        }
    }, [searchTerm, products, categories, collections]);

    const location = useLocation();
    const navigate = useNavigate();

    const { data: getStoreById } = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
    const store = getStoreById?.data;

    const { data: getStore } = useGetUserQuery();
    const user = getStore?.data;

    function handleLogOut() {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [name] = cookie.split('=').map(c => c.trim());
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }

    const handleSuggestionClick = (suggestion) => {
        const marketId = Cookies.get('chooseMarket');
        if (suggestion.type === 'product') {
            navigate(`/cp/edit-product/${marketId}/${suggestion.id}`);
        } else if (suggestion.type === 'category') {
            navigate(`/cp/edit-category/${marketId}/${suggestion.id}`);
        } else if (suggestion.type === 'collection') {
            navigate(`/cp/edit-collection/${marketId}/${suggestion.id}`);
        } else {
            navigate(`/cp/${suggestion.title.toLowerCase()}`);
        }
        setSearchTerm("");
        setSuggestions(staticSuggestions.map(item => ({ type: 'static', title: item, displayTitle: item })).slice(0, 6));
        setSuggestionOpen(false);
    };

    return (
        <section id={"adminNavbar"}>
            <div className={"imageWrapper"}>
                <img
                    src={image1}
                    alt={"Image"}
                    className={"first"}
                    onClick={() => {
                        navigate('/cp');
                    }}
                />
            </div>
            <div className={"inputWrapper"} ref={inputWrapperRef} style={{ position: "relative" }}>
                <input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => {
                        // Show static suggestions when input is focused and search term is empty
                        if (searchTerm === "") {
                            setSuggestions(staticSuggestions.map(item => ({ type: 'static', title: item, displayTitle: item })).slice(0, 6));
                        }
                        setSuggestionOpen(true);
                    }}
                />
                {isSuggestionOpen && suggestions.length > 0 && (
                    <ul className="suggestionList">
                        {suggestions.map((item, index) => (
                            <li
                                key={`${item.type}-${item.id || item.title}`}
                                onClick={() => handleSuggestionClick(item)}
                                style={{
                                    borderBottom: index < suggestions.length - 1 ? "1px solid #ccc" : "none",
                                }}
                            >
                                {item.displayTitle}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <FaRegBell className={"icon"} />
                <div className={"wrapper"} onClick={() => setLayerOpen(!layerOpen)} style={{
                    backgroundColor: layerOpen && '#FFBB00',
                    cursor: 'pointer',
                }}>
                    <div className={"profilePhoto"}>
                        <img src={MARKET_LOGO + store?.logoImageName} alt={"Image"} />
                    </div>
                    <p>{store?.name}</p>
                </div>
            </div>
            <div
                className={`layer ${layerOpen ? 'open' : 'close'}`}
                ref={layerRef}
                aria-hidden={!layerOpen}
            >
                {location?.pathname !== '/cp/manage-account' ? (
                    <>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <img src={MARKET_LOGO + store?.logoImageName} alt={"Image"} />
                                <span>{store?.name}</span>
                            </div>
                            <div className={"box"} onClick={() => {
                                navigate('/choose-market');
                            }}>
                                <IoStorefrontOutline className={"icon"} />
                                <span>All Stores</span>
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <span>Help Center</span>
                            </div>
                            <div className={"box"}>
                                <span>Tutorials</span>
                            </div>
                            <div className={"box"}>
                                <span>Get help to build</span>
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box box1"}>
                                <span>{user?.name} {user?.surname}</span>
                                <div className={"mail"}>{user?.email}</div>
                            </div>
                            <div className={"box"} onClick={() => {
                                navigate('/cp/manage-account');
                            }}>
                                <span>Manage account</span>
                            </div>
                            <div className={"box logOut"}>
                                <span onClick={handleLogOut}>Log out</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={"wrapper"}>
                            <div className={"box logOut"} style={{
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontWeight: '500' }}>Log out</span>
                                <FiLogOut style={{
                                    rotate: '180deg',
                                    fontWeight: '500'
                                }} />
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <span>Help Center</span>
                            </div>
                            <div className={"box"}>
                                <span>Tutorials</span>
                            </div>
                            <div className={"box"}>
                                <span>Get help to build</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default AdminNavbar;