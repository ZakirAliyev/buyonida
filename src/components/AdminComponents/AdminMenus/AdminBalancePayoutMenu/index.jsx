import './index.scss';
import aze from "../../../../assets/aze.png";
import { FiPlus } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useState } from 'react';
import {AiOutlineExclamationCircle} from "react-icons/ai";

function AdminBalancePayoutMenu() {
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
        <section id={"adminBalancePayoutMenu"}>
            <h2>Balances</h2>
            <div className={"box wrapper"}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom :'20px'
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <h3>Bank details</h3>
                        <AiOutlineExclamationCircle/>
                    </div>
                    <button style={{
                        border: '1px solid #E4E4E4',
                        padding: "5px 24px",
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }}>See details</button>
                </div>
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>Payout period</div>
                    <div className={"olan"}>
                        <div>17.04.2025</div>
                    </div>
                </div>
            </div>
            <div className={"box wrapper"}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom :'20px'
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <h4>Balance summary</h4>
                        <AiOutlineExclamationCircle/>
                    </div>
                    <button style={{
                        border: '1px solid #E4E4E4',
                        padding: "5px 24px",
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }}>See details</button>
                </div>
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>Payout period</div>
                    <div className={"olan"}>
                        <div>17.04.2025</div>
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

export default AdminBalancePayoutMenu;