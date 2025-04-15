import './index.scss';
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReactQuill from "react-quill";
import { cloneElement, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Modal, message, Upload } from "antd";
import { RxCross2 } from "react-icons/rx";
import AdminCategoryAddProduct from "../../AdminCategoryAddProduct/index.jsx";
import {
    useEditCollectionMutation,
    useGetAllProductsByMarketIdQuery,
    useGetCollectionByMarketIdQuery
} from "../../../../service/userApi.js";
import { COLLECTION_LOGO, PRODUCT_LOGO } from "../../../../../constants.js";
import { GoDotFill } from "react-icons/go";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

const { Dragger } = Upload;

function AdminEditCollectionMenu() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const marketId = params.marketId;

    const { data: getCollectionByMarketId, refetch } = useGetCollectionByMarketIdQuery({ id, marketId });
    const collection = getCollectionByMarketId?.data;

    const { data: getAllProducts } = useGetAllProductsByMarketIdQuery(marketId);
    const myProducts = getAllProducts?.data;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState({});
    const [coverFile, setCoverFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    useEffect(() => {
        if (collection) {
            setTitle(collection.title || "");
            setDescription(collection.description || "");
            setIsActive(collection.isActive || false);
            setProducts(collection.products || []);
            if (collection.coverImageUrl) {
                setCoverPreview(collection.coverImageUrl);
            }
            const productIds = collection.products?.map(product => product.id) || [];
            setSelectedProductIds(productIds);

            // Store the original product IDs and initialize other localStorage keys
            localStorage.setItem("originalCollectionProductIds", JSON.stringify(productIds));
            localStorage.setItem("collectionProductIds", JSON.stringify(productIds));
            localStorage.setItem("deletedProductIds", JSON.stringify([]));
        }
    }, [collection]);

    const collectionProductIds = JSON.parse(localStorage.getItem("collectionProductIds")) || [];
    const filteredProducts = myProducts?.filter(product => collectionProductIds.includes(product.id));

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setErrors((prevErrors) => ({
            ...prevErrors,
            title: newTitle.trim() === "" ? "Title can't be blank" : "",
        }));
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : "",
        }));
    };

    const handleStatusToggle = () => {
        setIsActive((prev) => !prev);
    };

    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setCoverPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveCoverImage = () => {
        setCoverFile(null);
        setCoverPreview(null);
    };

    const draggerProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        beforeUpload(file) {
            setCoverFile(file);
            handlePreview(file);
            return false;
        },
        onChange(info) {
            const { status } = info.file;
            if (status === 'removed') {
                setCoverFile(null);
                setCoverPreview(null);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {},
    };

    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    const handleRemoveProduct = (productId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        setSelectedProductIds(prevIds => prevIds.filter(id => id !== productId));
    };

    const handleProductSelect = (selectedIds) => {
        setSelectedProductIds(selectedIds);
        const selectedProducts = myProducts?.filter(product => selectedIds.includes(product.id));
        setProducts(selectedProducts);
    };

    const [editCollection] = useEditCollectionMutation();

    const handleSaveChanges = async () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!description.trim() || description === "<p><br></p>") {
            newErrors.description = "Description is required";
        }
        if (!coverFile && !coverPreview) {
            newErrors.coverImage = "Cover image is required";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('marketId', Cookies.get('chooseMarket'));
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isActive', isActive);

        if (coverFile) {
            formData.append('coverImageFile', coverFile);
        }

        selectedProductIds.forEach(productId => {
            formData.append('productIds', productId);
        });

        const deleteProductIds = JSON.parse(localStorage.getItem('deletedProductIds')) || [];
        deleteProductIds.forEach(productId => {
            formData.append('deleteProductIds', productId);
        });

        try {
            const response = await editCollection(formData).unwrap();
            if (response?.statusCode === 200) {
                refetch()
                toast.success('Sifariş uğurla tamamlandı!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    onClose: () => navigate('/cp/collections')
                });
            }
        } catch (error) {
            toast.error('Xeta baş verdi!', {
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

        message.success("Collection updated successfully!");
    };

    return (
        <section id="adminEditCollectionMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Category status</span>
                    <button
                        className={isActive ? "active" : "inactive"}
                        onClick={handleStatusToggle}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Edit collection</h1>
                </div>

                <div className="wrapper">
                    <div className="inputWrapper">
                        <label>Title</label>
                        <input
                            id="productTitle"
                            name="title"
                            placeholder="Enter collection title"
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
                        <label htmlFor="productTitle">Description</label>
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

                <div className="row">
                    <div className="pd0 pd1 col-8">
                        <div className="wrapper" style={{ padding: 0 }}>
                            <div className="textWrapper" style={{ padding: '32px 32px 0 32px' }}>
                                <h4>Products</h4>
                                <div className="inputWrapper1">
                                    <input placeholder="Search..." />
                                    <button onClick={handleBigBoxClick} className={"menimButton"}>Axtar</button>
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="textWrapper">
                                <div className="inputWrapper1">
                                    <table className="product-table">
                                        <tbody>
                                        {filteredProducts?.length > 0 ? (
                                            filteredProducts?.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="checkboxWrapper">{index + 1}.</td>
                                                    <td className="img">
                                                        <img
                                                            src={item.imageNames && item.imageNames.length > 0
                                                                ? `${PRODUCT_LOGO}${item.imageNames[0]}`
                                                                : ""}
                                                            alt={item.title}
                                                            onError={(e) => (e.target.src = PRODUCT_LOGO + item?.imageNames[0])}
                                                        />
                                                    </td>
                                                    <td className="productName">{item.title}</td>
                                                    <td className="btnbtn123123">
                                                        <button className={item.status ? "active" : "inactive"}>
                                                            <GoDotFill />
                                                            {item.status ? "Active" : "Inactive"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            gap: '16px',
                                                        }}
                                                    >
                                                        <img src="/path/to/no-products-image.jpg" alt="No products" />
                                                        <div style={{ maxWidth: '400px', width: '100%' }}>
                                                            There are no products in this collection. Search for products.
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pd0 pd2 col-4">
                        <div className="wrapper" style={{ padding: 0 }}>
                            <div className="textWrapper" style={{ padding: '32px 32px 0 32px' }}>
                                <h4>Collection image</h4>
                            </div>
                            <div className="line"></div>
                            <div className="textWrapper">
                                <div className="inputWrapper1" style={{ textAlign: 'center', justifyContent: 'center' }}>
                                    {coverPreview ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img
                                                src={coverFile ? coverPreview : `${COLLECTION_LOGO}${coverPreview}`}
                                                alt="Cover"
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    borderRadius: '15px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <button
                                                style={{
                                                    marginTop: '12px',
                                                    padding: '8px 16px',
                                                    backgroundColor: '#f5f5f5',
                                                    border: '1px solid #ccc',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={handleRemoveCoverImage}
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <Dragger
                                            {...draggerProps}
                                            style={{
                                                border: '1px dashed gray',
                                                margin: '16px',
                                                width: 'calc(100% - 32px)',
                                                borderWidth: '2px',
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <button>+ Add media</button>
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag file to this area to upload
                                            </p>
                                        </Dragger>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttin1">
                <button onClick={handleSaveChanges}>Save changes</button>
            </div>

            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={1000}
                modalRender={(modal) =>
                    cloneElement(modal, {
                        style: { ...modal.props.style, padding: 0, borderRadius: '20px' },
                    })
                }
            >
                <AdminCategoryAddProduct
                    selectedProducts={selectedProductIds}
                    onProductSelect={handleProductSelect}
                    allProducts={myProducts || []} // Pass all products instead of collection.products
                />
            </Modal>

            <CategoryModal
                isOpen={false}
                onClose={() => {}}
                onSave={() => {}}
            />
            <ToastContainer />
        </section>
    );
}

export default AdminEditCollectionMenu;