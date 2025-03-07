import './index.scss';
import image1 from "/src/assets/success.png";
import image2 from "/src/assets/miniPhoto.png";
import image3 from "/src/assets/location.png";
import image4 from "/src/assets/unfilfulled.png";
import {cloneElement, useState} from "react";
import {Modal} from "antd";
import AdminAreYouSure from "../../AdminAreYouSure/index.jsx";
import {useGetOrderByOrderIdQuery} from "../../../../service/userApi.js";
import {useParams} from "react-router-dom";
import {PRODUCT_LOGO} from "../../../../../constants.js";

function AdminOrderDetails() {
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    const handleRefund = () => {
        alert("Refund completed");
        setIsBigBoxModalOpen(false);
    };

    const params = useParams();
    const {marketId, orderId} = params;

    const {data: getOrderByOrderId} = useGetOrderByOrderIdQuery({orderId, marketId});
    const orderData = getOrderByOrderId?.data;

    // Hesaplamalar
    const shippingCost = 19.57;
    const subtotal = orderData?.totalPrice || 0;
    const total = subtotal + shippingCost;
    const paymentStatus = orderData?.isPayment ? "Paid" : "Pending Payment";
    const statusImage = orderData?.isPayment ? image1 : image4;

    // Henüz veri gelmediyse loading ekranı gösterilebilir.
    if (!orderData) {
        return <div>Loading...</div>;
    }

    return (
        <section id="adminOrderDetails">
            <div className="row">
                <div className="box1 col-8">
                    <div className="wrapper">
                        <h3>Customer</h3>
                        <div className="link link1">
                            {orderData.name} {orderData.surname}
                        </div>
                        <h3 className="mgrn">Contact Information</h3>
                        <div className="link">{orderData.email}</div>
                        <div className="link">{orderData.phone}</div>
                    </div>
                </div>
                <div className="box2 col-4">
                    <div
                        className="wrapper"
                        style={{
                            height: "calc(100% - 20px)",
                        }}
                    >
                        <h3 className="h3">Shipping Address</h3>
                        <p>{orderData.country}</p>
                        <p>{orderData.city}</p>
                        <p>{orderData.region}</p>
                        <p>{orderData.address1}</p>
                        <p>{orderData.address2}</p>
                        <p>{orderData.postCode}</p>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="statusWrapper">
                    <img src={statusImage} alt="Status" className="img"/>
                    <h3>{paymentStatus}</h3>
                </div>
                <div className="info">
                    <div className="infoWrapper">
                        <div>Subtotal</div>
                        <div>
                            {orderData.orderItems.length} item
                            {orderData.orderItems.length > 1 ? "s" : ""}
                        </div>
                    </div>
                    <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="info info1">
                    <div className="infoWrapper">
                        <div>Shipping</div>
                        <div>Standard</div>
                    </div>
                    <div>${shippingCost.toFixed(2)}</div>
                </div>
                <div className="info info1 info2">
                    <div className="infoWrapper">
                        <div>Total</div>
                    </div>
                    <div>${total.toFixed(2)}</div>
                </div>
            </div>
            <div className="wrapper box3">
                <div className="info info1">
                    <div>
                        <img src={image4} alt="Order Status" className="img1"/>
                    </div>
                    <div className="infoWrapper">
                        <div style={{fontWeight: "600"}}>Order #{orderData.id}</div>
                    </div>
                </div>
                <div className="line"></div>
                {orderData.orderItems.map((item, index) => (
                    <div key={item.id}>
                        <div className="info info1">
                            <div className="infoWrapper infoWrapper1">
                                <img src={PRODUCT_LOGO + item.product?.imageNames[0]} alt={item.product.title}/>
                                <div>{item.product.title}</div>
                            </div>
                            <div className="infoWrapper">
                                <div>
                                    ${item.price.toFixed(2)} x {item.quantity}
                                </div>
                                <div>${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </div>
                        {index < orderData.orderItems.length - 1 && <div className="line"></div>}
                        <div className="productOptions">
                            {item.orderItemOptions && (
                                <div className="selectedOption">
                                    <h5>Selected Options:</h5>
                                    <ul>
                                        {item.orderItemOptions.map((opt) => (
                                            <li key={opt.productOptionId}>
                                                {opt.productOptionName}: {opt.optionValue}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="line"></div>
                <div className="info finish1">
                    <div className="zakir">
                        <img src={image3} alt="Location"/>
                        <div className="textWrapper2">
                            <h4>Location</h4>
                            <h5>
                                {orderData.city}, {orderData.country}
                            </h5>
                        </div>
                    </div>
                    <div>
                        <button className="fulfillButton" onClick={handleBigBoxClick}>
                            Refund
                        </button>
                        <button>Fulfill item</button>
                    </div>
                </div>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={500}
                modalRender={(modal) => {
                    return cloneElement(modal, {
                        style: {...modal.props.style, padding: 0, borderRadius: "20px"},
                    });
                }}
            >
                <AdminAreYouSure onCancel={handleBigBoxClick} onRefund={handleRefund}/>
            </Modal>
        </section>
    );
}

export default AdminOrderDetails;
