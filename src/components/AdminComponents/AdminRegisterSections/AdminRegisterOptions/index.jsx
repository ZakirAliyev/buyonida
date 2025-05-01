import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import image1 from "/src/assets/sariLogo.png";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { usePostGoogleLoginMutation } from "../../../../service/userApi.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useState } from "react";

function AdminRegisterOptions() {
    const navigate = useNavigate();
    const [postGoogleLogin] = usePostGoogleLoginMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleClick(str) {
        if (str === "email") {
            navigate('/reg-via-email');
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const idToken = credentialResponse?.credential;
            if (!idToken) {
                toast.error('Google ID token not found', { theme: 'dark' });
                return;
            }

            setIsSubmitting(true);
            try {
                const response = await postGoogleLogin({ idToken }).unwrap();
                Cookies.set('buyonidaToken', response?.data?.token, { expires: 1 });
                toast.success(`${response?.message || 'Google registration successful'}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                    onClose: () => navigate('/choose-market'),
                });
            } catch (e) {
                toast.error(`${e?.data?.message || 'Google registration failed'}`, {
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
        onError: () => {
            toast.error('Google registration failed', { theme: 'dark' });
        },
        scope: 'openid email profile',
    });

    return (
        <section id={"adminRegisterOptions"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"} />
                </div>
                <div className={"title"}>
                    <h2>Create Buyonida account</h2>
                    <h3>One last step before starting to sell</h3>
                </div>
                <div className={"options"}>
                    <div className={"option"} onClick={() => handleClick("email")}>
                        <img
                            src={"https://static.vecteezy.com/system/resources/thumbnails/018/886/508/small_2x/email-line-icon-png.png"}
                            alt={"Image"} />
                        <span>Sign up with Email</span>
                    </div>
                    <div className={"option"} style={{ cursor: 'pointer' }}>
                        <button
                            onClick={() => googleLogin()}
                            disabled={isSubmitting}
                            className={"option"}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0',
                                margin: '0',
                                border: 'none',
                                borderRadius: '4px',
                                width: '100%',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            }}
                        >
                            <img
                                src={"https://pngimg.com/d/google_PNG19635.png"}
                                alt={"Google"}
                            />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>
                <div className={"title1"}>
                    <h4 className={"h4"}>
                        <span>Already have a</span>
                        <Link to={`/login`} className={"link"}>Buyonida account</Link>
                    </h4>
                    <h4>
                        <span>By proceeding, you agree to the</span>
                        <Link to={'/terms'} className={"link"}>Terms and Conditions</Link>
                        <span>and</span>
                        <Link to={'/privacy'} className={"link"}> Privacy Policy</Link>
                    </h4>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default function WrappedAdminRegisterOptions() {
    return (
        <GoogleOAuthProvider clientId="563103512847-4s3ft6rout2th0qgkt8p45r269sq0qqs.apps.googleusercontent.com">
            <AdminRegisterOptions />
        </GoogleOAuthProvider>
    );
}