import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import { FiPlus } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import html2canvas from "html2canvas";
import image1 from "/src/assets/static.png";
// Eğer react-spinners yüklüyse buradan PulseLoader'ı import edebilirsiniz
import { PulseLoader } from 'react-spinners';
import Cookies from "js-cookie";
import {useDeleteProductMutation, useGetAllProductsByMarketIdQuery} from "../../../../service/userApi.js";
// Sabit ürün logo url'niz
import { PRODUCT_LOGO } from "../../../../../constants.js";
import {toast, ToastContainer} from "react-toastify";

function AdminProductsMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isScreenshotMode, setScreenshotMode] = useState(false);

    // API'den ürünleri çekiyoruz
    const { data: getAllProductsByMarketId, refetch, isLoading } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProductsByMarketId?.data;

    useEffect(() => {
        refetch();
    }, [refetch, location]);

    const [deleteProduct] = useDeleteProductMutation()

    const handleDelete = async (id) => {
        const marketId = Cookies.get('chooseMarket');
        try {
            const response = await deleteProduct({marketId, id}).unwrap()
            if(response.statusCode === 200) {
                refetch()
                toast.success('Mehsul ugurla silindi!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        } catch (error) {
            toast.error('Xeta bas verdi!', {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
    };

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

    if (isLoading) {
        return (
            <div className="loaderContainer">
                <h2>Səhifə yüklənir...</h2>
                <PulseLoader />
            </div>
        );
    }

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
                            <td style={{ fontWeight: "600" }} className={"deleteWrapper"}>Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="checkboxWrapper">
                                    <input type="checkbox" />
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product.id}`)}>
                                    {!isScreenshotMode ? (
                                        <img
                                            className="image"
                                            src={PRODUCT_LOGO + product.imageNames[0]}
                                            alt="Product"
                                        />
                                    ) : (
                                        <img className="image" src={image1} alt="Static Product" />
                                    )}
                                    {product.title.slice(0,10)}...
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product.id}`)}>
                                    {product.status ? (
                                        <span className="status">
                        <GoDotFill className="dot" /> Active
                      </span>
                                    ) : (
                                        <span className="status statusDont">
                        <GoDotFill className="dot" /> Deactive
                      </span>
                                    )}
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product.id}`)}>
                                    {product.isStock ? product.stock : 'Out of stock'}
                                </td>
                                <td className={"deleteWrapper"}>
                                    <button onClick={() => handleDelete(product.id)} className={"deleteBtn1"}>
                                        Delete
                                    </button>
                                </td>
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
            <ToastContainer />
        </section>
    );
}

export default AdminProductsMenu;
