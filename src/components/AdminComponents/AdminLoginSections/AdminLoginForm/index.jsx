import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import { IoChevronForwardOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import * as Yup from "yup";
import image1 from "/src/assets/sariLogo.png";
import { usePostLoginOwnerMutation } from "../../../../service/userApi.js";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function AdminLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postLogin] = usePostLoginOwnerMutation();
    const navigate = useNavigate();

    // Google Login Handler
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log('Google ID Token:', tokenResponse.credential);
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const response = await postLogin({
                    email: userInfo.data.email,
                    googleToken: tokenResponse.access_token,
                }).unwrap();

                toast.success(`${response?.message || 'Google login successful'}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                    onClose: () => navigate('/login-verification'),
                });
                localStorage.setItem('loginEmail', userInfo.data.email);
            } catch (e) {
                toast.error(`${e?.data?.message || 'Google login failed'}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        },
        onError: () => {
            toast.error('Google login failed', {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        },
    });

    function handleClick() {
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length !== 0) {
                const errorMessages = {
                    email: 'Email is',
                    password: 'Password is',
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
                            theme: 'dark',
                        });
                    }
                });
            }
        });
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('required!'),
        password: Yup.string()
            .min(8, 'too short!')
            .max(50, 'too long!')
            .required('required!'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            try {
                const response = await postLogin(values).unwrap();
                toast.success(`${response?.message}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                    onClose: () => navigate('/login-verification'),
                });
                resetForm();
                localStorage.setItem('loginEmail', values.email);
            } catch (e) {
                toast.error(`${e?.data?.message}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
            setIsSubmitting(false);
        },
        validationSchema: SignupSchema,
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section id={"adminLoginForm"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"} />
                </div>
                <div className={"title"}>
                    <h2>Log in</h2>
                    <h3>Continue to Buyonida</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label>Username or email</label>
                    <input
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            style={{ width: '100%' }}
                        />
                        <div
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '15px',
                                margin: 0,
                                cursor: 'pointer',
                            }}
                        >
                            {showPassword ? (
                                <IoEyeOffOutline style={{ fontSize: '20px' }} />
                            ) : (
                                <IoEyeOutline style={{ fontSize: '20px' }} />
                            )}
                        </div>
                    </div>
                    <Link to={`/forgot-pass`} className={"forgotPass"}>
                        Forgot password?
                    </Link>
                    <button type="submit" onClick={() => handleClick()}>
                        {!isSubmitting && <span>Log in</span>}
                        <PulseLoader
                            color={'white'}
                            size={8}
                            loading={isSubmitting}
                        />
                    </button>
                </form>
                <div className={"orWrapper"}>
                    <div className={"line"}></div>
                    <div className={"or"}>or</div>
                    <div className={"line"}></div>
                </div>
                <div className={"options"}>
                    <div className={"option"}>
                        <img
                            src={"https://download.logo.wine/logo/Apple_Inc./Apple_Inc.-Logo.wine.png"}
                            alt={"Apple"}
                        />
                    </div>
                    <div className={"option option1"}>
                        <img
                            src={"https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"}
                            alt={"Facebook"}
                        />
                    </div>
                    <div className={"option"} onClick={handleGoogleLogin} style={{ cursor: 'pointer' }}>
                        <img
                            src={"https://pngimg.com/d/google_PNG19635.png"}
                            alt={"Google"}
                        />
                    </div>
                </div>
                <nav>
                    New to Buyonida
                    <Link to={`/register`} className={"link"}>Get Started</Link>
                    <IoChevronForwardOutline className={"link"} />
                </nav>
                <div className={"links"}>
                    <Link to={'/help'} className={"link"}>Help</Link>
                    <Link to={'/privacy'} className={"link"}>Privacy</Link>
                    <Link to={'/terms'} className={"link"}>Terms</Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default function WrappedAdminLoginForm() {
    return (
        <GoogleOAuthProvider clientId="563103512847-4s3ft6rout2th0qgkt8p45r269sq0qqs.apps.googleusercontent.com">
            <AdminLoginForm />
        </GoogleOAuthProvider>
    );
}