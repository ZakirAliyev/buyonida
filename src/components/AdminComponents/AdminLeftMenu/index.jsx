import './index.scss'
import {Link} from "react-router-dom";
import {GoHome} from "react-icons/go";

function AdminLeftMenu() {
    return (
        <section id={"adminLeftMenu"}>
            <Link to={`/cp/home`} className={"link selected"}>
                <GoHome className={"icon"}/>
                Home
            </Link>
            <Link to={`/cp/orders`} className={"link"}>
                <GoHome/>
                Orders
            </Link>
            <Link to={`/cp/products`} className={"link"}>
                <GoHome/>
                Products
            </Link>
            <Link to={`/cp/customers`} className={"link"}>
                <GoHome/>
                Customers
            </Link>
            <Link to={`/cp/content`} className={"link"}>
                <GoHome/>
                Content
            </Link>
            <Link to={`/cp/analytics`} className={"link"}>
                <GoHome/>
                Analytics
            </Link>
            <Link to={`/cp/marketing`} className={"link"}>
                <GoHome/>
                Marketing
            </Link>
            <Link to={`/cp/discounts`} className={"link"}>
                <GoHome/>
                Discounts
            </Link>
        </section>
    );
}

export default AdminLeftMenu;