import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ReactQuill from "react-quill";
import { cloneElement, useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useGetAllCategoriesByMarketIdQuery, useGetProductByIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../../constants.js";
import VariantContainer from "../Variants/index.jsx";

// Reusable Dropdown Component
const Dropdown = ({ label, options, selectedOption, onSelect, onCreate }) => {
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
                                onSelect(option.name, option.id);
                                setIsOpen(false);
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                    <div className="line" />
                    <div className="dropdown-item" onClick={onCreate}>
                        <FiPlus className="icon" />
                        <span>Create category</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Input Component
const InputField = ({ label, id, name, value, onChange, error, placeholder, type = "text" }) => (
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
        <AiOutlineExclamationCircle className="icon" />
                {error}
      </span>
        )}
    </div>
);

// Reusable Checkbox Component
const CheckboxField = ({ label, checked, onChange }) => (
    <div className="checkboxWrapper">
        <input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
        <label>{label}</label>
    </div>
);

function AdminEditProductMenu() {
    const navigate = useNavigate();
    const { id: myId, marketId: myMarketId } = useParams();

    // FormData üzerinde ImagesToAdd alanı için başlangıç state’i
    const [formData, setFormData] = useState({
        ImagesToAdd: []
    });

    // Variantlar get'ten gelen veriye göre başlatılıyor.
    const [variants, setVariants] = useState([]);

    // Kategori oluşturma modal'ı
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [showTrack, setShowTrack] = useState(false);
    const [showSku, setShowSku] = useState(false);

    // Status state: API'den gelen değere göre true/false
    const [status, setStatus] = useState(true);

    const { data: getProductById } = useGetProductByIdQuery({ marketId: myMarketId, id: myId });
    const product = getProductById?.data;

    const { data: getAllCategoriesByMarketId } = useGetAllCategoriesByMarketIdQuery(Cookies.get("chooseMarket"));
    const myCategories = getAllCategoriesByMarketId?.data || [];

    // Ürün detayları için yerel alanlar
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [comparePrice, setComparePrice] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [isStock, setIsStock] = useState(false);
    const [stock, setStock] = useState(null);
    const [errors, setErrors] = useState({});

    // Görseller: Mevcut, silinen ve yeni eklenen dosyalar
    const [currentImages, setCurrentImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    // Dosya input referansı
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (product) {
            setTitle(product.title || "");
            setPrice(product.price || "");
            setComparePrice(product.comparePrice || "");
            setDescription(product.description || "");
            setSelectedCategoryName(product.categoryName || "");
            setSelectedCategoryId(product.categoryId || null);
            setSku(product.sku || "");
            setBarcode(product.barcode || "");
            setIsStock(product.isStock || false);
            setStock(product.stock || null);
            setShowTrack(product.isStock || false);
            setShowSku(!!product.sku || !!product.barcode);
            setVariants(product.productOptions || []);
            setCurrentImages(product.imageNames || []);
            // Status başlangıç değeri (true veya false)
            setStatus(product.status);
        }
    }, [product]);

    // Status toggling: true/false olarak değiştirir.
    const toggleStatus = () => {
        setStatus((prevStatus) => !prevStatus);
    };

    // Track quantity (Stok Takibi) değiştirildiğinde:
    // - Eğer açık (checkbox işaretliyse): isStock true, showTrack true
    // - Kapatılırsa: isStock false, showTrack false ve stok değeri 0 olarak ayarlanabilir.
    const handleIsStockChange = (e) => {
        const newVal = e.target.checked;
        setIsStock(newVal);
        setShowTrack(newVal);
        if (!newVal) {
            setStock(0);
        }
    };

    const handleCategorySelect = (catName, catId) => {
        setSelectedCategoryName(catName);
        setSelectedCategoryId(catId);
    };

    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            const newCategory = { id: Date.now(), name: categoryName, marketId: myMarketId };
            myCategories.push(newCategory);
            setSelectedCategoryName(categoryName);
            setSelectedCategoryId(newCategory.id);
        }
        setIsModalOpen(false);
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setErrors((prev) => ({ ...prev, title: newTitle.trim() === "" ? "Title can't be blank" : "" }));
    };

    const handlePricingChange = (e) => {
        const newPrice = e.target.value;
        setPrice(newPrice);
        setErrors((prev) => ({ ...prev, price: newPrice.trim() === "" ? "Price can't be blank" : "" }));
    };

    const handleComparePriceChange = (e) => {
        const newComparePrice = e.target.value;
        setComparePrice(newComparePrice);
        setErrors((prev) => ({
            ...prev,
            comparePrice: newComparePrice.trim() === "" ? "Compare price can't be blank" : ""
        }));
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prev) => ({
            ...prev,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : ""
        }));
    };

    const handleSkuChange = (e) => {
        setSku(e.target.value);
    };

    const handleBarcodeChange = (e) => {
        setBarcode(e.target.value);
    };

    const handleStockChange = (e) => {
        setStock(e.target.value);
    };

    const handleDeleteImage = (imageName) => {
        setCurrentImages((prev) => prev.filter((name) => name !== imageName));
        setDeletedImages((prev) => [...prev, imageName]);
    };

    // Dosya input onChange: seçilen dosyalar hem FormData (ImagesToAdd) hem de preview için state'e ekleniyor.
    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length) {
            const fileArray = Array.from(files);
            setFormData((prev) => ({
                ...prev,
                ImagesToAdd: [...prev.ImagesToAdd, ...fileArray]
            }));
            setNewImages((prev) => [...prev, ...fileArray]);
            e.target.value = "";
        }
    };

    const handleRemoveNewImage = (file) => {
        setNewImages((prev) => prev.filter((f) => f !== file));
        setFormData((prev) => ({
            ...prev,
            ImagesToAdd: prev.ImagesToAdd.filter((f) => f !== file)
        }));
    };

    // FormData oluşturuluyor; sadece değişiklik yapılan alanlar append ediliyor.
    // ...
