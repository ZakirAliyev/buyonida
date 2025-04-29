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
import {usePostGoogleLoginMutation, usePostLoginOwnerMutation} from "../../../../service/userApi.js";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";

function AdminLoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postLogin] = usePostLoginOwnerMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
        validationSchema: SignupSchema,
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
        }
    });

    function handleValidationClick() {
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length !== 0) {
                Object.entries(errors).forEach(([field, message]) => {
                    toast.error(`${field} is ${message}`, {
                        position: 'bottom-right',
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                });
            }
        });
    }

    const [postGoogleLogin] = usePostGoogleLoginMutation()

    async function handleGoogleLoginSuccess(credentialResponse) {
        const idToken = credentialResponse.credential;
        if (!idToken) {
            toast.error('Google ID token not found', { theme: 'dark' });
            return;
        }

        try {
            const response = await postGoogleLogin(idToken).unwrap();
            Cookies.set('buyonidaToken', response?.data?.token, { expires: 1 });
            toast.success(`${response?.message || 'Google login successful'}`, {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                onClose: () => navigate('/cp'),
            });
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
    }

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
                            onClick={() => setShowPassword(prev => !prev)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '15px',
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

                    <button type="submit" onClick={handleValidationClick}>
                        {!isSubmitting ? <span>Log in</span> : (
                            <PulseLoader color={'white'} size={8} loading={isSubmitting} />
                        )}
                    </button>
                </form>

                <div className={"orWrapper"}>
                    <div className={"line"}></div>
                    <div className={"or"}>or</div>
                    <div className={"line"}></div>
                </div>

                <div className={"options"}>
                    <div className={"option"}>
                        <img src="https://download.logo.wine/logo/Apple_Inc./Apple_Inc.-Logo.wine.png" alt="Apple" />
                    </div>
                    <div className={"option option1"}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="Facebook" />
                    </div>
                    <div className={"option"} style={{ cursor: 'pointer' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => toast.error('Google login failed', { theme: 'dark' })}
                            scope="openid email profile"
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
