import { useTranslation } from "react-i18next";
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
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const isSelected = paths => {
    if (Array.isArray(paths)) {
      return paths.includes(location.pathname) ? 'selected' : '';
    } else if (typeof paths === 'string') {
      return location.pathname.startsWith(paths) ? 'selected' : '';
    }
    return '';
  };
  const settingsPaths = ['/cp/settings', '/cp/general', '/cp/balance-payout', '/cp/payments', '/cp/shipping-and-delivery', '/cp/policies'];
  const isSettingsPage = settingsPaths.includes(location.pathname);
  const handleToggleSubmenu = menu => {
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
  return <section id={'adminLeftMenu'}>
            <div className={'wrapper1'}>
                {isSettingsPage ? <>
                        <Link to={'/cp/general'} className={`link ${isSelected('/cp/general')}`}>
                            <IoStorefront className={'icon'} />{t("general")}</Link>
                        <Link to={'/cp/balance-payout'} className={`link ${isSelected('/cp/balance-payout')}`}>
                            <IoMdWallet className={'icon'} />{t("balance_payout")}</Link>
                        <Link to={'/cp/payments'} className={`link ${isSelected('/cp/payments')}`}>
                            <MdOutlinePayments className={'icon'} />{t("payments")}</Link>
                        <Link to={'/cp/shipping-and-delivery'} className={`link ${isSelected('/cp/shipping-and-delivery')}`}>
                            <BiSolidTruck className={'icon'} />{t("shipping_and_delivery")}</Link>
                        <Link to={'/cp/policies'} className={`link ${isSelected('/cp/policies')}`}>
                            <PiFilesFill className={'icon'} />{t("policies")}</Link>
                    </> : <>
                        <Link to={'/cp/home'} className={`link ${isSelected('/cp/home')}`}>
                            <IoMdHome className={'icon'} />{t("home")}</Link>
                        <div className="menu-item">
                            <div className={`link ${isSelected(['/cp/orders', '/cp/abandoned-checkouts'])}`} onClick={() => handleToggleSubmenu('orders')}>
                                <RiPagesLine className={'icon'} />{t("orderspace")}</div>
                            <div className={`wrrara ${openSubmenu === 'orders' ? 'open' : ''}`}>
                                <div className="firt"></div>
                                <div className="submenu">
                                    <Link to={'/cp/orders'} className={`sublink ${location.pathname === '/cp/orders' ? 'selected' : ''}`}>{t("orders")}</Link>
                                    <Link to={'/cp/abandoned-checkouts'} className={`sublink ${location.pathname === '/cp/abandoned-checkouts' ? 'selected' : ''}`}>{t("abandoned_checkouts")}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="menu-item">
                            <div className={`link ${isSelected(['/cp/products', '/cp/categories', '/cp/collections'])}`} onClick={() => handleToggleSubmenu('products')}>
                                <AiFillProduct className={'icon'} />{t("inventory")}</div>
                            <div className={`wrrara ${openSubmenu === 'products' ? 'open' : ''}`}>
                                <div className="firt"></div>
                                <div className="submenu">
                                    <Link to={'/cp/products'} className={`sublink ${location.pathname === '/cp/products' ? 'selected' : ''}`}>{t("products")}</Link>
                                    <Link to={'/cp/categories'} className={`sublink ${location.pathname === '/cp/categories' ? 'selected' : ''}`}>{t("categories")}</Link>
                                    <Link to={'/cp/collections'} className={`sublink ${location.pathname === '/cp/collections' ? 'selected' : ''}`}>{t("collections")}</Link>
                                </div>
                            </div>
                        </div>
                        <Link to={`/cp/analytics/${Cookies.get('chooseMarket')}`} className={`link ${isSelected('/cp/analytics')}`}>
                            <MdAnalytics className={'icon'} />{t("analytics")}</Link>
                        <Link to={'/cp/discounts'} className={`link ${isSelected('/cp/discounts')}`}>
                            <RiDiscountPercentFill className={'icon'} />{t("discounts")}</Link>
                        <Link to={'/cp/customize-store'} className={`link ${isSelected('/cp/customize-store')}`}>
                            <FaStoreAlt className={'icon'} />{t("customize_store")}</Link>
                    </>}
            </div>
            {!isSettingsPage ? <Link to={'/cp/settings'} className={`link1 link ${isSelected('/cp/settings')}`}>
                    <IoMdSettings className={'icon'} />{t("settings")}</Link> : <Link to={'/cp/home'} className={`link1 link ${isSelected('/cp/home')}`}>
                    <MdSpaceDashboard className={'icon'} />{t("back_to_dashboard")}</Link>}
        </section>;
}
export default AdminLeftMenu;