import './index.scss';
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReactQuill from "react-quill";
import { cloneElement, useState, useEffect } from "react";
import CategoryModal from "../../CategoryModal/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Modal, message, Upload } from "antd";
import AdminCategoryAddProduct from "../../AdminCategoryAddProduct/index.jsx";
import { CATEGORY_LOGO } from "../../../../../constants.js";
import { useEditCategoryMutation, useGetCategoryByMarketIdQuery } from "../../../../service/userApi.js";
import { PulseLoader } from "react-spinners";
import { RxCross2 } from "react-icons/rx";

const { Dragger } = Upload;

function AdminEditCategoryMenu() {
    const navigate = useNavigate();
    const { id, marketId: myMarketId } = useParams();

    // Fetch category data
    const { data: getCategoryByMarketId, isLoading, refetch } = useGetCategoryByMarketIdQuery({ marketId: myMarketId, id });
    const category = getCategoryByMarketId?.data;

    // State management
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // imageFiles: Array to store both File objects (newly selected) and strings (from backend)
    const [imageFiles, setImageFiles] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({});
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    // Initialize state with category data when available
    useEffect(() => {
        if (category) {
            setTitle(category.name || "");
            setDescription(category.description || "");
            // If category has an image, initialize imageFiles with the backend string
            setImageFiles(category.imageName ? [category.imageName] : []);
            setIsActive(category.isActive || false);
        }
    }, [category]);

    // Generate image source for display
    const getImageSrc = (image) => {
        if (!image) return "";
        return typeof image === 'string'
            ? CATEGORY_LOGO + image
            : URL.createObjectURL(image);
    };

    // Handle image upload
    const handleImageUpload = ({ file }) => {
        if (file) {
            setImageFiles((prev) => [...prev, file]);
            if (errors.imageFiles) setErrors({ ...errors, imageFiles: "" });
            message.success(`${file.name} uploaded successfully`);
        }
    };

    // Remove an image by index
    const handleRemoveImage = (index) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Validate form fields
    const validateFields = () => {
        const newErrors = {};
        if (!id) newErrors.id = "Category ID is required";
        if (!title.trim()) newErrors.title = "Name is required";
        if (!myMarketId) newErrors.marketId = "Market ID is required";
        if (imageFiles.length === 0) newErrors.imageFiles = "At least one image is required";
        const plainDescription = description.replace(/<(.|\n)*?>/g, "").trim();
        if (!plainDescription) newErrors.description = "Description is required";
        if (isActive === undefined || isActive === null) newErrors.isActive = "Status is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (errors.title) setErrors({ ...errors, title: "" });
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        if (errors.description) setErrors({ ...errors, description: "" });
    };

    const handleStatusToggle = () => {
        setIsActive(!isActive);
        if (errors.isActive) setErrors({ ...errors, isActive: "" });
    };

    const [editCategory] = useEditCategoryMutation();

    // Save changes and submit FormData
    const handleSaveChanges = async () => {
        if (!validateFields()) {
            message.error("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", title);
        formData.append("marketId", myMarketId);
        formData.append("isActive", isActive.toString());
        formData.append("description", description);

        // Append all images to FormData
        imageFiles.forEach((file, index) => {
            formData.append(`imageFiles[${index}]`, file);
        });

        console.log("Saving FormData:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        setEditLoading(true);
        try {
            const response = await editCategory(formData).unwrap();
            if (response.statusCode === 200) {
                refetch();
                message.success("Changes saved successfully!");
            }
        } catch (error) {
            message.error("An error occurred while saving changes.");
        }
        setEditLoading(false);
    };

    // Modal handlers
    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    const handleCreateCategory = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section id="adminEditCategoryMenu">
            <div className="umumi">
                {/* Category status bar */}
                <div className="abso">
                    <span>Category status</span>
                    <button
                        className={isActive ? 'but123ton' : 'dtnButton'}
                        onClick={handleStatusToggle}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </button>
                    {errors.isActive && (
                        <span className="error-text">
                            <AiOutlineExclamationCircle className="icon" />
                            {errors.isActive}
                        </span>
                    )}
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Edit category</h1>
                </div>
                <div className="row">
                    {/* Left column: Category info form */}
                    <div className="pd0 col-6" style={{ paddingRight: "8px" }}>
                        <div className="wrapper">
                            <div className="inputWrapper">
                                <label>Title</label>
                                <input
                                    id="productTitle"
                                    name="title"
                                    placeholder="Enter category title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className={errors.title ? "errorInput" : ""}
                                />
                                {errors.title && (
                                    <span className="error-text">
                                        <AiOutlineExclamationCircle className="icon" />
                                        {errors.title}
                                    </span>
                                )}
                            </div>
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
                        </div>
                    </div>
                    {/* Right column: Category images upload and preview */}
                    <div className="pd0 col-6" style={{ paddingLeft: "8px" }}>
                        <div className="wrapper" style={{ padding: 0 }}>
                            <div className="textWrapper" style={{ padding: "32px 32px 0 32px" }}>
                                <h4>Category images</h4>
                            </div>
                            <div className="line"></div>
                            <div className="textWrapper">
                                <div className="inputWrapper1" style={{
                                    width: "100%",
                                }}>
                                    {/* Image preview grid */}
                                    {imageFiles.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', margin: '16px' }}>
                                            {imageFiles.map((image, index) => (
                                                <div key={index} className="imageWrapper" style={{ position: "relative" }}>
                                                    <img
                                                        src={getImageSrc(image)}
                                                        alt={`Category-${index}`}
                                                        style={{width: '100%', borderRadius: "10px" }}
                                                    />
                                                    <span
                                                        className="removeImage"
                                                        onClick={() => handleRemoveImage(index)}
                                                        style={{
                                                            position: "absolute",
                                                            top: "-8px",
                                                            right: "-8px",
                                                            cursor: "pointer",
                                                            background: "white",
                                                            borderRadius: "50%",
                                                            padding: "2px",
                                                        }}
                                                    >
                                                        <RxCross2 className="icon" />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {/* Image uploader */}
                                    {imageFiles.length <1 && (
                                        <Dragger
                                            name="file"
                                            multiple={true}
                                            beforeUpload={() => false}
                                            onChange={handleImageUpload}
                                            showUploadList={false}
                                            style={{
                                                border: "1px dashed gray",
                                                margin: "16px",
                                                width: "100%",
                                                borderWidth: "2px",
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <button type="button">+ Add media</button>
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag files to this area to upload
                                            </p>
                                        </Dragger>
                                    )}
                                    {errors.imageFiles && (
                                        <span className="error-text">
                                            <AiOutlineExclamationCircle className="icon" />
                                            {errors.imageFiles}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Optional error messages for ID and MarketID */}
                {errors.id && (
                    <span className="error-text">
                        <AiOutlineExclamationCircle className="icon" />
                        {errors.id}
                    </span>
                )}
                {errors.marketId && (
                    <span className="error-text">
                        <AiOutlineExclamationCircle className="icon" />
                        {errors.marketId}
                    </span>
                )}
            </div>
            <div className="buttin1">
                <button
                    onClick={handleSaveChanges}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                    }}
                >
                    {editLoading ? <PulseLoader color={"white"} /> : <>Save changes</>}
                </button>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={1000}
                modalRender={(modal) =>
                    cloneElement(modal, {
                        style: { ...modal.props.style, padding: 0, borderRadius: "20px" },
                    })
                }
            >
                <AdminCategoryAddProduct />
            </Modal>
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
        </section>
    );
}

export default AdminEditCategoryMenu;