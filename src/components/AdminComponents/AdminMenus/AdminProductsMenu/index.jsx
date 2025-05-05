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
import {LuFilter} from "react-icons/lu";
import {ImSortAmountDesc} from "react-icons/im";

function AdminProductsMenu() {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const sortRef = useRef(null);
    const filterRef = useRef(null);

    // State for filter values
    const [priceRange, setPriceRange] = useState(10000);
    const [stockStatus, setStockStatus] = useState({ inStock: false, outOfStock: false });
    const [productStatus, setProductStatus] = useState('');

    // State for sort selection
    const [sortOption, setSortOption] = useState('');

    // State for filtered and sorted products
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isScreenshotMode, setScreenshotMode] = useState(false);

    const { data: getAllProductsByMarketId, refetch, isLoading } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProductsByMarketId?.data || [];

    // Initialize filteredProducts with all products
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    // Toggle sort dropdown visibility
    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen);
    };

    // Toggle filter dropdown visibility
    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Apply filters and sort
    const applyFiltersAndSort = () => {
        let filtered = [...products];

        // Apply filters
        if (priceRange !== 10000) {
            filtered = filtered.filter(product => product.price <= priceRange);
        }

        if (stockStatus.inStock || stockStatus.outOfStock) {
            filtered = filtered.filter(product => {
                if (stockStatus.inStock && stockStatus.outOfStock) return true;
                if (stockStatus.inStock) return product.isStock;
                if (stockStatus.outOfStock) return !product.isStock;
                return true;
            });
        }

        if (productStatus) {
            filtered = filtered.filter(product => {
                if (productStatus === 'active') return product.status;
                if (productStatus === 'deactive') return !product.status;
                return true;
            });
        }

        // Apply sorting
        if (sortOption) {
            filtered.sort((a, b) => {
                if (sortOption === 'price-low-high') return a.price - b.price;
                if (sortOption === 'price-high-low') return b.price - a.price;
                if (sortOption === 'name-a-z') return a.title.localeCompare(b.title);
                if (sortOption === 'name-z-a') return b.title.localeCompare(a.title);
                return 0;
            });
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page after filtering/sorting
    };

    // Handle sort apply
    const handleSortApply = () => {
        applyFiltersAndSort();
        setIsSortOpen(false);
    };

    // Handle filter apply
    const handleFilterApply = () => {
        applyFiltersAndSort();
        setIsFilterOpen(false);
    };

    // Close sort dropdown when clicking outside
    useEffect(() => {
        const handleClickOutsideSort = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideSort);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSort);
        };
    }, []);

    // Close filter dropdown when clicking outside
    useEffect(() => {
        const handleClickOutsideFilter = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideFilter);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideFilter);
        };
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    // Use filteredProducts for pagination
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers && startPage > 1) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                    <div style={{ position: 'relative' }} ref={filterRef}>
                        <button
                            className="filterButton"
                            onClick={toggleFilterDropdown}
                            style={{ marginRight: '10px' }}
                        >
                            <LuFilter />
                        </button>
                        {isFilterOpen && (
                            <div className="filter-dropdown">
                                <div className="dropdown-section">
                                    <h4>Price</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                    />
                                    <span>Up to R$ {priceRange}</span>
                                </div>
                                <div className="dropdown-section">
                                    <h4>Stock Status</h4>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={stockStatus.inStock}
                                            onChange={() => setStockStatus({ ...stockStatus, inStock: !stockStatus.inStock })}
                                        />
                                        In Stock
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={stockStatus.outOfStock}
                                            onChange={() => setStockStatus({ ...stockStatus, outOfStock: !stockStatus.outOfStock })}
                                        />
                                        Out of Stock
                                    </label>
                                </div>
                                <div className="dropdown-section">
                                    <h4>Status</h4>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="active"
                                            checked={productStatus === 'active'}
                                            onChange={(e) => setProductStatus(e.target.value)}
                                        />
                                        Active
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="status"
                                            value="deactive"
                                            checked={productStatus === 'deactive'}
                                            onChange={(e) => setProductStatus(e.target.value)}
                                        />
                                        Deactive
                                    </label>
                                </div>
                                <button className="apply-btn" onClick={handleFilterApply}>
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
                    <div style={{ position: 'relative' }} ref={sortRef}>
                        <button
                            className="filterButton"
                            onClick={toggleSortDropdown}
                        >
                            <ImSortAmountDesc />
                        </button>
                        {isSortOpen && (
                            <div className="sort-dropdown">
                                <div className="dropdown-section">
                                    <h4>Sort By</h4>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="price-low-high"
                                            checked={sortOption === 'price-low-high'}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        />
                                        Price: Low to High
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="price-high-low"
                                            checked={sortOption === 'price-high-low'}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        />
                                        Price: High to Low
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="name-a-z"
                                            checked={sortOption === 'name-a-z'}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        />
                                        Name: A-Z
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="name-z-a"
                                            checked={sortOption === 'name-z-a'}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        />
                                        Name: Z-A
                                    </label>
                                </div>
                                <button className="apply-btn" onClick={handleSortApply}>
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>
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
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
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
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="no-products">
                            No products found. Try adjusting your filters or create a new product.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {totalProducts > productsPerPage && totalProducts > 0 && (
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