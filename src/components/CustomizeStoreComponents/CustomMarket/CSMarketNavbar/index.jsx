import "./index.scss";
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";
import {useGetStoreByIdQuery} from "../../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../../constants.js";
import CSMarketCart from "../CSMarketCart/index.jsx";
import Cookies from "js-cookie";

function CSMarketNavbar({customLogo, customLogoWidth}) {
    const params = useParams();
    const navigate = useNavigate();
    const {data: getStoreByName} = useGetStoreByIdQuery(Cookies.get("chooseMarket"));
    const store = getStoreByName?.data;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    const logoSrc = customLogo || (store && store.logoImageName ? MARKET_LOGO + store.logoImageName : "");

    return (
        <section id="cSMarketNavbar">
            <div className="container">
                <nav>
                    <div className="logo">
                        {logoSrc && (
                            <img
                                src={logoSrc}
                                alt="Logo"
                                style={{width: customLogoWidth || store.logoWidth}}
                            />
                        )}
                    </div>
                    <div className="links">
                        <Link className="link">CATEGORIES</Link>
                        <Link className="link">COLLECTIONS</Link>
                        <Link className="link">ABOUT US</Link>
                    </div>
                    <div className="search">
                        <input placeholder="Search"/>
                        <FaShoppingBag className="icon" onClick={handleOpenCart}/>
                    </div>
                </nav>
            </div>
            <CSMarketCart/>
        </section>
    );
}

export default CSMarketNavbar;
