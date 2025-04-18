import './index.scss';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { usePostCreateCategoryMutation } from '../../../service/userApi.js';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import {FaX} from "react-icons/fa6";

function CategoryModal({ isOpen, onClose, onSave }) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCategoryImage(e.target.files[0]);
            setErrors((prev) => ({ ...prev, categoryImage: '' }));
        }
    };

    const handleRemoveImage = () => {
        setCategoryImage(null);
    };

    const validateFields = () => {
        let newErrors = {};
        if (!categoryName.trim()) {
            newErrors.categoryName = 'Required';
        }
        if (!categoryDescription.trim()) {
            newErrors.categoryDescription = 'Required';
        }
        if (!categoryImage) {
            newErrors.categoryImage = 'Required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [postCreateCategory] = usePostCreateCategoryMutation();

    const handleSave = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('description', categoryDescription);
        if (categoryImage) {
            formData.append('imageFile', categoryImage);
        }
        formData.append('isActive', true);
        formData.append('marketId', Cookies.get('chooseMarket'));

        try {
            const response = await postCreateCategory(formData).unwrap();
            if (response.statusCode === 200 || response.statusCode === 201) {
                toast.success('Category created successfully!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                if (onSave) {
                    onSave();
                }
                onClose();
            }
        } catch (e) {
            toast.error('Error creating category!', {
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
            setIsLoading(false);
        }
    };

    const handleBlur = (field, value) => {
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, [field]: 'Required' }));
        } else {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    if (!isOpen) return null;

    return (
        <section id="categoryModal">
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="close-button" onClick={onClose} disabled={isLoading}>
                            <AiFillCloseCircle />
                        </button>
                        <div className="row">
                            <div className="col-8">
                                <div className="inputWrapper">
                                    <label>Category name</label>
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        onBlur={() => handleBlur('categoryName', categoryName)}
                                        required
                                    />
                                    {errors.categoryName && (
                                        <span className="error-text">{errors.categoryName}</span>
                                    )}
                                </div>
                                <div className="inputWrapper">
                                    <label>Category description</label>
                                    <textarea
                                        rows={6}
                                        value={categoryDescription}
                                        onChange={(e) => setCategoryDescription(e.target.value)}
                                        onBlur={() => handleBlur('categoryDescription', categoryDescription)}
                                        required
                                    />
                                    {errors.categoryDescription && (
                                        <span className="error-text">{errors.categoryDescription}</span>
                                    )}
                                </div>
                            </div>
                            <div className="bxbx col-4">
                                <label>Upload image</label>
                                <div className="img">
                                    {categoryImage ? (
                                        <div className="image-preview" style={{ position: 'relative' }}>
                                            <img
                                                src={URL.createObjectURL(categoryImage)}
                                                alt="Category"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '10px',
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="remove-image-button"
                                                onClick={handleRemoveImage}
                                                style={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    background: 'rgba(0,0,0,0.5)',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '25px',
                                                    height: '25px',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    display:"flex",
                                                    alignItems:"center",
                                                    justifyContent:"center",
                                                }}
                                            >
                                                <FaX/>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="custom-file-upload">
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                required
                                            />
                                            <FiPlus className="plus-icon" />
                                        </label>
                                    )}
                                </div>
                                {errors.categoryImage && (
                                    <span className="error-text">{errors.categoryImage}</span>
                                )}
                                <button className="button" onClick={handleSave} disabled={isLoading}>
                                    {isLoading ? <PulseLoader size={10} color="#ffffff" /> : 'Save category'}
                                </button>
                                <button className="button1" onClick={onClose} disabled={isLoading}>
                                    Discard category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryModal;