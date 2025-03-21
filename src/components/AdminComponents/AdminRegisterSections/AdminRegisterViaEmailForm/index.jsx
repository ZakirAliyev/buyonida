import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import {IoChevronForward, IoEyeOffOutline, IoEyeOutline} from 'react-icons/io5';
import {Progress} from 'antd';
import {useFormik} from 'formik';
import {usePostRegisterOwnerMutation} from '../../../../service/userApi.js';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import {PulseLoader} from "react-spinners";
import * as Yup from 'yup';
import image1 from "/src/assets/sariLogo.png"

function AdminRegisterViaEmailForm() {
    const [postRegister] = usePostRegisterOwnerMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[a-z]/.test(password)) strength += 10;
        if (/\d/.test(password)) strength += 10
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        if (password.length >= 8) strength += 10;
        if (/[A-Z]/.test(password) && password.length > 8) strength += 10;
        if (/[a-z]/.test(password) && password.length > 8) strength += 10;
        if (/\d/.test(password) && password.length > 8) strength += 10
        if (/[^A-Za-z0-9]/.test(password) && password.length > 8) strength += 10;
        if (password.length >= 16) strength += 10;
        return strength
    };

    const navigate = useNavigate();

    function handleClick() {
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length !== 0) {
                const errorMessages = {
                    email: 'Email is',
                    password: 'Password is',
                    confirmPassword: 'Confirm password is',
                };

                Object.entries(errors).forEach(([field, message]) => {
                    if (errorMessages[field]) {
                        toast.error(`${errorMessages[field]} ${message}`, {
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
                });
            }
        });
    }

    const getProgressColor = (strength) => {
        if (strength < 100 && strength >= 50) return '#FBC02D';
        if (strength === 100) return 'green';
        return 'red';
    };

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('invalid!').required('required!'),
        password: Yup.string()
            .min(8, 'too short!')
            .max(50, 'too long!')
            .required('required!'),
        confirmPassword: Yup.string()
            .min(8, 'too short!')
            .max(50, 'too long!')
            .required('required!'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values, {resetForm}) => {
            setIsSubmitting(true);
            const response = await postRegister(values);

            if (response?.data?.statusCode === 400) {
                response?.data?.error.forEach((error) => {
                    toast.error(`${error}`, {
                        position: 'bottom-right',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });
                })
            } else if (response?.data?.statusCode === 201) {
                toast.success(`${response?.data?.message}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                resetForm()
                localStorage.setItem('email', values.email)
                setTimeout(() => {
                    navigate('/email-verification');
                }, 3000);
            }
            setIsSubmitting(false);
        },
        validationSchema: SignupSchema
    });

    return (
        <section id="adminRegisterViaEmailForm">
            <div className="wrapper">
                <div className="img">
                    <img
                        src={image1}
                        alt="Logo"
                    />
                </div>
                <div className="title">
                    <h2>Create Buyonida account</h2>
                    <h3>One last step before starting to sell</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <label>Password</label>
                    <div style={{
                        position: 'relative',
                    }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={(e) => {
                                formik.handleChange(e);
                                setPasswordStrength(calculatePasswordStrength(e.target.value)); // Update strength
                            }}
                            value={formik.values.password}
                            style={{
                                position: 'absolute',
                                width: '100%'
                            }}
                        />
                        <div
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '18px',
                                margin: 0,
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? <IoEyeOffOutline style={{
                                fontSize: '20px'
                            }}/> : <IoEyeOutline style={{
                                fontSize: '20px'
                            }}/>}
                        </div>
                    </div>
                    <label style={{
                        marginTop: '60px'
                    }}>Confirm Password</label>
                    <div style={{
                        position: 'relative',
                    }}>
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            style={{
                                position: 'absolute',
                                width: '100%'
                            }}
                        />
                        <div
                            type="button"
                            onClick={() => setShowPassword1((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '18px',
                                margin: 0,
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword1 ? <IoEyeOffOutline style={{
                                fontSize: '20px'
                            }}/> : <IoEyeOutline style={{
                                fontSize: '20px'
                            }}/>}
                        </div>
                    </div>
                    <Progress style={{
                        marginTop: '60px'
                    }} percent={passwordStrength} showInfo={false} className="progress"
                              strokeColor={getProgressColor(passwordStrength)}/>
                    <h3>
                        <span>Password strength</span>: good. You can optionally lengthen
                        it to make it stronger.
                    </h3>
                    <button type="submit" onClick={() => handleClick()}>
                        {!isSubmitting && <span>Create Buyonida account</span>}
                        <PulseLoader
                            color={'white'}
                            size={8}
                            loading={isSubmitting}
                        />
                    </button>
                </form>
                <div className="title1">
                    <h4 className="h4">
                        <span>Already have an account?</span>
                        <Link to="/login" className="link">
                            Log in
                        </Link>
                        <IoChevronForward
                            style={{
                                color: '#0866FF',
                            }}
                        />
                    </h4>
                </div>
                <div className="links">
                    <Link to="/public" className="link">
                        Help
                    </Link>
                    <Link to="/public" className="link">
                        Privacy
                    </Link>
                    <Link to="/public" className="link">
                        Terms
                    </Link>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}

export default AdminRegisterViaEmailForm;
