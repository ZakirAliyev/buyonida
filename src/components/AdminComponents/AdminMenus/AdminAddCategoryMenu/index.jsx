import './index.scss';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import { Upload } from "antd";
import ReactQuill from "react-quill";
import { toast, ToastContainer } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    useGetAllProductsByMarketIdQuery,
    usePostCreateCategoryMutation
} from "../../../../service/userApi.js";
import { PulseLoader } from "react-spinners";

const { Dragger } = Upload;

function AdminAddCategoryMenu() {
    const navigate = useNavigate();

    // Burada, oluşturulan kategori eklendikten sonra AdminCollectionsMenu’da veya diğer yerlerde
    // güncel verilerin gösterilmesi için getAllProducts sorgusunun refetch fonksiyonunu çağırıyoruz.
    const { data: getAllProducts, refetch: productsRefetch } =
        useGetAllProductsByMarketIdQuery(Cookies.get("chooseMarket"));

    // State'ler
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [marketId] = useState(Cookies.get("chooseMarket"));
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [addLoading, setAddLoading] = useState(false);

    // Title değişimi
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setErrors((prev) => ({
            ...prev,
            title: value.trim() === "" ? "Title can't be blank" : ""
        }));
    };

    // ReactQuill ile Description değişimi
    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prev) => ({
            ...prev,
            description:
                value.replace(/<(.|\n)*?>/g, "").trim() === ""
                    ? "Description can't be blank"
                    : ""
        }));
    };

    // Status toggle: isActive durumunu tersine çevirir
    const handleStatusToggle = () => {
        setIsActive((prev) => !prev);
    };

    // Dragger component dosya upload ayarları
    const uploadProps = {
        multiple: false,
        showUploadList: true,
        beforeUpload: () => false, // otomatik upload devre dışı
        onChange(info) {
            const { fileList } = info;
            if (fileList.length > 0) {
                // Son eklenen dosyayı state'e atıyoruz
                const selectedFile = fileList[fileList.length - 1].originFileObj;
                setFile(selectedFile);
                // Resim seçildiğinde hata varsa temizle
                setErrors((prev) => ({ ...prev, file: "" }));
            } else {
                setFile(null);
            }
        }
    };

    const [postCreateCategory] = usePostCreateCategoryMutation();

    // Form submit (post yerine, sadece log ve refetch yapılacak)
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (title.trim() === "") newErrors.title = "Title can't be blank";
        if (
            description.replace(/<(.|\n)*?>/g, "").trim() === ""
        )
            newErrors.description = "Description can't be blank";
        if (!file) newErrors.file = "Please upload an image file";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // FormData oluşturuluyor
        const formData = new FormData();
        formData.append("name", title);
        formData.append("marketId", marketId);
        formData.append("imageFile", file);
        formData.append("isActive", isActive);
        formData.append("description", description);

        setAddLoading(true);
        try {
            const response = await postCreateCategory(formData).unwrap();
            if (response.statusCode === 201) {
                // Refetch çağrısı ile verilerin güncellenmesini sağlıyoruz.
                productsRefetch();

                toast.success("Kateqoriya uğurla yaradıldı!", {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => navigate("/cp/categories")
                });
            }
        } catch (err) {
            toast.error("Xəta baş verdi!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        setAddLoading(false);
    };

    return (
        <section id="adminAddCategoryMenu">
            <div className="umumi">
                {/* Üstteki status bar */}
                <div className="abso">
                    <span>Category status</span>
                    <button onClick={handleStatusToggle}>
                        {isActive ? "Active" : "Inactive"}
                    </button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Create category</h1>
                </div>
                <form onSubmit={handleSaveChanges}>
                    <div className="row">
                        {/* Sol sütun: Form bilgileri */}
                        <div className="pd0 col-6" style={{ paddingRight: "8px" }}>
                            <div className="wrapper">
                                {/* Title */}
                                <div className="inputWrapper">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id="categoryTitle"
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
                                {/* Description */}
                                <div className="inputWrapper">
                                    <label>Description</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        className={
                                            errors.description
                                                ? "codeEditor errorInput"
                                                : "codeEditor"
                                        }
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
                        {/* Sağ sütun: Kategori resmi yükleme */}
                        <div className="pd0 col-6" style={{ paddingLeft: "8px" }}>
                            <div className="wrapper" style={{ padding: 0 }}>
                                <div
                                    className="textWrapper"
                                    style={{ padding: "16px 32px 0 32px" }}
                                >
                                    <h4>Category Image</h4>
                                </div>
                                <div className="line"></div>
                                <div className="inputWrapper">
                                    {file ? (
                                        <div
                                            style={{
                                                marginTop: 16,
                                                textAlign: "center",
                                                position: "relative"
                                            }}
                                            className="imageWrapper"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Uploaded preview"
                                                style={{ maxWidth: "100%", maxHeight: 300 }}
                                                className="image111"
                                            />
                                            <span
                                                className="removeImage"
                                                onClick={() => setFile(null)}
                                            >
                        <RxCross2 className="icon" />
                      </span>
                                        </div>
                                    ) : (
                                        <Dragger
                                            {...uploadProps}
                                            style={{
                                                border: "1px dashed gray",
                                                margin: "16px",
                                                width: "calc(100% - 32px)",
                                                borderWidth: "2px"
                                            }}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <button type="button">+ Add media</button>
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag file to this area to upload
                                            </p>
                                        </Dragger>
                                    )}
                                    {errors.file && (
                                        <span
                                            className="error-text"
                                            style={{ marginLeft: "16px", marginTop: 32 }}
                                        >
                      <AiOutlineExclamationCircle className="icon" />
                                            {errors.file}
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Kaydet Butonu (Tam genişlikte) */}
                    <div
                        className="buttin1"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white"
                        }}
                    >
                        <button type="submit">
                            {addLoading ? (
                                <PulseLoader color={"white"} />
                            ) : (
                                <>Save changes</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </section>
    );
}

export default AdminAddCategoryMenu;
