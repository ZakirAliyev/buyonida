import { useTranslation } from "react-i18next";
import './index.scss';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useGetOrdersByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { useState } from "react";
import noOrdersImage from "/src/assets/mistatik.png"; // Placeholder for your 300x300 image

function AdminAbandonedCheckoutsMenu() {
  const {
    t
  } = useTranslation();
  const {
    data: getOrdersByMarketId
  } = useGetOrdersByMarketIdQuery(Cookies.get('chooseMarket'));
  const orders = getOrdersByMarketId?.data || [];
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const handleRowClick = orderId => {
    navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${orderId}`);
  };
  const handleFilterChange = filterType => {
    setFilter(filterType);
  };

  // Filter orders based on the selected filter
  const filteredOrders = filter === "Unfulfilled" ? orders.filter(order => !order.isFulfilled) : orders;
  return <section id="adminAbandonedCheckoutsMenu">
            <h1>{t("abandoned_checkouts")}</h1>
            {filteredOrders.length === 0 ? <div className="no-orders-container">
                    <div>
                        <h2>{t("abandoned_checkouts_will_show_here")}</h2>
                        <p>{t("abandoned_checkouts_will_show_here_when_customers_put_an_item_in_their_cart_but_don_t_check_out_you_can_also_email_customers_a_link_to_their_cart")}</p>
                    </div>
                    <img src={noOrdersImage} alt="No abandoned checkouts" className="no-orders-image" />
                </div> : <table>
                    <thead>
                    <tr className="filter-row">
                        <th colSpan="7">
                            <div className="filter-buttons">
                                <button className={filter === "All" ? "selected" : ""} onClick={() => handleFilterChange("All")}>{t("all_orders")}</button>
                                <button className={filter === "Unfulfilled" ? "selected" : ""} onClick={() => handleFilterChange("Unfulfilled")}>{t("unfulfilled")}</button>
                                <button className={filter === "Open" ? "selected" : ""} onClick={() => handleFilterChange("Open")}>{t("open")}</button>
                                <button className={filter === "Closed" ? "selected" : ""} onClick={() => handleFilterChange("Closed")}>{t("closed")}</button>
                            </div>
                        </th>
                    </tr>
                    <tr className="header-row">
                        <th className="checkbox-column">
                            <input type="checkbox" />
                        </th>
                        <th>{t("order")}</th>
                        <th>{t("date")}</th>
                        <th>{t("customer")}</th>
                        <th>{t("total")}</th>
                        <th>{t("payment_status")}</th>
                        <th>{t("fulfillment_status")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map(order => <tr key={order.id} className="data-row" onClick={() => handleRowClick(order.id)}>
                            <td className="checkbox-column">
                                <input type="checkbox" />
                            </td>
                            <td>{t("")}{order.id}</td>
                            <td>{new Date(order.createdDate).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}</td>
                            <td>{order.name} {order.surname}</td>
                            <td>{t("")}{order.totalPrice.toFixed(2)}</td>
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
                        </tr>)}
                    </tbody>
                </table>}
        </section>;
}
export default AdminAbandonedCheckoutsMenu;