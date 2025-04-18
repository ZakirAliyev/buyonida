import './index.scss';
import aze from "../../../../assets/aze.png";
import { FiPlus } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useState } from 'react';

function AdminShippingAndDeliveryMenu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        rateType: 'flat',
        customRateName: '',
        customDescription: '',
        price: '0.00',
    });
    // Eklenen state: Mevcut oranları saklamak için
    const [rates, setRates] = useState([
        { name: "Standart", price: "Free" }
    ]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            rateType: 'flat',
            customRateName: '',
            customDescription: '',
            price: '0.00',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submit edildiğinde oranları güncelle
        setRates((prev) => [
            ...prev,
            { name: formData.customRateName || "Custom", price: formData.price }
        ]);
        handleCloseModal();
    };

    // Yeni işlev: Input olmadan direkt "Free" oran ekler
    const handleAddFreeRate = () => {
        setRates((prev) => [
            ...prev,
            { name: "Free Shipping", price: "0.00" }
        ]);
    };

    return (
        <section id={"adminShippingAndDeliveryMenu"}>
            <h2>Shipping and Delivery</h2>
            <div className={"box wrapper"}>
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>Fulfillment location</div>
                    <div className={"olan"}>
                        <div>Shop Location</div>
                        <div className={"country-name"}>Azerbaijan</div>
                    </div>
                    <div className={"bozolan"}>Shipping zones</div>
                    <div className={"olan"}>
                        <img src={aze} alt={"Image"} />
                        <div>Domestic</div>
                        <GoDotFill style={{ color: "#ccc", fontSize: "10px" }} />
                        <div>Azerbaijan</div>
                    </div>
                    <div className={"line"}></div>
                    {/* Mevcut oranları göster */}
                    {rates.map((rate, index) => (
                        <div key={index}>
                            <div className={"olan"} style={{ justifyContent: "space-between" }}>
                                {rate.name}
                                <div style={{
                                    background: rate.price === "0.00" || rate.price === "Free" ? '#AFFEBF' : '#f0f0f0',
                                    padding: "2px 24px",
                                    borderRadius: "15px",
                                }}>
                                    {rate.price === "0.00" || rate.price === "Free" ? "Free" : `${rate.price}`}
                                </div>
                            </div>
                            <div className={"line"}></div>
                        </div>
                    ))}
                    <div className={"olan"} onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                        <FiPlus className="icon" />
                        Add rate
                    </div>
                    {/* Yeni eklenen buton: Input olmadan oran ekler */}
                    <div className={"olan"} onClick={handleAddFreeRate} style={{ cursor: 'pointer' }}>
                        <FiPlus className="icon" />
                        Add Free Rate
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'center',
                            background: "#F1F1F1",
                        }}><h3>Add rate</h3></div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label style={{ marginTop: '20px' }}>Rate type</label>
                                <select name="rateType" value={formData.rateType} onChange={handleChange}>
                                    <option value="flat">Use flat rate</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Shipping rate</label>
                                <select name="rateType" value={formData.rateType} onChange={handleChange}>
                                    <option value="custom">Custom</option>
                                    <option value="flat">Use flat rate</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Custom rate name</label>
                                <input
                                    type="text"
                                    name="customRateName"
                                    value={formData.customRateName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Custom delivery description (optional)</label>
                                <textarea
                                    name="customDescription"
                                    value={formData.customDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group price-group">
                                <div>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <span className="add-conditional">Add conditional pricing</span>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="done-button">
                                    Done
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default AdminShippingAndDeliveryMenu;