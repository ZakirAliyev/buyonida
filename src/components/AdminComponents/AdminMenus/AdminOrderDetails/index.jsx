import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "/src/assets/success.png";
import image3 from "/src/assets/location.png";
import image4 from "/src/assets/unfilfulled.png";
import { FaCheckCircle } from "react-icons/fa"; // Fulfilled icon
import { FaTimesCircle } from "react-icons/fa"; // Unpaid icon
import { useState, cloneElement } from "react";
import { Modal } from "antd";
import AdminAreYouSure from "../../AdminAreYouSure/index.jsx";
import { useGetOrderByOrderIdQuery, useFulFillOrderMutation, useRefundOrderMutation } from "../../../../service/userApi.js";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_LOGO } from "../../../../../constants.js";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie";
import { GiStabbedNote } from "react-icons/gi";
import { SlNote } from "react-icons/sl";
import { LuNotebookPen } from "react-icons/lu";
function AdminOrderDetails() {
  const {
    t
  } = useTranslation();
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);
  const params = useParams();
  const {
    marketId,
    orderId
  } = params;
  const {
    data: getOrderByOrderId
  } = useGetOrderByOrderIdQuery({
    orderId,
    marketId
  });
  const [fulFillOrder] = useFulFillOrderMutation();
  const [refundOrder] = useRefundOrderMutation();
  const orderData = getOrderByOrderId?.data;
  const navigate = useNavigate();

  // Calculations
  const shippingCost = 19.57;
  const subtotal = orderData?.totalPrice || 0;
  const total = subtotal + shippingCost;
  const paymentStatus = orderData?.isPayment ? "Paid" : "Unpaid";
  const statusImage = orderData?.isPayment ? image1 : image4;
  const handleRefundClick = () => {
    setIsRefundModalOpen(true);
  };
  const handleRefundConfirm = async () => {
    setIsRefunding(true);
    try {
      const response = await refundOrder({
        orderId,
        marketId: Cookies.get('chooseMarket')
      }).unwrap();
      if (response?.statusCode === 200) {
        toast.success('Order refunded!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          onClose: () => navigate('/cp/orders')
        });
      } else {
        toast.error('Xeta bas verdi!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        });
      }
    } catch (error) {
      toast.error("Failed to refund order.");
    } finally {
      setIsRefunding(false);
      setIsRefundModalOpen(false);
    }
  };
  const handleCancelRefund = () => {
    setIsRefundModalOpen(false);
  };
  const handleFulfillClick = async () => {
    setIsFulfilling(true);
    try {
      const response = await fulFillOrder({
        orderId,
        marketId: Cookies.get('chooseMarket')
      }).unwrap();
      if (response?.statusCode === 200) {
        toast.success('Order fulfilled!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          onClose: () => navigate('/cp/orders')
        });
      } else {
        toast.error('Xeta bas verdi!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark'
        });
      }
    } catch (error) {
      toast.error("Failed to fulfill order.");
    } finally {
      setIsFulfilling(false);
    }
  };

  // Show loading state if data is not available
  if (!orderData) {
    return <div>{t("loading")}</div>;
  }
  return <section id="adminOrderDetails">
            <div className="container">
                <h2>{t("order_details")}</h2>
                <div className="row">
                    <div className="col-6" style={{
          padding: '0 8px 16px 0'
        }}>
                        <div className="card customer-card">
                            <h3>{t("customer")}</h3>
                            <div className="customer-name">
                                {orderData.name} {orderData.surname}
                            </div>
                            <h3>{t("contact_information")}</h3>
                            <div className="contact-info">
                                <a href={`mailto:${orderData.email}`} className="link">
                                    {orderData.email}
                                </a>
                                <div className="link">{orderData.phone}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{
          padding: '0 0 16px 8px'
        }}>
                        <div className="card shipping-card">
                            <h3>{t("shipping_address")}</h3>
                            <p>{orderData.country}</p>
                            <p>{orderData.city}</p>
                            <p>{orderData.region}</p>
                            <p>{orderData.address1}</p>
                            <p>{orderData.address2}</p>
                            <p>{orderData.postCode}</p>
                        </div>
                    </div>
                </div>
                <div className="card summary-card" style={{
        marginBottom: '16px'
      }}>
                    <div className="status-wrapper">
                        <LuNotebookPen />
                        <h3 style={{
            marginTop: "10px"
          }}>{t("special_note")}</h3>
                    </div>
                    <div className="summary-row">
                        <div className="summary-label">
                            <span>{orderData?.specialNote}</span>
                        </div>
                    </div>
                </div>
                <div className="card summary-card">
                    <div className="status-wrapper">
                        {!orderData.isPayment ? <FaTimesCircle className="unpaid-icon" /> : <FaCheckCircle className="fulfilled-icon" />}
                        <h3>{paymentStatus}</h3>
                    </div>
                    <div className="summary-row">
                        <div className="summary-label">
                            <span>{t("subtotal")}</span>
                            <span>{orderData.orderItems.length}{t("item")}{orderData.orderItems.length > 1 ? "s" : ""}</span>
                        </div>
                        <div className="summary-value">{t("")}{subtotal.toFixed(2)}</div>
                    </div>
                    <div className="summary-row">
                        <div className="summary-label">
                            <span>{t("shipping")}</span>
                            <span>{t("standard")}</span>
                        </div>
                        <div className="summary-value">{t("")}{shippingCost.toFixed(2)}</div>
                    </div>
                    <div className="summary-row total-row">
                        <div className="summary-label">
                            <span>{t("total")}</span>
                        </div>
                        <div className="summary-value">{t("")}{total.toFixed(2)}</div>
                    </div>
                </div>
                <div className="card order-items-card" style={{
        marginTop: '16px'
      }}>
                    <div className="order-status">
                        {orderData.isFulfilled ? <>
                                <FaCheckCircle className="fulfilled-icon" />
                                <span>{t("fulfilled")}</span>
                            </> : <>
                                <img src={image4} alt="Order Status" className="status-icon-img" />
                                <span>{t("unfulfilled")}</span>
                            </>}
                        <span>{t("order")}{orderData.id}</span>
                    </div>
                    {orderData.orderItems.map(item => <div key={item.id} className="item-row">
                            <div className="item-details">
                                <img src={`${PRODUCT_LOGO}${item.product.imageNames[0]}`} alt={item.product.title} className="item-image" />
                                <div className="item-info">
                                    <div className="item-title">{item.product.title}</div>
                                    {item.orderItemOptions && <div className="item-options">
                                            <ul>
                                                {item.orderItemOptions.map(option => <li key={option.productOptionId}>
                                                        {option.productOptionName}{t("")}{option.optionValue}
                                                    </li>)}
                                            </ul>
                                        </div>}
                                </div>
                            </div>
                            <div className="item-price">
                                <span>{t("")}{item.price.toFixed(2)}{t("x")}{item.quantity}</span>
                                <span>{t("")}{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>)}
                    <div className="location-row">
                        <div className="location-info">
                            <img src={image3} alt="Location" className="location-icon" />
                            <div>
                                <h4>{t("location")}</h4>
                                <h5>{orderData.city}{t("")}{orderData.country}</h5>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="refund-button" onClick={handleRefundClick} disabled={isRefunding}>{t("refund")}</button>
                            {!orderData.isFulfilled && <button className="fulfill-button" onClick={handleFulfillClick} disabled={isFulfilling}>
                                    {isFulfilling ? <PulseLoader color={"white"} size={10} /> : "Fulfill item"}
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={isRefundModalOpen} onCancel={handleCancelRefund} footer={null} width={500} modalRender={modal => cloneElement(modal, {
      style: {
        ...modal.props.style,
        padding: 0,
        borderRadius: "20px"
      }
    })}>
                <AdminAreYouSure onCancel={handleCancelRefund} onRefund={handleRefundConfirm} />
            </Modal>
            <ToastContainer />
        </section>;
}
export default AdminOrderDetails;