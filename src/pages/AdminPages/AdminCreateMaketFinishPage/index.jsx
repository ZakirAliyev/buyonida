import './index.scss';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react';
import {Button, Upload} from 'antd';
import {PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import image1 from '/src/assets/sariLogo.png';
import {usePostCreateMarketMutation} from "../../../service/userApi.js";
import {FaArrowLeft} from "react-icons/fa";
import {PulseLoader} from "react-spinners";
import {Helmet} from "react-helmet-async";

function AdminCreateMaketFinishPage() {
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const previousData = location.state || {};
    const [postCreateMarket] = usePostCreateMarketMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || description.trim() === '') {
            toast.error('Zəhmət olmasa, bütün tələb olunan sahələri doldurun!', {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            return;
        }
        const formData = new FormData();
        for (const key in previousData) {
            formData.append(key, previousData[key]);
        }
        formData.append('description', description);
        formData.append('image', file);

        setIsSubmitting(true);
        try {
            const response = await postCreateMarket(formData).unwrap();
            if (response?.statusCode === 201) {
                toast.success('Əməliyyat uğurla tamamlandı!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    onClose: () => navigate('/choose-market')
                });
            }
        } catch (error) {
            toast.error('Məhsulun adı unikal olmalıdır!', {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (info) => {
        if (info.fileList.length > 0) {
            setFile(info.fileList[0].originFileObj);
        } else {
            setFile(null);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    return (
        <section id="adminCreateMaketPage">
            <Helmet>
                <title>{'Create Market Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo"/>
                </div>
                <div className="title" onClick={() => window.history.back()}>
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '20px'
                    }} className={"spanTitle"}>
                        <FaArrowLeft style={{fontSize: '12px'}}/> Geri
                    </span>
                    <h2>Bir neçə detal qaldı</h2>
                    <h3>Brend loqonu və açıqlamanı yaz ki, insanlar səni tanısın</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="upload-section">
                        <Upload
                            accept="image/*"
                            maxCount={1}
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            {file ? (
                                <div style={{position: 'relative'}}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded logo"
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                    <DeleteOutlined
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            fontSize: '16px',
                                            color: 'red',
                                            cursor: 'pointer',
                                            backgroundColor: 'gray'
                                        }}
                                        onClick={handleRemoveFile}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                            )}
                        </Upload>
                        <p>Logonuzu əlavə edin</p>
                    </div>
                    <label>Markanız haqqında məlumat</label>
                    <textarea
                        placeholder="Markanız haqqında məlumat..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                    />
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <PulseLoader color={'white'} size={8} loading={isSubmitting} />
                        ) : 'İleri'}
                    </Button>
                </form>
                <div className="links">
                    <Link to={'/help'} className={"link"}>Help</Link>
                    <Link to={'/privacy'} className={"link"}>Privacy</Link>
                    <Link to={'/terms'} className={"link"}>Terms</Link>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}

export default AdminCreateMaketFinishPage;
