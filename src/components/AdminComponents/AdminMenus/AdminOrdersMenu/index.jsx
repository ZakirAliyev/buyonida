import './index.scss'
import {GoDotFill} from "react-icons/go";
import {useNavigate} from "react-router-dom";

function AdminOrdersMenu() {

    const arr = new Array(0).fill(0)
    const navigate = useNavigate();

    return (
        <section id={"adminOrdersMenu"}>
            <h1>Orders</h1>
            <table>
                <thead>
                <tr className="first">
                    <th>
                        <button className={"selectedBtn"}>All orders</button>
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
                {arr && arr.length > 0 ? (
                    arr.map((item, index) => (
                        <tr key={index} className="pbtr">
                            <td className="checkboxWrapper">
                                <input type="checkbox"/>
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>
                                <span>#1031</span>
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>
                                <span>24 Feb at 11:00 AM</span>
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>Elvar Aghamaliyev
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>$153.24
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>
                <span className="paid">
                    <GoDotFill className="iconicon"/> Paid
                </span>
                            </td>
                            <td onClick={() => {
                                navigate('/cp/order-details')
                            }}>
                <span className="fulfilled">
                    <GoDotFill className="iconicon"/> Fulfilled
                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <div style={{
                        padding: '16px 32px'
                    }}>You don't have an order yet</div>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default AdminOrdersMenu;