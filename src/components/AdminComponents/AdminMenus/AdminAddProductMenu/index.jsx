import './index.scss';
import {useNavigate} from "react-router-dom";
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import {FaTrash} from "react-icons/fa";
import ReactQuill from "react-quill";
import {cloneElement, useState} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import VariantContainer from "../Variants/index.jsx";
import AdminPopUp from "../../AdminPopUp/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal} from "antd";
import AdminSelectFile from "../../AdminSelectFile/index.jsx";
import {useGetAllCategoriesByMarketIdQuery, usePostCreateProductMutation} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import {FaCross} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";

function AdminAddProductMenu() {
    const navigate = useNavigate();

    // API'den kategori listesini çekiyoruz
    const {data: categoriesData} = useGetAllCategoriesByMarketIdQuery(Cookies.get('chooseMarket'));
    const categories = categoriesData?.data || [];

    // Ürün verileri için state'ler
    const [marketId] = useState(Cookies.get('chooseMarket'));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [pricing, setPricing] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [sku, setSku] = useState("");
    const [barcode, setBarcode] = useState("");
    const [isStock, setIsStock] = useState(false);
    const [skuAndBarcode, setSkuAndBarcode] = useState(false);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState(true);

    // Resim yükleme için state (eklenen resimler korunacak)
    const [images, setImages] = useState([]);

    // Diğer state'ler
    const [errors, setErrors] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    // Resim seçimi: mevcut resimleri silmeden yeni resimleri ekleyelim
    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...newFiles]);
        e.target.value = "";
    };

    // Seçilen resimden birini kaldırmak için
    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };

    // Kategori oluşturma işlemi
    const handleCreateCategory = (category) => {
        if (category.name.trim()) {
            categories.push(category);
            setSelectedCategoryId(category.id);
        }
        setIsModalOpen(false);
    };

    // API mutation'ı
    const [postCreateProduct] = usePostCreateProductMutation();

    // Input validasyon fonksiyonu
    const validateInputs = () => {
        let errors = {};
        if (!title.trim()) {
            errors.title = "Title is required";
        }
        if (!description.trim()) {
            errors.description = "Description is required";
        }
        if (!selectedCategoryId) {
            errors.selectedCategoryId = "Category is required";
        }
        if (!pricing.trim() || isNaN(parseFloat(pricing))) {
            errors.pricing = "Valid price is required";
        }
        if (!compareAtPrice.trim() || isNaN(parseFloat(compareAtPrice))) {
            errors.compareAtPrice = "Valid compare price is required";
        }
        if (!sku.trim()) {
            errors.sku = "SKU is required";
        }
        if (!barcode.trim()) {
            errors.barcode = "Barcode is required";
        }
        if (isStock && (stock === "" || isNaN(parseInt(stock, 10)))) {
            errors.stock = "Valid stock number is required";
        }
        if (images.length === 0) {
            errors.images = "At least one image is required";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        try {
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
                marketId: marketId,
                title: title,
                description: description,
                categoryId: selectedCategoryId,
                price: parseFloat(pricing),
                comparePrice: parseFloat(compareAtPrice),
                sku: sku,
                barcode: barcode,
                isStock: isStock,
                stock: parseInt(stock, 10),
                status: status,
                productOptionsJson: JSON.stringify(variantsArray)
            };

            const formData = new FormData();
            for (const key in productData) {
                formData.append(key, productData[key]);
            }
            for (let i = 0; i < images.length; i++) {
                formData.append('imagesToAdd', images[i]);
            }

            const response = await postCreateProduct(formData).unwrap();
            toast.success("Product created successfully!", {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (e) {
            toast.error(`Error`, {
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

    return (
        <section id="adminAddProductMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Product status</span>
                    <button>Active</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon"/>
                    </div>
                    <h1>Add product</h1>
                </div>
                <div className="wrapper">
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
                                <AiOutlineExclamationCircle className="icon"/>
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
                                <AiOutlineExclamationCircle className="icon"/>
                                {errors.description}
                            </span>
                        )}
                    </div>
                    {/* Category */}
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
                                <div className="line"/>
                                <div
                                    className="dropdown-item"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <FiPlus className="icon"/>
                                    <span>Create category</span>
                                </div>
                            </div>
                        </div>
                        {errors.selectedCategoryId && (
                            <span className="error-text">
                                <AiOutlineExclamationCircle className="icon"/>
                                {errors.selectedCategoryId}
                            </span>
                        )}
                    </div>
                    {/* Images */}
                    <div className="inputWrapper">
                        <label>Images</label>
                        <div className="uploaded-images">
                            <label className="image-upload-container">
                                <div className="image-upload-button">
                                    <FiPlus className="icon"/>
                                </div>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    multiple
                                    onChange={handleImageChange}
                                    style={{display: "none"}}
                                />
                            </label>
                            {images.length > 0 &&
                                images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="uploaded-image-wrapper"
                                        style={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            marginRight: '8px'
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`upload-${index}`}
                                            className="uploaded-image"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="remove-image-button"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                background: 'rgba(255,255,255,0.7)',
                                                border: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <RxCross2/>
                                        </button>
                                    </div>
                                ))}
                        </div>

                        {errors.images && (
                            <span className="error-text">
                                <AiOutlineExclamationCircle className="icon"/>
                                {errors.images}
                            </span>
                        )}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-4"} style={{
                        padding: '0 8px 0 0',
                        height: '283px'
                    }}>
                        <div className={"wrapper"}>
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
                                        <AiOutlineExclamationCircle className="icon"/>
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
                                        <AiOutlineExclamationCircle className="icon"/>
                                        {errors.compareAtPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"col-8"} style={{
                        padding: '0 0 0 8px'
                    }}>
                        <div className={"wrapper"} style={{
                            padding: '16px 0',
                            height: 'max-content'
                        }}>
                            <label style={{
                                padding: '16px 32px'
                            }}>Inventory</label>
                            <div className="inputWrapper1">
                                <div className={"inputWrapper1"} style={{
                                    padding: '0'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={isStock}
                                        onChange={(e) => setIsStock(e.target.checked)}
                                    />
                                    <label>Track quantity</label>
                                </div>
                                {isStock && (
                                    <div className="inputWrapper" style={{
                                        padding: '0',
                                        width: 'max-content'
                                    }}>
                                        <input
                                            type="number"
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            className={errors.stock ? "errorInput" : ""}
                                            style={{
                                                width: '100px'
                                            }}
                                        />
                                        {errors.stock && (
                                            <span className="error-text">
                                                <AiOutlineExclamationCircle className="icon"/>
                                                {errors.stock}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={"line"}></div>
                            <div className={"inputWrapper1 inputWrapper2"} style={{
                                marginTop: '16px'
                            }}>
                                <div className={"inputWrapper1"} style={{
                                    padding: '0'
                                }}>
                                    <input
                                        type="checkbox"
                                    />
                                    <label>Continue selling when out of stock</label>
                                </div>
                                <div className={"inputWrapper1"} style={{
                                    padding: '0'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={skuAndBarcode}
                                        onChange={(e) => setSkuAndBarcode(e.target.checked)}
                                    />
                                    <label>This product has a SKU or barcode</label>
                                </div>
                                {skuAndBarcode && (
                                    <div className={"row"} style={{
                                        padding: '0'
                                    }}>
                                        <div className={"col-6"}>
                                            <div className="inputWrapper">
                                                <label>SKU</label>
                                                <input
                                                    placeholder="Enter SKU"
                                                    value={sku}
                                                    onChange={(e) => setSku(e.target.value)}
                                                    className={errors.sku ? "errorInput" : ""}
                                                />
                                                {errors.sku && (
                                                    <span className="error-text">
                                                        <AiOutlineExclamationCircle className="icon"/>
                                                        {errors.sku}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={"col-6"}>
                                            <div className="inputWrapper">
                                                <label>Barcode</label>
                                                <input
                                                    placeholder="Enter Barcode"
                                                    value={barcode}
                                                    onChange={(e) => setBarcode(e.target.value)}
                                                    className={errors.barcode ? "errorInput" : ""}
                                                />
                                                {errors.barcode && (
                                                    <span className="error-text">
                                                        <AiOutlineExclamationCircle className="icon"/>
                                                        {errors.barcode}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <VariantContainer/>
                <button onClick={handleSubmit} className="save">
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
                        style: {...modal.props.style, padding: 0, borderRadius: '20px'},
                    })
                }
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

export default AdminAddProductMenu;
