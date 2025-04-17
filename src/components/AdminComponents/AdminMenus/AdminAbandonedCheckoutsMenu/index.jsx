import './index.scss';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useGetOrdersByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { useState } from "react";
import noOrdersImage from "/src/assets/static.png"; // Placeholder for your 300x300 image

function AdminAbandonedCheckoutsMenu() {
    const { data: getOrdersByMarketId } = useGetOrdersByMarketIdQuery(Cookies.get('chooseMarket'));
    const orders = getOrdersByMarketId?.data || [];
    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();

    const handleRowClick = (orderId) => {
        navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${orderId}`);
    };

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
    };

    // Filter orders based on the selected filter
    const filteredOrders = filter === "Unfulfilled"
        ? orders.filter(order => !order.isFulfilled)
        : orders;

    return (
        <section id="adminAbandonedCheckoutsMenu">
            <h1>Abandoned Checkouts</h1>
            {filteredOrders.length === 0 ? (
                <div className="no-orders-container">
                    <div>
                        <h2>Abandoned checkouts will show here</h2>
                        <p>
                            Abandoned checkouts will show here when customers put an item in their cart but don't check out.
                            You can also email customers a link to their cart.
                        </p>
                    </div>
                    <img src={noOrdersImage} alt="No abandoned checkouts" className="no-orders-image" />
                </div>
            ) : (
                <table>
                    <thead>
                    <tr className="filter-row">
                        <th colSpan="7">
                            <div className="filter-buttons">
                                <button
                                    className={filter === "All" ? "selected" : ""}
                                    onClick={() => handleFilterChange("All")}
                                >
                                    All orders
                                </button>
                                <button
                                    className={filter === "Unfulfilled" ? "selected" : ""}
                                    onClick={() => handleFilterChange("Unfulfilled")}
                                >
                                    Unfulfilled
                                </button>
                                <button
                                    className={filter === "Open" ? "selected" : ""}
                                    onClick={() => handleFilterChange("Open")}
                                >
                                    Open
                                </button>
                                <button
                                    className={filter === "Closed" ? "selected" : ""}
                                    onClick={() => handleFilterChange("Closed")}
                                >
                                    Closed
                                </button>
                            </div>
                        </th>
                    </tr>
                    <tr className="header-row">
                        <th className="checkbox-column">
                            <input type="checkbox" />
                        </th>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment status</th>
                        <th>Fulfillment status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr
                            key={order.id}
                            className="data-row"
                            onClick={() => handleRowClick(order.id)}
                        >
                            <td className="checkbox-column">
                                <input type="checkbox" />
                            </td>
                            <td>#{order.id}</td>
                            <td>{new Date(order.createdDate).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}</td>
                            <td>{order.name} {order.surname}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>
                                    <span className={order.isPayment ? "paid" : "unpaid"}>
                                        <GoDotFill className="status-icon" />
                                        {order.isPayment ? "Paid" : "Unpaid"}
                                    </span>
                            </td>
                            <td>
                                    <span className={order.isFulfilled ? "fulfilled" : "unfulfilled"}>
                                        <GoDotFill className="status-icon" />
                                        {order.isFulfilled ? "Fulfilled" : "Unfulfilled"}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default AdminAbandonedCheckoutsMenu;