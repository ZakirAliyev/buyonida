import './index.scss'
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";
import MarketCart from "../MarketCart"; // Sizin yaratdığınız səbət komponenti
import image1 from "/src/assets/qaraLogo.png"
import {useGetStoreByNameQuery} from "../../../service/userApi.js";
import {MARKET_LOGO} from "../../../../constants.js";

function MarketNavbar() {
    const params = useParams();
    const navigate = useNavigate();
    const {data: getStoreByName} = useGetStoreByNameQuery(params.marketName.substring(1, params.marketName.length))
    const store = getStoreByName?.data
    // Səbətin açıq/bağlı vəziyyətini saxlayan state
    const [isOpen, setIsOpen] = useState(false);

    // Səbəti aç
    const handleOpenCart = () => {
        setIsOpen(true);
    };

    // Səbəti bağla
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
                            // Məsələn, "marketName" parametrlərindən istifadə
                            navigate(`/${params?.marketName || ""}`);
                        }}
                    >
                        {/* Loqo şəkliniz */}
                        <img
                            src={MARKET_LOGO + store?.logoImageName}
                            alt="Logo"
                        />
                    </div>

                    {/* Naviqasiya linkləri */}
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

                    {/* Axtarış və səbət ikonu */}
                    <div className="search">
                        <input placeholder="Search"/>
                        <FaShoppingBag className="icon" onClick={handleOpenCart}/>
                    </div>
                </nav>
            </div>

            {/* Açıq olduqda qara pərdə (overlay) */}
            {isOpen && <div className="overlay" onClick={handleCloseCart}></div>}

            {/* MarketCart komponenti - sağdan açılan səbət */}
            <MarketCart isOpen={isOpen} onClose={handleCloseCart}/>
        </section>
    );
}

export default MarketNavbar;
