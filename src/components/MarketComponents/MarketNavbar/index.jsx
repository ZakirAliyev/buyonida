import './index.scss'
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";
import MarketCart from "../MarketCart";
import {useGetStoreByNameQuery} from "../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../constants.js";

function MarketNavbar() {
    const params = useParams();

    const navigate = useNavigate();
    const name = params?.marketName?.substring(1, params.marketName.length)
    const {data: getStoreByName} = useGetStoreByNameQuery('Zakir magaza')
    const store = getStoreByName?.data
    const [isOpen, setIsOpen] = useState(false);
    console.log(store);
    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const handleCloseCart = () => {
        setIsOpen(false);
    };

    return (
        <section id="marketNavbar">
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
                    <div className="links">
                        <Link className="link">
                            CATEGORIES
                        </Link>
                        <Link className="link">
                            COLLECTIONS
                        </Link>
                        <Link to={`/${params.marketName}/about`} className="link">
                            ABOUT US
                        </Link>
                    </div>

                    <div className="search">
                        <input placeholder="Search"/>
                        <FaShoppingBag className="icon" onClick={handleOpenCart}/>
                    </div>
                </nav>
            </div>
            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}
            <MarketCart isOpen={isOpen} onClose={handleCloseCart}/>
        </section>
    );
}

export default MarketNavbar;
