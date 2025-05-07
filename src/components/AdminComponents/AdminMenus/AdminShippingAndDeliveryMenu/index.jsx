import { useTranslation } from "react-i18next";
import './index.scss';
import aze from "../../../../assets/aze.png";
import { FiPlus } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useState } from 'react';
function AdminShippingAndDeliveryMenu() {
  const {
    t
  } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    rateType: 'flat',
    customRateName: '',
    customDescription: '',
    price: '0.00'
  });
  // Eklenen state: Mevcut oranları saklamak için
  const [rates, setRates] = useState([{
    name: "Standart",
    price: "Free"
  }]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      rateType: 'flat',
      customRateName: '',
      customDescription: '',
      price: '0.00'
    });
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Form submit edildiğinde oranları güncelle
    setRates(prev => [...prev, {
      name: formData.customRateName || "Custom",
      price: formData.price
    }]);
    handleCloseModal();
  };

  // Yeni işlev: Input olmadan direkt "Free" oran ekler
  const handleAddFreeRate = () => {
    setRates(prev => [...prev, {
      name: "Free Shipping",
      price: "0.00"
    }]);
  };
  return <section id={"adminShippingAndDeliveryMenu"}>
            <h2>{t("shipping_and_delivery")}</h2>
            <div className={"box wrapper"}>
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>{t("fulfillment_location")}</div>
                    <div className={"olan"}>
                        <div>{t("shop_location")}</div>
                        <div className={"country-name"}>{t("azerbaijan")}</div>
                    </div>
                    <div className={"bozolan"}>{t("shipping_zones")}</div>
                    <div className={"olan"}>
                        <img src={aze} alt={"Image"} />
                        <div>{t("domestic")}</div>
                        <GoDotFill style={{
            color: "#ccc",
            fontSize: "10px"
          }} />
                        <div>{t("azerbaijan")}</div>
                    </div>
                    <div className={"line"}></div>
                    {/* Mevcut oranları göster */}
                    {rates.map((rate, index) => <div key={index}>
                            <div className={"olan"} style={{
            justifyContent: "space-between"
          }}>
                                {rate.name}
                                <div style={{
              background: rate.price === "0.00" || rate.price === "Free" ? '#AFFEBF' : '#f0f0f0',
              padding: "2px 24px",
              borderRadius: "15px"
            }}>
                                    {rate.price === "0.00" || rate.price === "Free" ? "Free" : `${rate.price}`}
                                </div>
                            </div>
                            <div className={"line"}></div>
                        </div>)}
                    <div className={"olan"} onClick={handleOpenModal} style={{
          cursor: 'pointer'
        }}>
                        <FiPlus className="icon" />{t("add_rate")}</div>
                    {/* Yeni eklenen buton: Input olmadan oran ekler */}
                    <div className={"olan"} onClick={handleAddFreeRate} style={{
          cursor: 'pointer'
        }}>
                        <FiPlus className="icon" />{t("add_free_rate")}</div>
                </div>
            </div>

            {isModalOpen && <div className="modal-overlay">
                    <div className="modal-content">
                        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          background: "#F1F1F1"
        }}><h3>{t("add_rate")}</h3></div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label style={{
              marginTop: '20px'
            }}>{t("rate_type")}</label>
                                <select name="rateType" value={formData.rateType} onChange={handleChange}>
                                    <option value="flat">{t("use_flat_rate")}</option>
                                    <option value="custom">{t("custom")}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t("shipping_rate")}</label>
                                <select name="rateType" value={formData.rateType} onChange={handleChange}>
                                    <option value="custom">{t("custom")}</option>
                                    <option value="flat">{t("use_flat_rate")}</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t("custom_rate_name")}</label>
                                <input type="text" name="customRateName" value={formData.customRateName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>{t("custom_delivery_description_optional")}</label>
                                <textarea name="customDescription" value={formData.customDescription} onChange={handleChange} />
                            </div>
                            <div className="form-group price-group">
                                <div>
                                    <label>{t("price")}</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" />
                                </div>
                            </div>
                            <div className="form-group">
                                <span className="add-conditional">{t("add_conditional_pricing")}</span>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={handleCloseModal}>{t("cancel")}</button>
                                <button type="submit" className="done-button">{t("done")}</button>
                            </div>
                        </form>
                    </div>
                </div>}
        </section>;
}
export default AdminShippingAndDeliveryMenu;