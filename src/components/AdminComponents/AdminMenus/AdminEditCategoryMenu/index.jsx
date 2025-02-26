import './index.scss';
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReactQuill from "react-quill";
import { cloneElement, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Modal, message, Upload } from "antd";
import image1 from "../../../../assets/miniPhoto.png";
import image2 from "../../../../assets/order.png";
import { RxCross2 } from "react-icons/rx";
import AdminCategoryAddProduct from "../../AdminCategoryAddProduct/index.jsx";
import { CATEGORY_LOGO } from "../../../../../constants.js";
import { useGetCategoryByMarketIdQuery } from "../../../../service/userApi.js";

const { Dragger } = Upload;

function AdminEditCategoryMenu() {
    const navigate = useNavigate();
    const params = useParams();
    const myId = params.id;
    const myMarketId = params.marketId;

    const { data: getCategoryByMarketId } = useGetCategoryByMarketIdQuery({ marketId: myMarketId, id: myId });
    const category = getCategoryByMarketId?.data;

    const [title, setTitle] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [imageUrl, setImageUrl] = useState(category?.imageName || "");
    const [errors, setErrors] = useState({});
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (category) {
            setTitle(category.name);
            setDescription(category.description);
            setImageUrl(category.imageName);
        }
    }, [category]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (errors.title) {
            setErrors({ ...errors, title: "" });
        }
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        if (errors.description) {
            setErrors({ ...errors, description: "" });
        }
    };

    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    const handleCreateCategory = () => {
        // Handle category creation logic here
        setIsModalOpen(false);
    };

    const toggleProductStatus = (productId) => {
        // Implement logic to toggle product status
        const updatedProducts = category.products.map(product =>
            product.id === productId ? { ...product, status: !product.status } : product
        );
        // Update the category with the new products array
        // This is a placeholder, you should replace it with your actual state management logic
        console.log("Toggled product status", updatedProducts);
    };

    return (
        <section id="adminEditCategoryMenu">
            <div className={"umumi"}>
                <div className={"abso"}>
                    <span>Category status</span>
                    <button>{category?.status ? "Active" : "Inactive"}</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Edit category</h1>
                </div>
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
                                <AiOutlineExclamationCircle className={"icon"} />
                                {errors.title}
                            </span>
                        )}
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
                                <AiOutlineExclamationCircle className={"icon"} />
                                {errors.description}
                            </span>
                        )}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"pd0 pd1 col-8"}>
                        <div className={"wrapper"} style={{ padding: 0 }}>
                            <div className={"textWrapper"} style={{ padding: "32px 32px 0 32px" }}>
                                <h4>Products</h4>
                                <div className={"inputWrapper1"}>
                                    <input placeholder={"Search..."} />
                                    <button onClick={handleBigBoxClick}>Axtar</button>
                                </div>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}>
                                    <table className="product-table">
                                        <tbody>
                                        {category && category?.products?.length !== 0 ? (
                                            category?.products.map((item, index) => (
                                                <tr key={index}>
                                                    <td className={"checkboxWrapper"}>{index + 1}.</td>
                                                    <td className={"img"}>
                                                        <img src={image1} alt={"Image"} />
                                                    </td>
                                                    <td className={"productName"}>{item.title}</td>
                                                    <td className={"btnbtn123"}>
                                                        <button onClick={() => toggleProductStatus(item.id)}>
                                                            {item.status ? "Active" : "Inactive"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <RxCross2 />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    textAlign: "center",
                                                    flexDirection: "column",
                                                    gap: "16px",
                                                }}
                                            >
                                                <img src={image2} alt={"Image"} />
                                                <div style={{ maxWidth: "400px", width: "100%" }}>
                                                    There are no products in this collection. Search for products
                                                </div>
                                            </div>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"pd0 pd2 col-4"}>
                        <div className={"wrapper"} style={{ padding: 0 }}>
                            <div className={"textWrapper"} style={{ padding: "32px 32px 0 32px" }}>
                                <h4>Category image</h4>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}>
                                    {imageUrl ? (
                                        <div style={{ textAlign: "center", margin: "16px" }}>
                                            <img
                                                src={CATEGORY_LOGO + imageUrl}
                                                alt="Category"
                                                style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: '20px' }}
                                            />
                                            <button onClick={() => setImageUrl("")} style={{ marginTop: "10px" }}>
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <Dragger
                                            name="file"
                                            multiple={false}
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            onChange={handleImageUpload}
                                            style={{
                                                border: "1px dashed gray",
                                                margin: "16px",
                                                width: "calc(100% - 32px)",
                                                borderWidth: "2px",
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <button>+ Add media</button>
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        </Dragger>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"buttin1"}>
                <button>Save changes</button>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={1000}
                modalRender={(modal) => {
                    return cloneElement(modal, {
                        style: { ...modal.props.style, ...{ padding: 0, borderRadius: "20px" } },
                    });
                }}
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