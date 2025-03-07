import './index.scss'
import {GoDotFill} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import {useGetOrdersByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";

function AdminOrdersMenu() {

    const {data: getOrdersByMarketId} = useGetOrdersByMarketIdQuery(Cookies.get('chooseMarket'))
    const orders = getOrdersByMarketId?.data

    const navigate = useNavigate();

    return (
        <section id="adminOrdersMenu">
            <h1>Orders</h1>
            <table>
                <thead>
                <tr className="first">
                    <th>
                        <button className="selectedBtn">All orders</button>
                    </th>
                    <th>
                        <button>Unfulfilled</button>
                    </th>
                    <th>
                        <button>Open</button>
                    </th>
                    <th>
                        <button>Closed</button>
                    </th>
                </tr>
                <tr className="bgbg">
                    <td className="checkboxWrapper">
                        <input type="checkbox"/>
                    </td>
                    <td>
                        <span style={{fontWeight: "600"}}>Order</span>
                    </td>
                    <td>
                        <span style={{fontWeight: "600"}}>Date</span>
                    </td>
                    <td style={{fontWeight: "600"}}>Customer</td>
                    <td style={{fontWeight: "600"}}>Total</td>
                    <td style={{fontWeight: "600"}}>Payment status</td>
                    <td style={{fontWeight: "600"}}>Fulfillment status</td>
                </tr>
                </thead>
                <tbody>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order.id} className="pbtr">
                            <td className="checkboxWrapper">
                                <input type="checkbox"/>
                            </td>
                            <td onClick={() => navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${order?.id}`)}>
                                <span>#{order.id}</span>
                            </td>
                            <td onClick={() => navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${order?.id}`)}>
                                <span>{new Date(order.createdDate).toLocaleString()}</span>
                            </td>
                            <td onClick={() => navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${order?.id}`)}>
                                <span>{order.name} {order.surname}</span>
                            </td>
                            <td onClick={() => navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${order?.id}`)}>
                                <span>${order.totalPrice}</span>
                            </td>
                            <td onClick={() => navigate(`/cp/order-details/${Cookies.get('chooseMarket')}/${order?.id}`)}>
                  <span className={order.isPayment ? "paid" : "unpaid"}>
                    <GoDotFill className="iconicon"/> {order.isPayment ? "Paid" : "Not Paid"}
                  </span>
                            </td>
                            <td onClick={() => navigate('/cp/order-details')}>
                  <span className={order.isFulfilled ? "fulfilled" : "unfulfilled"}>
                    <GoDotFill className="iconicon"/> {order.isFulfilled ? "Fulfilled" : "Not Fulfilled"}
                  </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{padding: '16px 32px'}}>
                            You don't have an order yet
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default AdminOrdersMenu;
