import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import { FiPlus } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import html2canvas from "html2canvas";
import image1 from "/src/assets/static.png";
import { PulseLoader } from 'react-spinners';
import Cookies from "js-cookie";
import { useDeleteProductMutation, useGetAllProductsByMarketIdQuery } from "../../../../service/userApi.js";
import { PRODUCT_LOGO } from "../../../../../constants.js";
import { toast, ToastContainer } from "react-toastify";

function AdminProductsMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isScreenshotMode, setScreenshotMode] = useState(false);

    // API'den ürünleri çekiyoruz
    const { data: getAllProductsByMarketId, refetch, isLoading } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProductsByMarketId?.data || [];

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    // Calculate pagination data
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate the range of page numbers to display (max 5 pages)
    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    // Adjust startPage if endPage is at totalPages to ensure 5 pages are shown when possible
    if (endPage - startPage + 1 < maxPageNumbers && startPage > 1) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle Previous and Next buttons
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        refetch();
    }, [refetch, location]);

    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id) => {
        const marketId = Cookies.get('chooseMarket');
        try {
            const response = await deleteProduct({ marketId, id }).unwrap();
            if (response.statusCode === 200) {
                refetch();
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
                // Adjust current page if necessary
                if (currentProducts.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
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
            {currentProducts && currentProducts.length !== 0 ? (
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
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="checkboxWrapper">
                                    <input type="checkbox" />
                                </td>
                                <td onClick={() => navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product.id}`)}>
                                    {!isScreenshotMode ? (
                                        <img
                                            className="image"
                                            src={product.imageNames && product.imageNames.length > 0 ? PRODUCT_LOGO + product.imageNames[0] : image1}
                                            alt="Product"
                                        />
                                    ) : (
                                        <img className="image" src={image1} alt="Static Product" />
                                    )}
                                    {product.title.slice(0, 10)}...
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
                    {totalProducts > productsPerPage && (
                        <div className="pagination">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="page-btn"
                            >
                                Previous
                            </button>
                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="page-btn"
                            >
                                Next
                            </button>
                        </div>
                    )}
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