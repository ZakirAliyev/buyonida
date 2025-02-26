import './index.scss';
import {useNavigate, useParams} from "react-router-dom";
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import ReactQuill from "react-quill";
import {cloneElement, useState, useEffect} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import AdminPopUp from "../../AdminPopUp/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal} from "antd";
import AdminSelectFile from "../../AdminSelectFile/index.jsx";
import {useGetAllCategoriesByMarketIdQuery, useGetProductByIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {PRODUCT_LOGO} from "../../../../../constants.js";
import VariantContainer from "../Variants/index.jsx";

// Reusable Dropdown Component
const Dropdown = ({label, options, selectedOption, onSelect, onCreate}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="inputWrapper">
            <label>{label}</label>
            <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption || "Select a category"}
                </div>
                <div className={`dropdown-list ${isOpen ? "open" : "close"}`}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="dropdown-item"
                            onClick={() => {
                                onSelect(option.name);
                                setIsOpen(false);
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                    <div className={"line"}/>
                    <div
                        className="dropdown-item"
                        onClick={onCreate}
                    >
                        <FiPlus className={"icon"}/>
                        <span>Create category</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Input Component
const InputField = ({label, id, name, value, onChange, error, placeholder, type = "text"}) => {
    return (
        <div className="inputWrapper">
            <label>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={error ? "errorInput" : ""}
            />
            {error && (
                <span className="error-text">
                    <AiOutlineExclamationCircle className={"icon"}/>
                    {error}
                </span>
            )}
        </div>
    );
};

// Reusable Checkbox Component
const CheckboxField = ({label, checked, onChange}) => {
    return (
        <div className="checkboxWrapper">
            <input type="checkbox" className="checkbox" checked={checked} onChange={onChange}/>
            <label>{label}</label>
        </div>
    );
};

function AdminEditProductMenu() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showTrack, setShowTrack] = useState(false); // Added state for track quantity
    const [showSku, setShowSku] = useState(false); // Added state for SKU/barcode

    const params = useParams();
    const myId = params.id;
    const myMarketId = params.marketId;

    const {data: getProductById} = useGetProductByIdQuery({marketId: myMarketId, id: myId});
    const product = getProductById?.data;

    const {data: getAllCategoriesByMarketId} = useGetAllCategoriesByMarketIdQuery(Cookies.get('chooseMarket'));
    const myCategories = getAllCategoriesByMarketId?.data || [];

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [comparePrice, setComparePrice] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [isStock, setIsStock] = useState(false);
    const [stock, setStock] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setTitle(product.title || "");
            setPrice(product.price || "");
            setComparePrice(product.comparePrice || "");
            setDescription(product.description || "");
            setSelectedCategory(product?.categoryName || "");
            setSku(product.sku || "");
            setBarcode(product.barcode || "");
            setIsStock(product.isStock || false);
            setStock(product.stock || null);
            setShowTrack(product.isStock || false); // Show track quantity if stock is managed
            setShowSku(!!product.sku || !!product.barcode); // Show SKU/barcode fields if they exist
        }
    }, [product]);

    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            // Simulate adding a new category (you can replace this with an API call)
            const newCategory = {id: Date.now(), name: categoryName, marketId: myMarketId};
            myCategories.push(newCategory); // Update local state
            setSelectedCategory(categoryName);
        }
        setIsModalOpen(false);
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setErrors((prevErrors) => ({
            ...prevErrors,
            title: newTitle.trim() === "" ? "Title can't be blank" : "",
        }));
    };

    const handlePricingChange = (event) => {
        const newPricing = event.target.value;
        setPrice(newPricing);
        setErrors((prevErrors) => ({
            ...prevErrors,
            price: newPricing.trim() === "" ? "Price can't be blank" : "",
        }));
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : "",
        }));
    };

    const handleComparePriceChange = (event) => {
        const newComparePrice = event.target.value;
        setComparePrice(newComparePrice);
        setErrors((prevErrors) => ({
            ...prevErrors,
            comparePrice: newComparePrice.trim() === "" ? "Compare price can't be blank" : "",
        }));
    };

    const handleSkuChange = (event) => {
        const newSku = event.target.value;
        setSku(newSku);
    };

    const handleBarcodeChange = (event) => {
        const newBarcode = event.target.value;
        setBarcode(newBarcode);
    };

    const handleIsStockChange = (event) => {
        const newIsStock = event.target.checked;
        setIsStock(newIsStock);
        setShowTrack(newIsStock); // Show/hide track quantity based on isStock
    };

    const handleStockChange = (event) => {
        const newStock = event.target.value;
        setStock(newStock);
    };

    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    // Get the number of images from the product data
    const imageCount = product?.imageNames?.length || 0;

    return (
        <section id="adminEditProductMenu">
            <div className={"umumi"}>
                <div className={"abso"}>
                    <span>Product status</span>
                    <button>Active</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon"/>
                    </div>
                    <h1>Edit product</h1>
                </div>
                <div className="wrapper">
                    <InputField
                        label="Title"
                        id="productTitle"
                        name="title"
                        placeholder="Enter product title"
                        value={title}
                        onChange={handleTitleChange}
                        error={errors.title}
                    />
                    <div className={"inputWrapper"}>
                        <label htmlFor="productTitle">Description</label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={handleDescriptionChange}
                            className={errors.description ? "codeEditor errorInput" : "codeEditor"}
                        />
                        {errors.description && (
                            <span className="error-text">
                                <AiOutlineExclamationCircle className={"icon"}/>
                                {errors.description}
                            </span>
                        )}
                    </div>
                    <div className={"inputWrapper"}>
                        <label htmlFor="productTitle" style={{
                            marginBottom: '10px'
                        }}>Image</label>
                        <div className={"boxWrapper"} style={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}>
                            {imageCount === 0 ? (
                                <>
                                    <div className={"bigBox"} onClick={() => setIsBigBoxModalOpen(true)}>
                                        <FiPlus/>
                                    </div>
                                    <div className={"lBoxWrapper"}>
                                        <div className={"littleBox"}>
                                            <FiPlus/>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {product.imageNames.map((image, index) => (
                                        <div>
                                            <img src={PRODUCT_LOGO + image} alt={`Product Image ${index + 1}`}
                                                 key={index}/>
                                        </div>
                                    ))}
                                    <div className={"lBoxWrapper"}>
                                        <div className={"littleBox"} onClick={() => setIsBigBoxModalOpen(true)}>
                                            <FiPlus/>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <Dropdown
                        label="Category"
                        options={myCategories} // Use myCategories here
                        selectedOption={selectedCategory}
                        onSelect={setSelectedCategory}
                        onCreate={() => setIsModalOpen(true)}
                    />
                </div>
                <div className={"row"}>
                    <div className={"col-4 priceBox priceBox1"}>
                        <div className={"wrapper"} style={{
                            height: '100%',
                            padding: '32px 32px 0 32px'
                        }}>
                            <h3>Pricing</h3>
                            <InputField
                                label="Pricing"
                                id="productPricing"
                                name="price"
                                value={price}
                                onChange={handlePricingChange}
                                error={errors.price}
                            />
                            <InputField
                                label="Compare-at-price"
                                id="productComparePrice"
                                name="comparePrice"
                                value={comparePrice}
                                onChange={handleComparePriceChange}
                                error={errors.comparePrice}
                            />
                        </div>
                    </div>
                    <div className={"col-8 priceBox priceBox2"}>
                        <div className={"wrapper"} style={{
                            height: '100%',
                            padding: '32px 32px 0 32px'
                        }}>
                            <h3 style={{
                                marginBottom: '5px'
                            }}>Inventory</h3>
                            <div className={"inventoryWrapper"}>
                                <CheckboxField
                                    label="Track quantity"
                                    checked={isStock}
                                    onChange={handleIsStockChange}
                                />
                                {showTrack && (
                                    <div className={"inputWrapper"} style={{
                                        width: "max-content",
                                        height: '50px'
                                    }}>
                                        <input
                                            id="stock"
                                            name="stock"
                                            value={stock || ""}
                                            onChange={handleStockChange}
                                            type="number"
                                            style={{
                                                width: '100px',
                                                marginTop: '20px'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={"line"}></div>
                            <div className={"inventoryWrapper"}>
                                <CheckboxField
                                    label="Continue selling when out of stock"
                                    checked={false} // Add state if needed
                                    onChange={() => {
                                    }} // Add handler if needed
                                />
                            </div>
                            <div className={"inventoryWrapper"}>
                                <CheckboxField
                                    label="This product has a SKU or barcode"
                                    checked={showSku}
                                    onChange={() => setShowSku(!showSku)}
                                />
                            </div>
                            {showSku && (
                                <div className={"bx row"}>
                                    <div className={"priceBox priceBox1 col-6"}>
                                        <InputField
                                            label="SKU (Stock Keeping Unit)"
                                            id="sku"
                                            name="sku"
                                            value={sku}
                                            onChange={handleSkuChange}
                                        />
                                    </div>
                                    <div className={"priceBox priceBox2 col-6"}>
                                        <InputField
                                            label="Barcode (ISBN, UPC, GTIN, etc.)"
                                            id="barcode"
                                            name="barcode"
                                            value={barcode}
                                            onChange={handleBarcodeChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <VariantContainer />
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={() => setIsBigBoxModalOpen(false)}
                footer={null}
                width={1000}
                modalRender={(modal) => {
                    return cloneElement(modal, {
                        style: {...modal.props.style, ...{padding: 0, borderRadius: '20px'}},
                    });
                }}
            >
                <AdminSelectFile/>
            </Modal>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
        </section>
    );
}

export default AdminEditProductMenu;