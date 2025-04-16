import './index.scss';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {FaBars, FaChevronDown, FaFacebook, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx';
import {Link, useNavigate, useParams} from 'react-router-dom';
import image1 from '/src/assets/sariLogo.png';
import {FaInstagram} from "react-icons/fa6";
import {MARKET_LOGO} from "../../../../constants.js";
import {
    useGetBasketGetOrCreateQuery,
    useGetStoreByNameQuery,
    useGetStoreWithSectionsQuery
} from "../../../service/userApi.js";
import Cookies from "js-cookie";

export default function MarketNavbarDrawer({logo,palet}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigate = (path) => {
        window.scrollTo(0, 0)
        navigate(path);
        setOpen(false);
    };
    const params = useParams();
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

    const DrawerList = (
        <>
            <div onClick={toggleDrawer(false)} className="asdasd123123">
                <RxCross2 className="asdasd123"/>
            </div>
            <Box sx={{width: 350}} role="presentation" id="burgerMenu">
                <div className="wrapper">
                    <img src={logo ? MARKET_LOGO + logo : ''} alt="Logo"/>
                    <div className="line"></div>

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
                    <div className="line"></div>
                    <Divider/>
                </div>
                <div className="links1">
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaInstagram/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaFacebook/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaLinkedin/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaTwitter/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaYoutube/></div>
                </div>
            </Box>
        </>
    );

    return (
        <div>
            <FaBars onClick={toggleDrawer(true)} style={{
                color: 'black'
            }}/>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}