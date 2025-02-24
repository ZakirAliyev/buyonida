import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import image1 from '/src/assets/sariLogo.png';
import {
    usePostConfirmLoginOwnerMutation
} from '../../../service/userApi.js';

function AdminCreateMaketFinishPage() {
    const [description, setDescription] = useState('');
    const [code, setCode] = useState(''); // Ensure this value is obtained dynamically if needed
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
    const [postConfirmLoginOwner] = usePostConfirmLoginOwnerMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('loginEmail');
        try {
            const response = await postConfirmLoginOwner({ email, code }).unwrap();
            if (response?.statusCode === 200) {
                toast.success('Təstiqləmə uğurlu oldu', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    theme: 'dark',
                });
                navigate('/choose-market');
            }
        } catch (error) {
            toast.error('Xəta baş verdi', {
                position: 'bottom-right',
                autoClose: 2500,
                theme: 'dark',
            });
        }
    };

    const handleFileChange = ({ file }) => {
        setFile(file.originFileObj);
    };

    return (
        <section id="adminCreateMaketPage">
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Bir neçə detal qaldı</h2>
                    <h3>Brend loqonu və açığlamanı yaz ki, insanlar səni tanısın</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="upload-section">
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            {file ? <img src={URL.createObjectURL(file)} alt="uploaded logo" style={{ width: '100%' }} /> : <PlusOutlined />}
                        </Upload>
                        <p>Logonuzu əlavə edin</p>
                    </div>
                    <label>Markanız haqqında məlumat</label>
                    <textarea
                        placeholder="Market name..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                    />
                    <Button type="primary" htmlType="submit">
                        İləri
                    </Button>
                </form>
                <div className="links">
                    <Link to="/public" className="link">Help</Link>
                    <Link to="/public" className="link">Privacy</Link>
                    <Link to="/public" className="link">Terms</Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default AdminCreateMaketFinishPage;