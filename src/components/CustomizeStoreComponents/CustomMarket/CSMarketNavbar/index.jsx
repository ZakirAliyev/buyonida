import './index.scss'
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";
import {useGetStoreByNameQuery} from "../../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../../constants.js";
import CSMarketCart from "../CSMarketCart/index.jsx";
import Cookies from "js-cookie";

function CSMarketNavbar() {
    const params = useParams();

    const navigate = useNavigate();
    const {data: getStoreByName} = useGetStoreByNameQuery(Cookies.get('chooseMarketName'))
    const store = getStoreByName?.data
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    return (
        <section id="cSMarketNavbar">
            <div className="container">
                <nav>
                    <div
                        className="logo"
                    >
                        <img
                            src={MARKET_LOGO + store?.logoImageName}
                            alt="Logo"
                        />
                    </div>
                    <div className="links">
                        <Link className="link">
                            CATEGORIES
                        </Link>
                        <Link className="link">
                            COLLECTIONS
                        </Link>
                        <Link className="link">
                            ABOUT US
                        </Link>
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
