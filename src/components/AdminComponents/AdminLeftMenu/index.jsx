import './index.scss';
import {Link, useLocation} from 'react-router-dom';
import {IoMdHome, IoMdSettings} from "react-icons/io";
import {RiDiscountPercentFill, RiPagesLine} from "react-icons/ri";
import {AiFillProduct} from "react-icons/ai";
import {FaStoreAlt} from "react-icons/fa";
import {MdAnalytics} from "react-icons/md";

function AdminLeftMenu() {
    const location = useLocation();
    const isSelected = (path) => location.pathname === path ? 'selected' : '';

    return (
        <section id={"adminLeftMenu"}>
            <div className={"wrapper1"}>
                <Link to={`/cp/home`} className={`link ${isSelected('/cp/home')}`}>
                    <IoMdHome className={"icon"}/>
                    Home
                </Link>
                <Link to={`/cp/orders`} className={`link ${isSelected('/cp/orders')}`}>
                    <RiPagesLine className={"icon"}/>
                    Orders
                </Link>
                <Link to={`/cp/products`} className={`link ${isSelected('/cp/products')}`}>
                    <AiFillProduct className={"icon"}/>
                    Products
                </Link>
                <Link to={`/cp/analytics`} className={`link ${isSelected('/cp/analytics')}`}>
                    <MdAnalytics className={"icon"}/>
                    Analytics
                </Link>
                <Link to={`/cp/discounts`} className={`link ${isSelected('/cp/discounts')}`}>
                    <RiDiscountPercentFill className={"icon"}/>
                    Discounts
                </Link>
                <Link to={`/cp/customize-store`} className={`link ${isSelected('/cp/customize-store')}`}>
                    <FaStoreAlt className={"icon"}/>
                    Customize Store
                </Link>
            </div>
            <Link to={`/cp/settings`} className={`link1 link ${isSelected('/cp/settings')}`}>
                <IoMdSettings className={"icon"}/>
                Settings
            </Link>
        </section>
    );
}

export default AdminLeftMenu;
