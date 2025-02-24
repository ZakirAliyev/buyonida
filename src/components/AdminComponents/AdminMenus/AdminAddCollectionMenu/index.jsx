import './index.scss';
import {useNavigate} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";
import ReactQuill from "react-quill";
import {cloneElement, useState} from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import AdminPopUp from "../../AdminPopUp/index.jsx";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import {Modal} from "antd";
import AdminSelectFile from "../../AdminSelectFile/index.jsx";
import image1 from "../../../../assets/miniPhoto.png";
import {RxCross2} from "react-icons/rx";

import {message, Upload} from 'antd';

const {Dragger} = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

function AdminAddCollectionMenu() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState(["Üst geyim", "Alt geyim", "Kurtka"]);

    const handleCreateCategory = (categoryName) => {
        if (categoryName.trim()) {
            setCategories([...categories, categoryName]);
            setSelectedCategory(categoryName);
        }
        setIsModalOpen(false);
    };

    const [title, setTitle] = useState("");
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

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            description: value.trim() === "<p><br></p>" ? "Description can't be blank" : "",
        }));

    };

    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const handleBigBoxModalClose = () => {
        setIsBigBoxModalOpen(false);
    };

    return (
        <section id="adminAddProductMenu">
            <div className={"umumi"}>
                <div className={"abso"}>
                    <span>Collection status</span>
                    <button>Active</button>
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
                </div>
                <div className={"row"}>
                    <div className={"pd0 pd1 col-8"}>
                        <div className={"wrapper"} style={{
                            padding: 0
                        }}>
                            <div className={"textWrapper"} style={{
                                padding: '32px 32px 0 32px'
                            }}>
                                <h4>Products</h4>
                                <div className={"inputWrapper1"}>
                                    <input placeholder={"Search..."}/>
                                    <button>Axtar</button>
                                </div>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className={"checkboxWrapper"}>
                                                1.
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
                                        <tr>
                                            <td className={"checkboxWrapper"}>
                                                1.
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"pd0 pd2 col-4"}>
                        <div className={"wrapper"} style={{
                            padding: 0
                        }}>
                            <div className={"textWrapper"} style={{
                                padding: '32px 32px 0 32px'
                            }}>
                                <h4>Collection image</h4>
                            </div>
                            <div className={"line"}></div>
                            <div className={"textWrapper"}>
                                <div className={"inputWrapper1"}>
                                    <Dragger {...props} style={{
                                        border: '1px dashed gray',
                                        margin: '16px',
                                        width: 'calc(100% - 32px)',
                                        borderWidth: '2px'
                                    }}>
                                        <p className="ant-upload-drag-icon">
                                            <button>+ Add media</button>
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    </Dragger>
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

export default AdminAddCollectionMenu;
