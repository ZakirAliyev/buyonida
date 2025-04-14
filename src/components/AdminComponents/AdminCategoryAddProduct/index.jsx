import './index.scss';
import { useState, useEffect } from 'react';
import { BsSortUp } from 'react-icons/bs';
import image1 from '/src/assets/miniPhoto.png';
import image2 from "../../../assets/order.png";
import { useGetAllProductsByMarketIdQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../constants.js";
import { message } from 'antd';

function AdminCategoryAddProduct({ selectedProducts, onProductSelect, allProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProductIds, setSelectedProductIds] = useState(selectedProducts || []);
    const [localProducts, setLocalProducts] = useState([]);

    const { data: getAllProducts } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));

    useEffect(() => {
        if (getAllProducts?.data) {
            setLocalProducts(getAllProducts.data);
        }
    }, [getAllProducts]);

    useEffect(() => {
        // Initialize selectedProductIds from localStorage when component mounts
        const storedProductIds = JSON.parse(localStorage.getItem('collectionProductIds')) || [];
        setSelectedProductIds(storedProductIds);
    }, []);

    useEffect(() => {
        // Update localStorage whenever selectedProductIds change
        localStorage.setItem('collectionProductIds', JSON.stringify(selectedProductIds));
    }, [selectedProductIds]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleProductSelect = (productId) => {
        const newSelection = selectedProductIds.includes(productId)
            ? selectedProductIds.filter(id => id !== productId)
            : [...selectedProductIds, productId];

        setSelectedProductIds(newSelection); // Update selectedProductIds state
    };

    const handleDone = () => {
        // Propagate the selected product ids to the parent component
        onProductSelect(selectedProductIds);

        // Message to indicate that the products were added
        message.success("Products added to the collection successfully!");
    };

    return (
        <section id="adminCategoryAddProduct">
            <h2>Select Products</h2>
            <div className="wrapper">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="sort-button">
                    <BsSortUp className="icon2" />
                    Sort
                </button>
            </div>
            <table className="product-table">
                <tbody>
                {localProducts.length > 0 ? (
                    localProducts
                        .filter(product =>
                            product.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product) => (
                            <tr key={product.id}>
                                <td className="birinci">
                                    <input
                                        type="checkbox"
                                        checked={selectedProductIds.includes(product.id)}
                                        onChange={() => handleProductSelect(product.id)}
                                    />
                                </td>
                                <td className="ikinci">
                                    <img
                                        src={product.imageNames && product.imageNames.length > 0
                                            ? `${PRODUCT_LOGO}${product.imageNames[0]}`
                                            : image1}
                                        alt="Product"
                                        className="product-image"
                                    />
                                </td>
                                <td className="ucuncu">{product.title}</td>
                            </tr>
                        ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '16px',
                                }}
                            >
                                <img src={image2} alt="No products" />
                                <div style={{ maxWidth: '400px', width: '100%' }}>
                                    There are no products available to add
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="ending">
                <button className="btnbtntb">Cancel</button>
                <button
                    className="btn-done"
                    onClick={handleDone}
                >
                    Done
                </button>
            </div>
        </section>
    );
}

export default AdminCategoryAddProduct;
