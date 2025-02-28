import './index.scss';
import {useNavigate, useParams} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import ReactQuill from "react-quill";
import {cloneElement, useState, useEffect} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal, message, Upload} from "antd";
import image1 from "../../../../assets/miniPhoto.png";
import image2 from "../../../../assets/order.png";
import {RxCross2} from "react-icons/rx";
import AdminCategoryAddProduct from "../../AdminCategoryAddProduct/index.jsx";
import {useGetCollectionByMarketIdQuery} from "../../../../service/userApi.js";
import {COLLECTION_LOGO} from "../../../../../constants.js";

const {Dragger} = Upload;

function AdminEditCollectionMenu() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const marketId = params.marketId;

    // API‑dən kolleksiya məlumatlarını götürürük
    const {data: getCollectionByMarketId} = useGetCollectionByMarketIdQuery({id, marketId});
    const collection = getCollectionByMarketId?.data;
    console.log("Fetched collection:", collection);

    // Form inputları üçün state-lər
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    // Cover şəkli üçün state-lər
    const [coverFile, setCoverFile] = useState(null);      // Yeni yüklənən fayl
    const [coverPreview, setCoverPreview] = useState(null); // Ekranda göstərilən şəkil linki

    // Mövcud kolleksiya məlumatları varsa, form sahələrini doldururuq
    useEffect(() => {
        if (collection) {
            setTitle(collection.title || "");
            setDescription(collection.description || "");
            // Əgər backend-dən gələn coverImageUrl varsa, onu ekranda göstərmək üçün coverPreview-ə yazırıq
            if (collection.coverImageUrl) {
                // Məsələn, base URL-lə birləşdirə bilərsiniz:
                // setCoverPreview(`${process.env.REACT_APP_BASE_IMAGE_URL}/${collection.coverImageUrl}`);
                // Yoxsa sadəcə coverImageUrl:
                setCoverPreview(collection.coverImageUrl);
            }
        }
    }, [collection]);

    // Title dəyişəndə
    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setErrors((prevErrors) => ({
            ...prevErrors,
            title: newTitle.trim() === "" ? "Title can't be blank" : "",
        }));
    };

    // Description dəyişəndə
    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : "",
        }));
    };

    // Fayl seçilən kimi preview yaratmaq üçün köməkçi funksiyalar
    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setCoverPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    // Seçilmiş şəkli silmək üçün
    const handleRemoveCoverImage = () => {
        setCoverFile(null);
        setCoverPreview(null);
    };

    // Yalnız 1 şəkil seçməyə icazə verən Dragger propertiləri
    const draggerProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        beforeUpload(file) {
            // Faylı state-ə yazır və preview yaradırıq
            setCoverFile(file);
            handlePreview(file);
            // Heç bir yerə upload etmirik
            return false;
        },
        onChange(info) {
            const {status} = info.file;
            if (status === 'removed') {
                // Dragger-dən silinibsə, state-dən də silək
                setCoverFile(null);
                setCoverPreview(null);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // Modal açılıb-bağlanması
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    // Kategoriya modalı
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(["Üst geyim", "Alt geyim", "Kurtka"]);

    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            setCategories([...categories, categoryName]);
            setSelectedCategory(categoryName);
        }
        setIsModalOpen(false);
    };

    // Sadə dummy array - realda backend-dən gələn productlar
    const arr = new Array(1).fill(0);

    return (
        <section id="adminEditCollectionMenu">
            <div className={"umumi"}>
                <div className={"abso"}>
                    <span>Category status</span>
                    <button>Active</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon"/>
                    </div>
                    <h1>Edit collection</h1>
                </div>

                {/* Title və Description */}
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
                <AiOutlineExclamationCircle className={"icon"}/>
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
                <AiOutlineExclamationCircle className={"icon"}/>
                                {errors.description}
              </span>
                        )}
                    </div>
                </div>

                {/* Products */}
                <div className={"row"}>
                    <div className={"pd0 pd1 col-8"}>
                        <div className={"wrapper"} style={{padding: 0}}>
                            <div className={"textWrapper"} style={{padding: '32px 32px 0 32px'}}>
                                <h4>Products</h4>
                                <div className={"inputWrapper1"}>
                                    <input placeholder={"Search..."}/>
                                    <button onClick={handleBigBoxClick}>Axtar</button>
                                </div>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}>
                                    <table className="product-table">
                                        <tbody>
                                        {arr && arr.length !== 0 ? (
                                            arr.map((item, index) => (
                                                <tr key={index}>
                                                    <td className={"checkboxWrapper"}>
                                                        {index + 1}.
                                                    </td>
                                                    <td className={"img"}>
                                                        <img src={image1} alt={"Image"}/>
                                                    </td>
                                                    <td className={"productName"}>
                                                        Product name
                                                    </td>
                                                    <td className={"btnbtn123"}>
                                                        <button>Active</button>
                                                    </td>
                                                    <td>
                                                        <RxCross2/>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center',
                                                flexDirection: 'column',
                                                gap: '16px'
                                            }}>
                                                <img src={image2} alt={"Image"}/>
                                                <div style={{
                                                    maxWidth: '400px',
                                                    width: '100%',
                                                }}>
                                                    There are no products in this collection.
                                                    Search for products
                                                </div>
                                            </div>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Collection image */}
                    <div className={"pd0 pd2 col-4"}>
                        <div className={"wrapper"} style={{padding: 0}}>
                            <div className={"textWrapper"} style={{padding: '32px 32px 0 32px'}}>
                                <h4>Collection image</h4>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}
                                     style={{textAlign: 'center', justifyContent: 'center'}}>
                                    {coverPreview ? (
                                        // Əgər coverPreview mövcuddursa (yəni mövcud və ya yeni seçilmiş şəkil)
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}>
                                            <img
                                                src={COLLECTION_LOGO + coverPreview}
                                                alt="Cover"
                                                style={{
                                                    width: '150px',
                                                    height: '150px',
                                                    borderRadius: '15px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <button
                                                style={{
                                                    marginTop: '12px',
                                                    padding: '8px 16px',
                                                    backgroundColor: '#f5f5f5',
                                                    border: '1px solid #ccc',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={handleRemoveCoverImage}
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        // Əks halda Dragger göstəririk
                                        <Dragger
                                            {...draggerProps}
                                            style={{
                                                border: '1px dashed gray',
                                                margin: '16px',
                                                width: 'calc(100% - 32px)',
                                                borderWidth: '2px'
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

            {/* Save changes düyməsi */}
            <div className={"buttin1"}>
                <button>Save changes</button>
            </div>

            {/* Modal - məhsul seçimi */}
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={1000}
                modalRender={(modal) => {
                    return cloneElement(modal, {
                        style: {...modal.props.style, padding: 0, borderRadius: '20px'},
                    });
                }}
            >
                <AdminCategoryAddProduct/>
            </Modal>

            {/* Kategoriya yaratmaq üçün modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
        </section>
    );
}

export default AdminEditCollectionMenu;
