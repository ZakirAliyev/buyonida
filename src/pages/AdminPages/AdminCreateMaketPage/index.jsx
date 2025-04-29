import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image1 from "/src/assets/sariLogo.png";
import { useGetAllSectorsQuery } from "../../../service/userApi.js";
import { SECTOR_LOGO } from "../../../../constants.js";

function AdminCreateMaketPage() {
    const [marketName, setMarketName] = useState('');
    const [selectedSector, setSelectedSector] = useState(null);
    const navigate = useNavigate();

    const { data: getAllSectors } = useGetAllSectorsQuery();
    const sectors = getAllSectors?.data;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!marketName || !selectedSector) {
            toast.error("Zəhmət olmasa həm mağaza adını daxil edin, həm də sahəni seçin", {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            return;
        }
        // Create a FormData instance and append the collected data
        const formData = new FormData();
        formData.append('name', marketName);
        formData.append('sectorId', selectedSector.id);
        // Since FormData is not cloneable for navigation state,
        // we convert it to a plain object.
        const formDataObj = Object.fromEntries(formData.entries());
        // Navigate to the finish page, passing the plain object.
        navigate("/create-market-finish", { state: formDataObj });
    };

    return (
        <section id="adminCreateMaketPage">
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Mağazan üçün ad seçək</h2>
                    <h3>
                        Mağazan üçün bir ad seç, narahat olma, sonradan dəyişdirə biləcəksən
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="marketWrapper">
                        <input
                            placeholder="Market name..."
                            value={marketName}
                            onChange={(e) => setMarketName(e.target.value)}
                        />
                        <div
                            style={{
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "20px",
                                marginTop: "20px",
                            }}
                        >
                            Sahəni seç
                        </div>
                        <div className="aminake row">
                            {sectors &&
                                sectors.map((sector) => (
                                    <div
                                        key={sector.id}
                                        className={`qwe col-3 ${
                                            selectedSector?.id === sector.id ? "selected1" : "noSelected"
                                        }`}
                                        onClick={() => setSelectedSector(sector)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="asdasd">
                                            <img
                                                src={SECTOR_LOGO + sector.imageName}
                                                alt={sector.name}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                marginTop: "-10px",
                                                padding: "2px 10px",
                                                borderRadius: "5px",
                                                fontSize: "10px",
                                                width: "max-content",
                                                textAlign: "center",
                                            }}
                                            className="ad"
                                        >
                                            {sector.title}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <button type="submit">İleri</button>
                </form>
                <div className="links">
                    <Link to={'/help'} className={"link"}>Help</Link>
                    <Link to={'/privacy'} className={"link"}>Privacy</Link>
                    <Link to={'/terms'} className={"link"}>Terms</Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default AdminCreateMaketPage;
