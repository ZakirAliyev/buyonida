import "./index.scss";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useGetAllProductsByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../../constants.js";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import image1 from "/src/assets/static.png";

function AdminProductsMenu() {
    const navigate = useNavigate();
    const { data: getAllProductsByMarketId } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProductsByMarketId?.data;
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isScreenshotMode, setScreenshotMode] = useState(false);

    const takeScreenshot = () => {
        setScreenshotMode(true);
        setTimeout(() => {
            if (captureRef.current) {
                html2canvas(captureRef.current).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    setImage(imgData);
                    setScreenshotMode(false);
                });
            }
        }, 0);
    };

    return (
        <section id="adminProductsMenu" ref={captureRef}>
            {products && products.length !== 0 ? (
                <>
                    <div className="textWrapper">
                        <h2>Products</h2>
                        <button onClick={() => navigate('/cp/add-product')}>
                            Create product
                        </button>
                    </div>
                    <table>
                        <thead>
                        <tr className="first">
                            <th>
                                <button>All products</button>
                            </th>
                        </tr>
                        <tr className="bgbg">
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td>
                                <span style={{ fontWeight: "600" }}>Image</span>
                                <span style={{ fontWeight: "600", marginLeft: "33px" }}>Title</span>
                            </td>
                            <td style={{ fontWeight: "600" }}>Status</td>
                            <td style={{ fontWeight: "600" }}>Inventory</td>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product?.id}>
                                <td className="checkboxWrapper">
                                    <input type="checkbox" />
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product?.id}`)}>
                                    {/* Eğer screenshot modu aktifse statik resmi göster */}
                                    {!isScreenshotMode ? (
                                        <img
                                            className="image"
                                            src={PRODUCT_LOGO + product?.imageNames[0]}
                                            alt="Product"
                                        />
                                    ) : (
                                        <img className="image" src={image1} alt="Static Product" />
                                    )}
                                    {product?.title}
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product?.id}`)}>
                                    {product?.status ? (
                                        <span className="status">
                                                <GoDotFill className="dot" /> Active
                                            </span>
                                    ) : (
                                        <span className="status statusDont">
                                                <GoDotFill className="dot" /> Deactive
                                            </span>
                                    )}
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${product?.id}`)}>5</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="wrapper">
                    <div className="box">
                        <h2>Create your products</h2>
                        <p>Start by stocking your store with products your customers will love</p>
                        <button onClick={() => navigate("/cp/add-product")}>
                            <FiPlus />
                            Create product
                        </button>
                    </div>
                    <img src={image1} alt="Background" />
                </div>
            )}
            {image && (
                <div>
                    <a href={image} download="screenshot.png">
                        İndir
                    </a>
                </div>
            )}
            <button onClick={takeScreenshot}>Screenshot Al</button>
        </section>
    );
}

export default AdminProductsMenu;
