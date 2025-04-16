import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome, IoMdSettings, IoMdWallet } from 'react-icons/io';
import { RiDiscountPercentFill, RiPagesLine } from 'react-icons/ri';
import { AiFillProduct } from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import {MdAnalytics, MdOutlinePayments, MdSpaceDashboard} from 'react-icons/md';
import { useState } from 'react';
import Cookies from "js-cookie";
import { IoStorefront } from "react-icons/io5";
import { BiSolidTruck } from "react-icons/bi";
import { PiFilesFill } from "react-icons/pi";

function AdminLeftMenu() {
    const location = useLocation();
    const [showSubmenu, setShowSubmenu] = useState(true);

    const isSelected = (path) => location.pathname === path ? 'selected' : '';

    // Define settings-related paths
    const settingsPaths = [
        '/cp/settings',
        '/cp/general',
        '/cp/balance-payout',
        '/cp/payments',
        '/cp/shipping-and-delivery',
        '/cp/policies'
    ];

    // Check if the current path is a settings-related path
    const isSettingsPage = settingsPaths.includes(location.pathname);

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
                        <Link to={'/cp/orders'} className={`link ${isSelected('/cp/orders')}`}>
                            <RiPagesLine className={'icon'} />
                            Orders
                        </Link>
                        <Link to={`/cp/products`} className={`link ${isSelected('/cp/products')} ${isSelected('/cp/categories')} ${isSelected('/cp/collections')}`}>
                            <AiFillProduct className={'icon'} />
                            Products
                        </Link>
                        {showSubmenu && (
                            <div className={"wrrara"}>
                                <div className={"firt"}></div>
                                <div className='submenu'>
                                    <Link to={'/cp/categories'} className='sublink'>
                                        Categories
                                    </Link>
                                    <Link to={'/cp/collections'} className='sublink'>
                                        Collections
                                    </Link>
                                </div>
                            </div>
                        )}
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