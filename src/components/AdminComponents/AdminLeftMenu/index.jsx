import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome, IoMdSettings, IoMdWallet } from 'react-icons/io';
import { RiDiscountPercentFill, RiPagesLine } from 'react-icons/ri';
import { AiFillProduct } from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import { MdAnalytics, MdOutlinePayments, MdSpaceDashboard } from 'react-icons/md';
import { useState, useEffect } from 'react'; // Added useEffect
import Cookies from "js-cookie";
import { IoStorefront } from "react-icons/io5";
import { BiSolidTruck } from "react-icons/bi";
import { PiFilesFill } from "react-icons/pi";

function AdminLeftMenu() {
    const location = useLocation();
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const isSelected = (paths) => {
        if (Array.isArray(paths)) {
            return paths.includes(location.pathname) ? 'selected' : '';
        } else if (typeof paths === 'string') {
            return location.pathname.startsWith(paths) ? 'selected' : '';
        }
        return '';
    };

    const settingsPaths = [
        '/cp/settings',
        '/cp/general',
        '/cp/balance-payout',
        '/cp/payments',
        '/cp/shipping-and-delivery',
        '/cp/policies'
    ];

    const isSettingsPage = settingsPaths.includes(location.pathname);

    const handleToggleSubmenu = (menu) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

    // Automatically open submenu based on current path
    useEffect(() => {
        if (['/cp/orders', '/cp/abandoned-checkouts'].includes(location.pathname)) {
            setOpenSubmenu('orders');
        } else if (['/cp/products', '/cp/categories', '/cp/collections'].includes(location.pathname)) {
            setOpenSubmenu('products');
        } else {
            setOpenSubmenu(null);
        }
    }, [location.pathname]);

    return (
        <section id={'adminLeftMenu'}>
            <div className={'wrapper1'}>
                {isSettingsPage ? (
                    <>
                        <Link to={'/cp/general'} className={`link ${isSelected('/cp/general')}`}>
                            <IoStorefront className={'icon'} />
                            General
                        </Link>
                        <Link to={'/cp/balance-payout'} className={`link ${isSelected('/cp/balance-payout')}`}>
                            <IoMdWallet className={'icon'} />
                            Balance/Payout
                        </Link>
                        <Link to={'/cp/payments'} className={`link ${isSelected('/cp/payments')}`}>
                            <MdOutlinePayments className={'icon'} />
                            Payments
                        </Link>
                        <Link to={'/cp/shipping-and-delivery'} className={`link ${isSelected('/cp/shipping-and-delivery')}`}>
                            <BiSolidTruck className={'icon'} />
                            Shipping and Delivery
                        </Link>
                        <Link to={'/cp/policies'} className={`link ${isSelected('/cp/policies')}`}>
                            <PiFilesFill className={'icon'} />
                            Policies
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={'/cp/home'} className={`link ${isSelected('/cp/home')}`}>
                            <IoMdHome className={'icon'} />
                            Home
                        </Link>
                        <div className="menu-item">
                            <div
                                className={`link ${isSelected(['/cp/orders', '/cp/abandoned-checkouts'])}`}
                                onClick={() => handleToggleSubmenu('orders')}
                            >
                                <RiPagesLine className={'icon'} />
                                Orders
                            </div>
                            <div className={`wrrara ${openSubmenu === 'orders' ? 'open' : ''}`}>
                                <div className="firt"></div>
                                <div className="submenu">
                                    <Link
                                        to={'/cp/orders'}
                                        className={`sublink ${location.pathname === '/cp/orders' ? 'selected' : ''}`}
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        to={'/cp/abandoned-checkouts'}
                                        className={`sublink ${location.pathname === '/cp/abandoned-checkouts' ? 'selected' : ''}`}
                                    >
                                        Abandoned checkouts
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <div
                                className={`link ${isSelected(['/cp/products', '/cp/categories', '/cp/collections'])}`}
                                onClick={() => handleToggleSubmenu('products')}
                            >
                                <AiFillProduct className={'icon'} />
                                Inventory
                            </div>
                            <div className={`wrrara ${openSubmenu === 'products' ? 'open' : ''}`}>
                                <div className="firt"></div>
                                <div className="submenu">
                                    <Link
                                        to={'/cp/products'}
                                        className={`sublink ${location.pathname === '/cp/products' ? 'selected' : ''}`}
                                    >
                                        Products
                                    </Link>
                                    <Link
                                        to={'/cp/categories'}
                                        className={`sublink ${location.pathname === '/cp/categories' ? 'selected' : ''}`}
                                    >
                                        Categories
                                    </Link>
                                    <Link
                                        to={'/cp/collections'}
                                        className={`sublink ${location.pathname === '/cp/collections' ? 'selected' : ''}`}
                                    >
                                        Collections
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link to={`/cp/analytics/${Cookies.get('chooseMarket')}`} className={`link ${isSelected('/cp/analytics')}`}>
                            <MdAnalytics className={'icon'} />
                            Analytics
                        </Link>
                        <Link to={'/cp/discounts'} className={`link ${isSelected('/cp/discounts')}`}>
                            <RiDiscountPercentFill className={'icon'} />
                            Discounts
                        </Link>
                        <Link to={'/cp/customize-store'} className={`link ${isSelected('/cp/customize-store')}`}>
                            <FaStoreAlt className={'icon'} />
                            Customize Store
                        </Link>
                    </>
                )}
            </div>
            {!isSettingsPage ? (
                <Link to={'/cp/settings'} className={`link1 link ${isSelected('/cp/settings')}`}>
                    <IoMdSettings className={'icon'} />
                    Settings
                </Link>
            ) : (
                <Link to={'/cp/home'} className={`link1 link ${isSelected('/cp/home')}`}>
                    <MdSpaceDashboard className={'icon'} />
                    Back to Dashboard
                </Link>
            )}
        </section>
    );
}

export default AdminLeftMenu;