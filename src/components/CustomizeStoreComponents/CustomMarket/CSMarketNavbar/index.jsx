import "./index.scss";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useGetStoreByIdQuery, useGetStoreWithSectionsQuery } from "../../../../service/userApi.js";
import { MARKET_LOGO } from "../../../../../constants.js";
import CSMarketCart from "../CSMarketCart/index.jsx";
import Cookies from "js-cookie";

function CSMarketNavbar({ customLogo, customLogoWidth }) {
    const { data: getStoreByName } = useGetStoreByIdQuery(Cookies.get("chooseMarket"));
    const store = getStoreByName?.data;

    const { data: getStoreWithSectionsByMarketId } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const storeWithSections = getStoreWithSectionsByMarketId?.data;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenCart = () => {
        setIsOpen(true);
    };

    const logoSrc = customLogo || (store && store.logoImageName ? MARKET_LOGO + store.logoImageName : "");

    // Find the selected palette
    const selectedPaletId = storeWithSections?.selectedPaletId;
    const selectedPalette = storeWithSections?.palets?.find(p => p.id === selectedPaletId);

    // Define CSS variables for the palette colors
    const navbarStyles = selectedPalette
        ? {
            '--navbar-bg-color': selectedPalette.navbarBgColor,
            '--navbar-text-color': selectedPalette.navbarTextColor,
        }
        : {};

    return (
        <section id="cSMarketNavbar" style={navbarStyles}>
            <div className="container">
                <nav>
                    <div className="logo">
                        {logoSrc && (
                            <img
                                src={logoSrc}
                                alt="Logo"
                                style={{ width: customLogoWidth || store?.logoWidth }}
                            />
                        )}
                    </div>
                    <div className="links">
                        <Link className="link">CATEGORIES</Link>
                        <Link className="link">COLLECTIONS</Link>
                        <Link className="link">ABOUT US</Link>
                    </div>
                    <div className="search">
                        <input placeholder="Search" />
                        <FaShoppingBag className="icon" onClick={handleOpenCart} />
                    </div>
                </nav>
            </div>
            <CSMarketCart />
        </section>
    );
}

export default CSMarketNavbar;