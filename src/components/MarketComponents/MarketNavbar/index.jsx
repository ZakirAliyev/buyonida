import './index.scss'
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaShoppingBag, FaTimes, FaBars} from "react-icons/fa";
import MarketCart from "../MarketCart";
import {useGetStoreByNameQuery} from "../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../constants.js";

function MarketNavbar({palet}) {
    const params = useParams();
    const navigate = useNavigate();
    const name = params?.marketName?.substring(1, params.marketName.length)
    const {data: getStoreByName} = useGetStoreByNameQuery('Zakir magaza')
    const store = getStoreByName?.data
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section id="marketNavbar" style={{backgroundColor:palet ? (`${palet[0]?.navbarBgColor}`) : ("#ffffff"),color:palet ? (`${palet[0]?.navbarTextColor}`) : ("#000000")}}>
            <div className="container">
                <nav>
                    <div
                        className="logo"
                        onClick={() => {
                            navigate(`/${params?.marketName || ""}`);
                        }}
                    >
                        <img
                            style={{width:`${store?.logoWidth}px`}}
                            src={MARKET_LOGO + store?.logoImageName}
                            alt="Logo"
                        />
                    </div>

                    <div className={`links ${isMenuOpen ? 'active' : ''}`}>
                        <FaTimes className="close-icon" onClick={toggleMenu} />
                        <Link className="link" style={{color:palet ? (`${palet[0]?.navbarTextColor}`) : ("#000000")}}>
                            CATEGORIES
                        </Link>
                        <Link className="link" style={{color:palet ? (`${palet[0]?.navbarTextColor}`) : ("#000000")}}>
                            COLLECTIONS
                        </Link>
                        <Link to={`/${params.marketName}/about`} className="link" style={{color:palet ? (`${palet[0]?.navbarTextColor}`) : ("#000000")}}>
                            ABOUT US
                        </Link>
                    </div>

                    <div className="search">
                        <input placeholder="Search"/>
                        <FaShoppingBag className="icon" onClick={handleOpenCart} style={{color:palet ? (`${palet[0]?.navbarTextColor}`) : ("#000000")}}/>
                        <FaBars className="burger-icon" onClick={toggleMenu} />
                    </div>
                </nav>
            </div>
            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}
            <MarketCart isOpen={isOpen} onClose={handleCloseCart}/>
        </section>
    );
}

export default MarketNavbar;