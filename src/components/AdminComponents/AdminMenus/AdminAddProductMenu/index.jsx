import './index.scss';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ReactQuill from "react-quill";
import { cloneElement, useState } from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import VariantContainer from "../Variants/index.jsx";
import AdminPopUp from "../../AdminPopUp/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Modal } from "antd";
import AdminSelectFile from "../../AdminSelectFile/index.jsx";
import { useGetAllCategoriesByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";

function AdminAddProductMenu() {
    const navigate = useNavigate();

    // Kategori listesini API'den çekiyoruz
    const { data: categoriesData } = useGetAllCategoriesByMarketIdQuery(Cookies.get('chooseMarket'));
    const categories = categoriesData?.data || [];

    // Ürün verileri için state'ler
    const [marketId, setMarketId] = useState(Cookies.get('chooseMarket'));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [pricing, setPricing] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [isStock, setIsStock] = useState(false);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState(true);

    // Diğer state'ler
    const [errors, setErrors] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    // Kategori oluşturma işlemi
    const handleCreateCategory = (category) => {
        if (category.name.trim()) {
            categories.push(category);
            setSelectedCategoryId(category.id);
        }
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        // VariantContainer'da kaydedilen veriyi localStorage'den çekiyoruz (kaydedilmemişse boş obje)
        const storedVariantsObj = JSON.parse(localStorage.getItem("variantData") || "{}");
        const variantsArray = Object.keys(storedVariantsObj)
            .sort((a, b) => {
                const aNum = parseInt(a.split("_")[1], 10);
                const bNum = parseInt(b.split("_")[1], 10);
                return aNum - bNum;
            })
            .map((key, index) => {
                const variant = storedVariantsObj[key];
                return {
                    name: variant.name,
                    displayOrder: index,
                    values: variant.values.map((val, i) => ({
                        value: val.value,
                        displayOrder: i
                    }))
                };
            });

        const productData = {
            MarketId: marketId,
            Title: title,
            Description: description,
            CategoryId: selectedCategoryId,
            Price: parseFloat(pricing),
            ComparePrice: parseFloat(compareAtPrice),
            SKU: sku,
            Barcode: barcode,
            IsStock: isStock,
            Stock: parseInt(stock, 10),
            Status: status,
            ProductOptions: variantsArray,
            ProductOptionsJson: JSON.stringify(variantsArray)
        };

        console.log("Product Data:", JSON.stringify(productData, null, 2));
        // API'ye gönderme işlemini burada gerçekleştirebilirsin...
    };

    return (
        <section id="adminAddProductMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Product status</span>
                    <button>Active</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Add product</h1>
                </div>
                <div className="wrapper">
                    <AdminPopUp />
                    {/* Title */}
                    <div className="inputWrapper">
                        <label>Title</label>
                        <input
                            id="productTitle"
                            name="title"
                            placeholder="Enter product title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={errors.title ? "errorInput" : ""}
                        />
                        {errors.title && (
                            <span className="error-text">
                <AiOutlineExclamationCircle className="icon" />
                                {errors.title}
              </span>
                        )}
                    </div>
                    {/* Description */}
                    <div className="inputWrapper">
                        <label>Description</label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            className={errors.description ? "codeEditor errorInput" : "codeEditor"}
                        />
                        {errors.description && (
                            <span className="error-text">
                <AiOutlineExclamationCircle className="icon" />
                                {errors.description}
              </span>
                        )}
                    </div>
                    {/* Category Dropdown */}
                    <div className="inputWrapper">
                        <label>Category</label>
                        <div className="dropdown">
                            <div
                                className="dropdown-header"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {selectedCategoryId
                                    ? categories.find((cat) => cat.id === selectedCategoryId)?.name
                                    : "Select a category"}
                            </div>
                            <div className={`dropdown-list ${showDropdown ? "open" : "close"}`}>
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedCategoryId(category.id);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                                <div className="line" />
                                <div
                                    className="dropdown-item"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <FiPlus className="icon" />
                                    <span>Create category</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Price and Compare Price */}
                    <div className="inputWrapper">
                        <label>Price</label>
                        <input
                            id="productPricing"
                            name="pricing"
                            placeholder="Enter price"
                            value={pricing}
                            onChange={(e) => setPricing(e.target.value)}
                            className={errors.pricing ? "errorInput" : ""}
                        />
                        {errors.pricing && (
                            <span className="error-text">
                <AiOutlineExclamationCircle className="icon" />
                                {errors.pricing}
              </span>
                        )}
                    </div>
                    <div className="inputWrapper">
                        <label>Compare Price</label>
                        <input
                            id="productCompareAtPrice"
                            name="compareAtPrice"
                            placeholder="Enter compare price"
                            value={compareAtPrice}
                            onChange={(e) => setCompareAtPrice(e.target.value)}
                            className={errors.compareAtPrice ? "errorInput" : ""}
                        />
                        {errors.compareAtPrice && (
                            <span className="error-text">
                <AiOutlineExclamationCircle className="icon" />
                                {errors.compareAtPrice}
              </span>
                        )}
                    </div>
                    {/* SKU and Barcode */}
                    <div className="inputWrapper">
                        <label>SKU</label>
                        <input
                            placeholder="Enter SKU"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Barcode</label>
                        <input
                            placeholder="Enter Barcode"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </div>
                    {/* Stock */}
                    <div className="inputWrapper">
                        <label>
                            <input
                                type="checkbox"
                                checked={isStock}
                                onChange={(e) => setIsStock(e.target.checked)}
                            />
                            Is Stock
                        </label>
                    </div>
                    {isStock && (
                        <div className="inputWrapper">
                            <label>Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                    )}
                    {/* Variant Container */}
                    <VariantContainer />
                </div>
                <button onClick={handleSubmit} className="submit-button">
                    Submit Product
                </button>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={() => setIsBigBoxModalOpen(false)}
                footer={null}
                width={1000}
                modalRender={(modal) =>
                    cloneElement(modal, {
                        style: { ...modal.props.style, padding: 0, borderRadius: '20px' },
                    })
                }
            >
                <AdminSelectFile />
            </Modal>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
        </section>
    );
}

export default AdminAddProductMenu;
