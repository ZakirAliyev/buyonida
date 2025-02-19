import './index.scss';
import {useNavigate} from "react-router-dom";
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import ReactQuill from "react-quill";
import {cloneElement, useState} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import VariantContainer from "../Variants/index.jsx";
import AdminPopUp from "../../AdminPopUp/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal} from "antd";
import AdminSelectFile from "../../AdminSelectFile/index.jsx";

function AdminAddProductMenu() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showTrack, setShowTrack] = useState(false);
    const [showSku, setShowSku] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState(["Üst geyim", "Alt geyim", "Kurtka"]);

    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            setCategories([...categories, categoryName]);
            setSelectedCategory(categoryName);
        }
        setIsModalOpen(false);
    };

    const [variants, setVariants] = useState([]);

    const addVariant = () => {
        setVariants([...variants, {}]);
    };

    const updateVariant = (index, updatedOptions) => {
        setVariants((prevVariants) => {
            const newVariants = [...prevVariants];
            newVariants[index] = {...newVariants[index], options: updatedOptions};
            return newVariants;
        });
    };

    const handleSubmit = () => {
        console.log("Product Data:", JSON.stringify({
            title: document.getElementById("productTitle").value,
            description: description,
            category: selectedCategory,
            variants: variants
        }, null, 2));
    };

    const [title, setTitle] = useState("");
    const [pricing, setPricing] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);

        setErrors((prevErrors) => ({
            ...prevErrors,
            title: newTitle.trim() === "" ? "Title can't be blank" : "",
        }));
    };

    const handlePricingChange = (event) => {
        const newTitle = event.target.value;
        setPricing(newTitle);

        setErrors((prevErrors) => ({
            ...prevErrors,
            pricing: newTitle.trim() === "" ? "Pricing can't be blank" : "",
        }));
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : "",
        }));

    };

    const handleCompareAtPriceChange = (event) => {
        const newTitle = event.target.value;
        setCompareAtPrice(newTitle);


        setErrors((prevErrors) => ({
            ...prevErrors,
            compareAtPrice: newTitle.trim() === "" ? "Compare at price can't be blank" : "",
        }));
    };

    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(true);
    };

    // Modal'ı kapatacak fonksiyon
    const handleBigBoxModalClose = () => {
        setIsBigBoxModalOpen(false);
    };

    return (
        <section id="adminAddProductMenu">
            <div className={"umumi"}>
                <div className={"abso"}>
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
                    <AdminPopUp/>
                    <div className="inputWrapper">
                        <label>Title</label>
                        <input
                            id="productTitle"
                            name="title"
                            placeholder="Enter product title"
                            value={title}
                            onChange={handleTitleChange}
                            className={errors.title ? "errorInput" : ""}
                        />
                        {errors.title && <span className="error-text">
                            <AiOutlineExclamationCircle className={"icon"}/>
                            {errors.title}</span>}
                    </div>
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
                        <label htmlFor="productTitle">Image</label>
                        <div className={"boxWrapper"}>
                            <div className={"bigBox"} onClick={handleBigBoxClick}>
                                <FiPlus/>
                            </div>
                            <div className={"lBoxWrapper"}>
                                <div className={"littleBox"}>
                                    <FiPlus/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inputWrapper">
                        <label>Category</label>
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={() => setShowDropdown(!showDropdown)}>
                                {selectedCategory || "Select a category"}
                            </div>
                            <div className={`dropdown-list ${showDropdown ? "open" : "close"}`}>
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {category}
                                    </div>
                                ))}
                                <div className={"line"}/>
                                <div
                                    key={-1}
                                    className="dropdown-item"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <FiPlus className={"icon"}/>
                                    <span>Create category</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-4 priceBox priceBox1"}>
                        <div className={"wrapper"}>
                            <h3>Pricing</h3>
                            <div className="inputWrapper">
                                <label>Pricing</label>
                                <input
                                    id="productPricing"
                                    name="pricing"
                                    value={pricing}
                                    onChange={handlePricingChange}
                                    className={errors.pricing ? "errorInput" : ""}
                                />
                                {errors.pricing && <span className="error-text">
                            <AiOutlineExclamationCircle className={"icon"}/>
                                    {errors.pricing}</span>}
                            </div>
                            <div className="inputWrapper">
                                <label>Compare-at-price</label>
                                <input
                                    id="productCompareAtPrice"
                                    name="compareAtPrice"
                                    value={compareAtPrice}
                                    onChange={handleCompareAtPriceChange}
                                    className={errors.compareAtPrice ? "errorInput" : ""}
                                />
                                {errors.compareAtPrice && <span className="error-text">
                                        <AiOutlineExclamationCircle className={"icon"}/>
                                    {errors.compareAtPrice}</span>}
                            </div>
                        </div>
                    </div>
                    <div className={"col-8 priceBox priceBox2"}>
                        <div className={"wrapper"}>
                            <h3>Inventory</h3>
                            <div className={"inventoryWrapper"}>
                                <div className={"checkboxWrapper"}>
                                    <input type={"checkbox"} className={"checkbox"}
                                           onClick={() => setShowTrack(!showTrack)}/>
                                    <label>Track quantity</label>
                                </div>
                                {showTrack ? (
                                    <input type={"number"} className={"input12"} defaultValue={0}/>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={"inventoryWrapper"}>
                                <div className={"checkboxWrapper"}>
                                    <input type={"checkbox"} className={"checkbox"}/>
                                    <label>Continue selling when out of stock</label>
                                </div>
                            </div>
                            <div className={"inventoryWrapper"}>
                                <div className={"checkboxWrapper"}>
                                    <input type={"checkbox"} className={"checkbox"}
                                           onClick={() => setShowSku(!showSku)}/>
                                    <label>This product has a SKU or barcode</label>
                                </div>
                            </div>
                            {showSku ? (
                                <div className={"bx row"}>
                                    <div className={"priceBox priceBox1 col-6"}>
                                        <div className={"inputWrapper"}>
                                            <label>SKU (Stock Keeping Unit)</label>
                                            <input/>
                                        </div>
                                    </div>
                                    <div className={"priceBox priceBox2 col-6"}>
                                        <div className={"inputWrapper"}>
                                            <label>Barcode (ISBN, UPC, GTIN, etc.)</label>
                                            <input/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <VariantContainer variants={variants} setVariants={setVariants} updateVariant={updateVariant}/>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxModalClose}
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

export default AdminAddProductMenu;
