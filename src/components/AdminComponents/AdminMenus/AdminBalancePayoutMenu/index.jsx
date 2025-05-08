import {useTranslation} from "react-i18next";
import './index.scss';
import {useState} from 'react';
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Tabs, Placeholder} from 'rsuite';
import {HiOutlinePlusSm} from "react-icons/hi";
import {FaManatSign} from "react-icons/fa6";
import {CiExport} from "react-icons/ci";
import {useGetStoreByIdQuery, usePostMarketCardStartMutation} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {PulseLoader} from "react-spinners";

function AdminBalancePayoutMenu() {
    const {
        t
    } = useTranslation();
    const { data: getStoreById } = useGetStoreByIdQuery(Cookies.get('chooseMarket'), {
        refetchOnMountOrArgChange: true,
    });
    const store = getStoreById?.data;
    const [postMarketCardStart] = usePostMarketCardStartMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    // Add state for bank details modal
    const [isBankDetailsModalOpen, setIsBankDetailsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        rateType: 'flat',
        customRateName: '',
        customDescription: '',
        price: '0.00'
    });
    const [dateFormData, setDateFormData] = useState({
        date: ''
    });
    const [amountFormData, setAmountFormData] = useState({
        amount: '0.00'
    });
    const [statusFormData, setStatusFormData] = useState({
        status: 'Paid'
    });
    const [rates, setRates] = useState([{
        name: "Standart",
        price: "Free"
    }]);
    const [activeTab, setActiveTab] = useState('1');
    const [exportDateRange, setExportDateRange] = useState('current_month');

    // Sample payout data to match the image
    const payouts = [{
        amount: "0.00",
        status: "Paid",
        bank: "TRANSFERWISE EUROPE SA/NV •••• 0875",
        arriveBy: "Apr 17, 2025"
    }, {
        amount: "0.00",
        status: "Paid",
        bank: "TRANSFERWISE EUROPE SA/NV •••• 0875",
        arriveBy: "Apr 17, 2025"
    }, {
        amount: "0.00",
        status: "Paid",
        bank: "TRANSFERWISE EUROPE SA/NV •••• 0875",
        arriveBy: "Apr 17, 2025"
    }, {
        amount: "0.00",
        status: "Paid",
        bank: "TRANSFERWISE EUROPE SA/NV •••• 0875",
        arriveBy: "Apr 17, 2025"
    }];

    // Sample bank details data to match the image
    const bankDetails = {
        voen: "Apr 17, 2025",
        bank: "po_1PYeBFKRfKMk4gq4Fee5RN0cEX",
        bankVoen: "po_1PYeBFKRfKMk4gq4Fee5RN0cEX",
        kod: "01F0209241861BHX",
        myh: "0.00",
        swiftBik: "0.00",
        hh: "0.00"
    };
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
    const handleOpenDateModal = () => {
        setIsDateModalOpen(true);
    };
    const handleCloseDateModal = () => {
        setIsDateModalOpen(false);
        setDateFormData({
            date: ''
        });
    };
    const handleOpenAmountModal = () => {
        setIsAmountModalOpen(true);
    };
    const handleCloseAmountModal = () => {
        setIsAmountModalOpen(false);
        setAmountFormData({
            amount: '0.00'
        });
    };
    const handleOpenStatusModal = () => {
        setIsStatusModalOpen(true);
    };
    const handleCloseStatusModal = () => {
        setIsStatusModalOpen(false);
        setStatusFormData({
            status: 'Paid'
        });
    };
    const handleOpenExportModal = () => {
        setIsExportModalOpen(true);
    };
    const handleCloseExportModal = () => {
        setIsExportModalOpen(false);
        setExportDateRange('current_month');
    };

    // Add handlers for bank details modal
    const handleOpenBankDetailsModal = () => {
        setIsBankDetailsModalOpen(true);
    };
    const handleCloseBankDetailsModal = () => {
        setIsBankDetailsModalOpen(false);
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
    const handleDateChange = e => {
        const {
            name,
            value
        } = e.target;
        setDateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAmountChange = e => {
        const {
            name,
            value
        } = e.target;
        setAmountFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleStatusChange = e => {
        const {
            name,
            value
        } = e.target;
        setStatusFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = e => {
        e.preventDefault();
        setRates(prev => [...prev, {
            name: formData.customRateName || "Custom",
            price: formData.price
        }]);
        handleCloseModal();
    };
    const handleDateSubmit = e => {
        e.preventDefault();
        handleCloseDateModal();
    };
    const handleAmountSubmit = e => {
        e.preventDefault();
        handleCloseAmountModal();
    };
    const handleStatusSubmit = e => {
        e.preventDefault();
        handleCloseStatusModal();
    };
    const handleAddFreeRate = () => {
        setRates(prev => [...prev, {
            name: "Free Shipping",
            price: "0.00"
        }]);
    };
    const handleExportSubmit = e => {
        e.preventDefault();
        handleCloseExportModal();
    };
    const [loading, setLoading] = useState(false);

    async function handleAddCard() {
        const marketId = parseInt(Cookies.get("chooseMarket"), 10); // parse as integer base 10
        if (isNaN(marketId)) {
            console.error("Invalid marketId");
            return;
        }
        setLoading(true);
        try {
            const response = await postMarketCardStart({ marketId }).unwrap();
            console.log(response);
            if (response?.redirectUrl) {
                window.location.href = response.redirectUrl; // Same page redirect
            } else {
                console.error("No redirectUrl in response");
            }
        } catch (error) {
            console.error("Error adding card:", error);
        } finally {
            setLoading(false); // Always set loading to false after try/catch
        }
    }

    return <section id={"adminBalancePayoutMenu"}>
        <h2>{t("balances")}</h2>
        <div className={"box wrapper"}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: '10px'
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <h2 style={{
                        fontSize: '18px'
                    }}>{t("bank_details")}</h2>
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
                }} onClick={handleOpenBankDetailsModal} // Add onClick to open bank details modal
                >{t("see_details")}</button>
            </div>
            {!store?.cardId ? (
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>{t("add_your_business_card")}</div>
                    <button onClick={() => handleAddCard()}>
                        {loading ? <PulseLoader size={10} color={"gray"}/> : <div>{t("add")}</div>}
                    </button>
                </div>
            ) : (
                <div className={"asdasdasdasd"}>
                    <div className={"bozolan"}>{t("your_business_card_is_ready")}</div>
                    <button onClick={() => handleAddCard()}>
                        {loading ? <PulseLoader size={10} color={"gray"}/> : <div>{t("change")}</div>}
                    </button>
                </div>
            )}
        </div>

        <div className={"wrapper"} style={{
            marginTop: '24px'
        }}>
            <Tabs activeKey={activeTab} appearance="subtle" onSelect={setActiveTab}>
                <Tabs.Tab eventKey="1" title="Overview">
                    <h5>{t("balance_summary")}</h5>
                    <div className={"summary"}></div>
                    <div className={"squareWrapper"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <div className={"square"}></div>
                            <div className={"text"}>{t("incoming")}</div>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <FaManatSign style={{
                                marginBottom: '3px'
                            }}/>{t("0_00")}</div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"squareWrapper"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <div className={"square square1"}></div>
                            <div className={"text"}>{t("available")}</div>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <FaManatSign style={{
                                marginBottom: '3px'
                            }}/>{t("0_00")}</div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"payoutsWrapper"}>
                        <div className={"payoutWrapper"}>
                            <h5 style={{
                                margin: '0'
                            }}>{t("payout")}</h5>
                            <div className={"view"} onClick={() => setActiveTab('2')}>{t("view_all_payouts")}</div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"payoutsHeader"}>
                            <div className={"payoutsHeaderItem"}>{t("amount")}</div>
                            <div className={"payoutsHeaderItem"}>{t("status")}</div>
                            <div className={"payoutsHeaderItem"}>{t("bank_card")}</div>
                            <div className={"payoutsHeaderItem"} style={{
                                textAlign: 'end'
                            }}>{t("arrive_by")}</div>
                        </div>
                        <div className={"line"}></div>
                        {payouts.map((payout, index) => <div key={index} className={"payoutRow"}>
                            <div className={"payoutItem"}>
                                <FaManatSign style={{
                                    marginBottom: '3px',
                                    marginRight: '5px'
                                }}/>
                                {payout.amount}
                            </div>
                            <div className={"payoutItem statusItem"}>
                                <span className={"statusBadge"}>{payout.status}</span>
                            </div>
                            <div className={"payoutItem"}>{payout.bank}</div>
                            <div className={"payoutItem payoutItem1"}>{payout.arriveBy}</div>
                        </div>)}
                    </div>
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Payouts">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <div className={"dateAmountStatusWrapper"}>
                            <div className={"dateAmountStatus"} onClick={handleOpenDateModal}>
                                <HiOutlinePlusSm className={"icon"}/>
                                <div>{t("date")}</div>
                            </div>
                            <div className={"dateAmountStatus"} onClick={handleOpenAmountModal}>
                                <HiOutlinePlusSm className={"icon"}/>
                                <div>{t("amount")}</div>
                            </div>
                            <div className={"dateAmountStatus"} onClick={handleOpenStatusModal}>
                                <HiOutlinePlusSm className={"icon"}/>
                                <div>{t("status")}</div>
                            </div>
                        </div>
                        <button style={{
                            border: '1px solid #E4E4E4',
                            padding: "5px 16px",
                            borderRadius: '5px',
                            backgroundColor: 'white',
                            fontSize: '14px',
                            fontWeight: '500',
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            gap: '10px',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "max-content"
                        }} onClick={handleOpenExportModal}>
                            <CiExport/>
                            <span>{t("export")}</span>
                        </button>
                    </div>
                    <div className={"line"}></div>
                    <div className={"payoutsWrapper"}>
                        <div className={"payoutsHeader"}>
                            <div className={"payoutsHeaderItem"}>{t("amount")}</div>
                            <div className={"payoutsHeaderItem"}>{t("status")}</div>
                            <div className={"payoutsHeaderItem"}>{t("bank_card")}</div>
                            <div className={"payoutsHeaderItem"}>{t("arrive_by")}</div>
                        </div>
                        <div className={"line"}></div>
                        {payouts.map((payout, index) => <div key={index} className={"payoutRow"}>
                            <div className={"payoutItem"}>
                                <FaManatSign style={{
                                    marginBottom: '3px',
                                    marginRight: '5px'
                                }}/>
                                {payout.amount}
                            </div>
                            <div className={"payoutItem statusItem"}>
                                <span className={"statusBadge"}>{payout.status}</span>
                            </div>
                            <div className={"payoutItem"}>{payout.bank}</div>
                            <div className={"payoutItem"}>{payout.arriveBy}</div>
                        </div>)}
                    </div>
                    <div className={"paginationWrapper"}>
                        <span>{t("44_results")}</span>
                        <div className={"paginationButtons"}>
                            <button>{t("previous")}</button>
                            <button>{t("next")}</button>
                        </div>
                    </div>
                </Tabs.Tab>
            </Tabs>
        </div>

        {isModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    background: "#F1F1F1"
                }}>
                    <h3>{t("add_rate")}</h3>
                </div>
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
                        <input type="text" name="customRateName" value={formData.customRateName}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>{t("custom_delivery_description_optional")}</label>
                        <textarea name="customDescription" value={formData.customDescription} onChange={handleChange}/>
                    </div>
                    <div className="form-group price-group">
                        <div>
                            <label>{t("price")}</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01"
                                   min="0"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <span className="add-conditional">{t("add_conditional_pricing")}</span>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button"
                                onClick={handleCloseModal}>{t("cancel")}</button>
                        <button type="submit" className="done-button">{t("done")}</button>
                    </div>
                </form>
            </div>
        </div>}

        {isDateModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    background: "#F1F1F1"
                }}>
                    <h3>{t("filter_by_date")}</h3>
                </div>
                <form onSubmit={handleDateSubmit}>
                    <div className="form-group">
                        <label style={{
                            marginTop: '20px'
                        }}>{t("date")}</label>
                        <input type="date" name="date" value={dateFormData.date} onChange={handleDateChange}/>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button"
                                onClick={handleCloseDateModal}>{t("cancel")}</button>
                        <button type="submit" className="done-button">{t("done")}</button>
                    </div>
                </form>
            </div>
        </div>}

        {isAmountModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    background: "#F1F1F1"
                }}>
                    <h3>{t("filter_by_amount")}</h3>
                </div>
                <form onSubmit={handleAmountSubmit}>
                    <div className="form-group">
                        <label style={{
                            marginTop: '20px'
                        }}>{t("amount")}</label>
                        <input type="number" name="amount" value={amountFormData.amount} onChange={handleAmountChange}
                               step="0.01" min="0"/>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button"
                                onClick={handleCloseAmountModal}>{t("cancel")}</button>
                        <button type="submit" className="done-button">{t("done")}</button>
                    </div>
                </form>
            </div>
        </div>}

        {isStatusModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    background: "#F1F1F1"
                }}>
                    <h3>{t("filter_by_status")}</h3>
                </div>
                <form onSubmit={handleStatusSubmit}>
                    <div className="form-group">
                        <label style={{
                            marginTop: '20px'
                        }}>{t("status")}</label>
                        <select name="status" value={statusFormData.status} onChange={handleStatusChange}>
                            <option value="Paid">{t("paid")}</option>
                            <option value="Pending">{t("pending")}</option>
                            <option value="Failed">{t("failed")}</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button"
                                onClick={handleCloseStatusModal}>{t("cancel")}</button>
                        <button type="submit" className="done-button">{t("done")}</button>
                    </div>
                </form>
            </div>
        </div>}

        {isExportModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    background: "#F1F1F1"
                }}>
                    <h3>{t("export_payouts")}</h3>
                </div>
                <form onSubmit={handleExportSubmit}>
                    <div className="form-group">
                        <label style={{
                            marginTop: '20px',
                            fontWeight: 'bold'
                        }}>{t("date_range")}</label>
                        <div className="export-date-range">
                            <label className="export-date-label">
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    <input type="radio" name="dateRange" value="today"
                                           checked={exportDateRange === 'today'}
                                           onChange={e => setExportDateRange(e.target.value)}/>
                                    <span>{t("today")}</span>
                                </div>
                                <span className="date-range-value">{t("apr_17_2025")}</span>
                            </label>
                            <label className="export-date-label">
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    <input type="radio" name="dateRange" value="today"
                                           checked={exportDateRange === 'today'}
                                           onChange={e => setExportDateRange(e.target.value)}/>
                                    <span>{t("today")}</span>
                                </div>
                                <span className="date-range-value">{t("apr_17_2025")}</span>
                            </label>
                            <label className="export-date-label">
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    <input type="radio" name="dateRange" value="today"
                                           checked={exportDateRange === 'today'}
                                           onChange={e => setExportDateRange(e.target.value)}/>
                                    <span>{t("today")}</span>
                                </div>
                                <span className="date-range-value">{t("apr_17_2025")}</span>
                            </label>
                            <label className="export-date-label">
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    <input type="radio" name="dateRange" value="today"
                                           checked={exportDateRange === 'today'}
                                           onChange={e => setExportDateRange(e.target.value)}/>
                                    <span>{t("today")}</span>
                                </div>
                                <span className="date-range-value">{t("apr_17_2025")}</span>
                            </label>
                            <label className="export-date-label">
                                <div style={{
                                    display: 'flex',
                                    alignItems: "center",
                                    gap: '10px'
                                }}>
                                    <input type="radio" name="dateRange" value="today"
                                           checked={exportDateRange === 'today'}
                                           onChange={e => setExportDateRange(e.target.value)}/>
                                    <span>{t("today")}</span>
                                </div>
                                <span className="date-range-value">{t("apr_17_2025")}</span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label style={{
                            fontWeight: 'bold'
                        }}>{t("columns")}</label>
                        <div className="export-columns">
                            <select>
                                <option>{t("default_13")}</option>
                            </select>
                        </div>
                        <div
                            className="columns-info">{t("id_amount_created_utc_currency_arrival_date_utc_source_type_status_type_method_balance_transaction_destination_name_destination_country_destination_last_4")}</div>
                    </div>
                    <div className="form-group">
                        <a href="#"
                           className="payout-reconciliation-link">{t("for_more_details_go_to")}<span>{t("payout_reconciliation_report")}</span>
                        </a>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button"
                                onClick={handleCloseExportModal}>{t("cancel")}</button>
                        <button type="submit" className="done-button">{t("export")}</button>
                    </div>
                </form>
            </div>
        </div>}

        {/* Add Bank Details Modal */}
        {isBankDetailsModalOpen && <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{t("bank_details")}</h3>
                    <button className="modal-close-button" onClick={handleCloseBankDetailsModal}>{t("")}</button>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("v_en")}</label>
                    <input type="text" value={bankDetails.voen} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("bank")}</label>
                    <input type="text" value={bankDetails.bank} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("bank_v_en")}</label>
                    <input type="text" value={bankDetails.bankVoen} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("kod")}</label>
                    <input type="text" value={bankDetails.kod} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("m_y")}</label>
                    <input type="text" value={bankDetails.myh} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("swift_bik")}</label>
                    <input type="text" value={bankDetails.swiftBik} readOnly className="readonly-input"/>
                </div>
                <div className="form-group">
                    <label style={{
                        fontWeight: 'bold'
                    }}>{t("h_h")}</label>
                    <input type="text" value={bankDetails.hh} readOnly className="readonly-input"/>
                </div>
                <div className="modal-actions">
                    <button type="button" className="done-button" style={{
                        width: '436px'
                    }} onClick={handleCloseBankDetailsModal}>{t("save")}</button>
                </div>
            </div>
        </div>}
    </section>;
}

export default AdminBalancePayoutMenu;