import './index.scss';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { message, Upload } from "antd";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { usePostCreateCategoryMutation } from "../../../../service/userApi.js";
import {toast, ToastContainer} from "react-toastify";
import Cookies from "js-cookie";

const { Dragger } = Upload;

function AdminAddCategoryMenu() {
    const navigate = useNavigate();
    const [postCreateCategory] = usePostCreateCategoryMutation();

    // State'ler: title (name), marketId ve dosya (imageFile)
    const [title, setTitle] = useState("");
    const [marketId, setMarketId] = useState(Cookies.get("chooseMarket"));
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    // Title input değişim işlemi
    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
        setErrors(prevErrors => ({
            ...prevErrors,
            title: newTitle.trim() === "" ? "Title can't be blank" : "",
        }));
    };

    // Dosya yükleme ayarları: tek dosya al, otomatik upload kapalı
    const uploadProps = {
        multiple: false,
        showUploadList: true,
        beforeUpload: () => false,
        onChange(info) {
            const { fileList } = info;
            if (fileList.length > 0) {
                // En son eklenen dosyayı state’e atıyoruz
                setFile(fileList[fileList.length - 1].originFileObj);
            } else {
                setFile(null);
            }
        }
    };

    // Form submit işlemi: name, marketId ve imageFile gönderiliyor
    const handleSaveChanges = async () => {
        let newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Title can't be blank";
        }
        if (!file) {
            newErrors.file = "Please upload an image file";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // FormData oluşturuyoruz
        const formData = new FormData();
        formData.append("name", title);
        formData.append("marketId", Cookies.get('chooseMarket'));
        formData.append("imageFile", file);

        try {
            const response = await postCreateCategory(formData).unwrap();
            if (response.statusCode === 201) {
                toast.success(`Category created successfully`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                // İsteğe bağlı: Formu sıfırlayabilirsiniz
                setTitle("");
                setFile(null);
                setErrors({});
            } else {
                toast.error(`Error: ${response.message || "Unknown error"}`, {
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
        } catch (e) {
            toast.error(`Error creating category`, {
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
        <section id="adminAddCategoryMenu">
            <div className="umumi">
                <div className="abso">
                    <span>Category status</span>
                    <button>Active</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>Create category</h1>
                </div>

                <div className="row">
                    <div className="pd0 col-6" style={{ paddingRight: '8px' }}>
                        <div className="wrapper">
                            <div className="inputWrapper">
                                <label>Title</label>
                                <input
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
                            <div className="inputWrapper">
                                <label>Market ID</label>
                                <input
                                    id="marketId"
                                    name="marketId"
                                    placeholder="Enter market ID"
                                    value={Cookies.get('chooseMarket')}
                                    className={errors.marketId ? "errorInput" : ""}
                                    disabled
                                    style={{
                                        cursor: 'not-allowed'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pd0 col-6" style={{ paddingLeft: '8px' }}>
                        <div className="wrapper" style={{ padding: 0 }}>
                            <div className="textWrapper" style={{ padding: "16px 32px 0 32px" }}>
                                <h4>Category Image</h4>
                            </div>
                            <div className="line"></div>
                            <div className="inputWrapper">
                                {file ? (
                                    <div style={{ marginTop: 16, textAlign: 'center', position: 'relative' }}
                                         className="imageWrapper">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Uploaded preview"
                                            style={{ maxWidth: '100%', maxHeight: 300 }}
                                            className="image111"
                                        />
                                        <span className="removeImage" onClick={() => setFile(null)}>
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
                                            borderWidth: "2px",
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
                                {errors.file && (
                                    <span className="error-text">
                                        <AiOutlineExclamationCircle className="icon" />
                                        {errors.file}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kaydet Butonu */}
            <div className="buttin1">
                <button onClick={handleSaveChanges}>Save changes</button>
            </div>
            <ToastContainer/>
        </section>
    );
}

export default AdminAddCategoryMenu;
