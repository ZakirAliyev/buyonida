import {useTranslation} from "react-i18next";
import './index.scss';
import {BiChevronRight} from "react-icons/bi";
import {FaMeta} from "react-icons/fa6";
import {useState} from 'react';
import {useGetStoreByIdQuery, usePostMetaPixelIdMutation} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import {PulseLoader} from "react-spinners";

function AdminAnalyticsIntegrationMenu() {
    const {t} = useTranslation();
    const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);
    const [pixelFormData, setPixelFormData] = useState({pixelId: ''});
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false); // delete için ayrı loading

    const marketId = parseInt(Cookies.get("chooseMarket"), 10);
    const {data: getStoreById, refetch, isFetching} = useGetStoreByIdQuery(marketId);
    const store = getStoreById?.data;
    const currentPixelId = store?.facebookPixelId;

    const [postMetaPixelId] = usePostMetaPixelIdMutation();

    const handleOpenPixelModal = () => setIsPixelModalOpen(true);
    const handleClosePixelModal = () => {
        setIsPixelModalOpen(false);
        setPixelFormData({pixelId: ''});
    };

    const handlePixelChange = (e) => {
        const {name, value} = e.target;
        setPixelFormData((prev) => ({...prev, [name]: value}));
    };

    const handlePixelSubmit = async (e) => {
        e.preventDefault();
        if (!marketId || !pixelFormData.pixelId) {
            toast.error("Market ID veya Pixel ID eksik!");
            return;
        }

        setLoading(true);
        try {
            const response = await postMetaPixelId({
                marketId,
                facebookId: pixelFormData.pixelId,
            }).unwrap();

            if (response?.statusCode === 200) {
                toast.success(t("added_successfully"), {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark"
                });
                await refetch();
                handleClosePixelModal();
            }
        } catch (error) {
            console.error("Error submitting Pixel ID:", error);
            toast.error(t("an_error_occurred"));
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePixel = async () => {
        if (!marketId) {
            toast.error("Market ID eksik!");
            return;
        }

        setDeleteLoading(true);
        try {
            const response = await postMetaPixelId({
                marketId,
                facebookId: null, // Burada null gönderiyoruz
            }).unwrap();

            if (response?.statusCode === 200) {
                toast.success(t("deleted_successfully"), {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark"
                });
                await refetch();
            }
        } catch (error) {
            console.error("Error deleting Pixel ID:", error);
            toast.error(t("an_error_occurred"));
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <section id="adminAnalyticsIntegrationMenu">
            <h2>{t("analytics_integration")}</h2>
            <div className="box wrapper">
                <div className="storeDetails">{t("add_or_change_integration")}</div>
                <div className="boz">
                    {t("you_can_integrate_analytics_systems_from_major_companies_like_meta,_google,_and_others_here_to_boost_your_sales")}
                </div>
                <div className="box wrapper" style={{padding: "16px"}}>
                    <div className="padding" style={{cursor: currentPixelId ? "default" : "pointer"}}
                         onClick={!currentPixelId ? handleOpenPixelModal : undefined}>
                        <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
                            <FaMeta/> Meta Pixel
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "16px"}}>

                            {currentPixelId ? (
                                <button
                                    className="delete-button"
                                    onClick={handleDeletePixel}
                                    disabled={deleteLoading || isFetching}
                                    style={{
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "2px 16px",
                                        borderRadius: "4px",
                                        cursor: deleteLoading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {deleteLoading ? <PulseLoader size={6} color={"white"}/> : t("delete")}
                                </button>
                            ) : (
                                <div className="policy">
                                    {t("no_add_yet")}
                                </div>
                            )}
                            {!currentPixelId && <BiChevronRight/>}
                        </div>
                    </div>
                </div>
            </div>

            {isPixelModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{t("add_meta_pixel")}</h3>
                            <button className="modal-close-button" onClick={handleClosePixelModal}>×</button>
                        </div>
                        <form onSubmit={handlePixelSubmit} className="form">
                            <div className="form-group">
                                <label>Pixel ID</label>
                                <input
                                    type="text"
                                    name="pixelId"
                                    value={pixelFormData.pixelId}
                                    onChange={handlePixelChange}
                                    placeholder={t("enter_pixel_id")}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-button" onClick={handleClosePixelModal}>
                                    {t("cancel")}
                                </button>
                                <button type="submit" className="saveButton" disabled={loading}>
                                    {loading ? <PulseLoader size={8} color={"white"}/> : t("save")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </section>
    );
}

export default AdminAnalyticsIntegrationMenu;
