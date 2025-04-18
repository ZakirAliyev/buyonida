import './index.scss';
import {useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import ReactQuill from "react-quill";
import {cloneElement, useState} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal, message, Upload} from "antd";
import image2 from "../../../../assets/order.png";
import {RxCross2} from "react-icons/rx";
import AdminCollectionAddProduct from "../../AdminCollectionAddProduct/index.jsx";
import Cookies from "js-cookie";
import {PRODUCT_LOGO} from "../../../../../constants.js";
import {usePostCreateCollectionMutation} from "../../../../service/userApi.js";
import {toast, ToastContainer} from "react-toastify";
import {PulseLoader} from "react-spinners";

const {Dragger} = Upload;

function AdminAddCollectionMenu() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const handleStatusToggle = () => {
        setIsActive((prev) => !prev);
    };
    // Kolleksiyanın ümumi məlumatları
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Yüklənən tək fayl üçün state-lər
    const [coverFile, setCoverFile] = useState(null);        // Fayl obyektini saxlayır
    const [coverPreview, setCoverPreview] = useState(null);  // Faylın 100x100 preview linki

    // Seçilmiş məhsullar
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Məlumatların ekranda göstərilməsi üçün saxlayacağımız state
    const [collectionData, setCollectionData] = useState(null);

    // Modal idarəsi
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);

    // Kategoriya üçün nümunə state
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(["Üst geyim", "Alt geyim", "Kurtka"]);

    // Error-ların idarəsi
    const [errors, setErrors] = useState({});

    const [postCreateCollection] = usePostCreateCollectionMutation();

    // Fayl seçilən kimi preview yaratmaq üçün köməkçi funksiyalar
    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setCoverPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    // Dragger propertiləri
    const draggerProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        beforeUpload(file) {
            setCoverFile(file);
            handlePreview(file);
            return false; // Heç yerə upload etmirik, sadəcə faylı saxlayırıq
        },
        onChange(info) {
            const {status} = info.file;
            if (status === 'removed') {
                setCoverFile(null);
                setCoverPreview(null);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
        },
    };

    // Title və Description dəyişdikdə error-ları yoxla
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
        }));
    };

    // Modal açılıb-bağlanması
    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(true);
    };

    const handleProductSelectionDone = () => {
        setIsBigBoxModalOpen(false);
    };

    // Seçilmiş məhsulu silmək
    const handleRemoveProduct = (productId) => {
        const updatedProducts = selectedProducts.filter(prod => prod.id !== productId);
        setSelectedProducts(updatedProducts);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));
    };

    // Yeni kategoriya yaratmaq
    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            setCategories([...categories, categoryName]);
            setSelectedCategory(categoryName);
        }
        setIsModalOpen(false);
    };

    // X butonuna basaraq cover şəkli silmək
    const handleRemoveCoverImage = () => {
        setCoverFile(null);
        setCoverPreview(null);
    };

    // Formu resetləmək üçün köməkçi funksiya
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setCoverFile(null);
        setCoverPreview(null);
        setSelectedProducts([]);
        setCollectionData(null);
        setErrors({});
        localStorage.removeItem('selectedProducts');
    };

    const [loading, setLoading] = useState(false);

    // "Save changes" düyməsinə kliklədikdə bütün dataları toplayırıq
    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description || "");
        formData.append("marketId", Cookies.get('chooseMarket') || "");
        formData.append("isActive", isActive);

        if (coverFile) {
            formData.append("coverImage", coverFile);
        }

        selectedProducts.forEach((prod) => {
            formData.append("productIds", prod.id);
        });

        const data = {
            title,
            description,
            coverImage: coverFile ? coverFile.name : null,
            marketId: Cookies.get('chooseMarket'),
            productIds: selectedProducts.map((item) => item.id),
        };
        setCollectionData(data);

        setLoading(true);
        try {
            const response = await postCreateCollection(formData).unwrap();
            if (response.statusCode === 201) {
                toast.success(`Yaradildi`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                // Uğurla yaradılanda formu sıfırlayırıq
                resetForm();
            }
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
        setLoading(false);
    };

    return (
        <section id="adminAddProductMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Collection status</span>
                    <button onClick={handleStatusToggle}>
                        {isActive ? "Active" : "Inactive"}
                    </button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon"/>
                    </div>
                    <h1>Create collection</h1>
                </div>

                <div className="wrapper">
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
                        {errors.title && (
                            <span className="error-text">
                                <AiOutlineExclamationCircle className="icon"/>
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
                                <AiOutlineExclamationCircle className="icon"/>
                                {errors.description}
                            </span>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="pd0 pd1 col-8">
                        <div className="wrapper" style={{padding: 0}}>
                            <div className="textWrapper" style={{padding: '32px 32px 0 32px'}}>
                                <h4>Collections</h4>
                                <div className="inputWrapper1" style={{padding: '0', marginTop: '10px'}}>
                                    <input placeholder="Search..." style={{width: '100%', margin: '0'}}/>
                                    <button onClick={handleBigBoxClick}>Axtar</button>
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="textWrapper">
                                <div className="inputWrapper1" style={{padding: '16px'}}>
                                    <table className="product-table">
                                        <tbody>
                                        {selectedProducts && selectedProducts.length !== 0 ? (
                                            selectedProducts.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="checkboxWrapper">{index + 1}.</td>
                                                    <td className="img">
                                                        <img
                                                            src={PRODUCT_LOGO + item?.imageNames[0]}
                                                            alt="Image"
                                                        />
                                                    </td>
                                                    <td className="productName">{item?.title}</td>
                                                    <td className="btnbtn123">
                                                        {item?.status ? (
                                                            <button>Active</button>
                                                        ) : (
                                                            <button className="deactive">Deactive</button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <RxCross2
                                                            onClick={() => handleRemoveProduct(item.id)}
                                                            style={{cursor: 'pointer'}}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                    marginTop: '20px'
                                                }}
                                            >
                                                <td
                                                    colSpan="5"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        textAlign: 'center',
                                                        flexDirection: 'column',
                                                        gap: '16px'
                                                    }}
                                                >
                                                    <img src={image2} alt="Image"/>
                                                    <div style={{maxWidth: '400px', width: '100%'}}>
                                                        There are no products in this collection. Search for products
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

                    {/* Sağ tərəfdə cover şəkli seçmək */}
                    <div className="pd0 pd2 col-4">
                        <div className="wrapper" style={{padding: 0}}>
                            <div className="textWrapper" style={{padding: '32px 32px 0 32px'}}>
                                <h4>Collection image</h4>
                            </div>
                            <div className="line"></div>
                            <div className="textWrapper">
                                <div className="inputWrapper1" style={{padding: '0', marginTop: '20px', alignItems: 'center', justifyContent: 'center'}}>
                                    {/* Əgər coverPreview varsa, yəni bir şəkil seçilibsə, onu göstəririk */}
                                    {coverPreview ? (
                                        <div style={{position: 'relative', width: '150px', height: '150px',border: '1px solid #ccc', borderRadius: '10px', cursor: 'pointer'}} >
                                            <img
                                                src={coverPreview}
                                                alt="Preview"
                                                style={{width: '150px', height: '150px', objectFit: 'cover'}}
                                            />
                                            <RxCross2
                                                onClick={handleRemoveCoverImage}
                                                style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    background: '#fff',
                                                    borderRadius: '50%',
                                                    padding: '2px'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        // Əks halda Dragger göstəririk
                                        <Dragger {...draggerProps} style={{
                                            border: '1px dashed gray',
                                            margin: '16px',
                                            width: 'calc(100% - 32px)',
                                            borderWidth: '2px'
                                        }}>
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

            {/* "Save changes" düyməsi - bütün məlumatları toplayırıq */}
            <div className="buttin1">
                <button onClick={handleSaveChanges}>{
                    loading ? <PulseLoader color={"white"} size={8}/> : <>Save changes</>
                }</button>
            </div>

            {/* Toplanan məlumatları ekranda JSON formatında göstərmək üçün nümunə */}
            {collectionData && (
                <div style={{marginTop: '20px', backgroundColor: '#f9f9f9', padding: '16px'}}>
                    <h3>Collection Data Preview:</h3>
                    <pre>{JSON.stringify(collectionData, null, 2)}</pre>
                </div>
            )}

            {/* Modal - məhsul seçimi */}
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
                <AdminCollectionAddProduct
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    onDone={handleProductSelectionDone}
                />
            </Modal>

            {/* Kategoriya yaratmaq üçün modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateCategory}
            />
            <ToastContainer/>
        </section>
    );
}

export default AdminAddCollectionMenu;