// FormData nesnesi oluşturuluyor; yalnızca değişiklik yapılan alanlar ekleniyor.
    const handleSave = () => {
        if (!product) return;
        const fd = new FormData();
        // Temel alanlar her zaman eklenir.
        fd.append("MarketId", parseInt(myMarketId));
        fd.append("Id", parseInt(myId));

        // Status değeri, checkbox durumuna göre her durumda gönderiliyor.
        fd.append("Status", status);

        if (title !== product.title) fd.append("Title", title);
        if (parseFloat(price) !== product.price) fd.append("Price", parseFloat(price));
        if (parseFloat(comparePrice) !== product.comparePrice) fd.append("ComparePrice", parseFloat(comparePrice));
        if (description !== product.description) fd.append("Description", description);
        if (selectedCategoryId !== product.categoryId) fd.append("CategoryId", selectedCategoryId);
        if (sku !== product.sku) fd.append("SKU", sku);
        if (barcode !== product.barcode) fd.append("Barcode", barcode);
        // isStock değeri her durumda gönderiliyor.
        fd.append("IsStock", isStock);
        if (parseInt(stock) !== product.stock) fd.append("Stock", parseInt(stock));

        // Silinen görseller: her biri ayrı ayrı ekleniyor.
        if (deletedImages.length > 0) {
            deletedImages.forEach((img) => fd.append("ImageNamesToRemove", img));
        }

        // Variantlarda (options) değişiklik varsa, sadece isNew veya edited olanları seçip, aşağıdaki formatta yapılandırıyoruz.
        const changedVariants = variants.filter((variant) => variant.isNew || variant.edited);
        if (changedVariants.length > 0) {
            const formattedVariants = changedVariants.map((variant, idx) => ({
                name: variant.name,
                displayOrder: idx,
                values: variant.values.map((val, idx2) => ({
                    value: val.value,
                    displayOrder: idx2
                }))
            }));
            fd.append("ProductOptionsJson", JSON.stringify(formattedVariants));
        }

        // Yeni eklenen görselleri ekliyoruz.
        if (formData.ImagesToAdd && formData.ImagesToAdd.length > 0) {
            formData.ImagesToAdd.forEach((file) => fd.append("ImagesToAdd", file));
        }

        // Test amacıyla, FormData içeriğini konsola yazdırıyoruz.
        for (let [key, value] of fd.entries()) {
            console.log(key + ": ", value);
        }
        // Burada API'ye gönderim yapılabilir.
    };


    return (
        <section id="adminEditProductMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Product status</span>
                    <button onClick={toggleStatus}>{status ? "Active" : "Passive"}</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
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
                    <div className="inputWrapper">
                        <label>Description</label>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={handleDescriptionChange}
                            className={errors.description ? "codeEditor errorInput" : "codeEditor"}
                        />
                        {errors.description && (
                            <span className="error-text">
                <AiOutlineExclamationCircle className="icon" />
                                {errors.description}
              </span>
                        )}
                    </div>
                    <div className="inputWrapper">
                        <label style={{ marginBottom: "10px" }}>Image</label>
                        {/* Görsellerin kapsayıcısı: flex-wrap ve gap sayesinde 5 taneden fazla olunca alt satıra geçer */}
                        <div className="boxWrapper" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            <div className="lBoxWrapper">
                                <div className="littleBox" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                    <FiPlus />
                                </div>
                            </div>
                            {currentImages.map((image, index) => (
                                <div key={index} className="imageWrapper" style={{ position: "relative", margin: "8px" }}>
                                    <img
                                        src={PRODUCT_LOGO + image}
                                        alt={`Product Image ${index + 1}`}
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                    <button
                                        className="deleteImageButton"
                                        onClick={() => handleDeleteImage(image)}
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "15px",
                                            background: "#ccc",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {/* Yeni eklenen görsellerin önizlemesi */}
                            {newImages.map((file, index) => (
                                <div key={index} className="imageWrapper" style={{ position: "relative", margin: "8px" }}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`New Upload ${index + 1}`}
                                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                    />
                                    <button
                                        className="deleteImageButton"
                                        onClick={() => handleRemoveNewImage(file)}
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "15px",
                                            background: "#ccc",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Dropdown
                        label="Category"
                        options={myCategories}
                        selectedOption={selectedCategoryName}
                        onSelect={handleCategorySelect}
                        onCreate={() => setIsModalOpen(true)}
                    />
                </div>
                <div className="row">
                    <div className="col-4 priceBox priceBox1">
                        <div className="wrapper" style={{ height: "100%", padding: "32px" }}>
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
                    <div className="col-8 priceBox priceBox2">
                        <div className="wrapper" style={{ height: "100%", padding: "32px" }}>
                            <h3 style={{ marginBottom: "5px" }}>Inventory</h3>
                            <div className="inventoryWrapper">
                                <CheckboxField label="Track quantity" checked={isStock} onChange={handleIsStockChange} />
                                {showTrack && (
                                    <div className="inputWrapper" style={{ width: "max-content", height: "50px" }}>
                                        <input
                                            id="stock"
                                            name="stock"
                                            value={stock || ""}
                                            onChange={handleStockChange}
                                            type="number"
                                            style={{ width: "100px", marginTop: "20px" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="line"></div>
                            <div className="inventoryWrapper">
                                <CheckboxField
                                    label="Continue selling when out of stock"
                                    checked={false}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="inventoryWrapper">
                                <CheckboxField
                                    label="This product has a SKU or barcode"
                                    checked={showSku}
                                    onChange={() => {
                                        setShowSku(!showSku);
                                    }}
                                />
                            </div>
                            {showSku && (
                                <div className="bx row">
                                    <div className="priceBox priceBox1 col-6">
                                        <InputField
                                            label="SKU (Stock Keeping Unit)"
                                            id="sku"
                                            name="sku"
                                            value={sku}
                                            onChange={handleSkuChange}
                                        />
                                    </div>
                                    <div className="priceBox priceBox2 col-6">
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
                {/* VariantContainer: SCSS ile uyumlu */}
                <VariantContainer variants={variants} onVariantsChange={setVariants} />
                <div className="saveButton" style={{ marginTop: "20px", textAlign: "center" }}>
                    <button className="save" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
            {/* Gizli file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                accept="image/*"
                multiple
            />
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
        </section>
    );
}

export default AdminEditProductMenu;
