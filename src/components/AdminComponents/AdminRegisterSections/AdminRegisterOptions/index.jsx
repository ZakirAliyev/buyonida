import { useTranslation } from "react-i18next";
import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import image1 from "/src/assets/sariLogo.png";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { usePostGoogleLoginMutation } from "../../../../service/userApi.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import { useState } from "react";
function AdminRegisterOptions() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [postGoogleLogin] = usePostGoogleLoginMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleClick(str) {
    if (str === "email") {
      navigate('/reg-via-email');
    }
  }
  const handleGoogleSuccess = async credentialResponse => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error('Google ID token not found', {
        theme: 'dark'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await postGoogleLogin({
        idToken
      }).unwrap();
      Cookies.set('buyonidaToken', response?.data?.token, {
        expires: 1
      });
      toast.success(`${response?.message || 'Google registration successful'}`, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        onClose: () => navigate('/choose-market')
      });
    } catch (e) {
      toast.error(`${e?.data?.message || 'Google registration failed'}`, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      });
    }
    setIsSubmitting(false);
  };
  const handleGoogleError = () => {
    toast.error('Google registration failed', {
      theme: 'dark'
    });
  };
  return <section id={"adminRegisterOptions"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"} />
                </div>
                <div className={"title"}>
                    <h2>{t("create_buyonida_account")}</h2>
                    <h3>{t("one_last_step_before_starting_to_sell")}</h3>
                </div>
                <div className={"options"}>
                    <div className={"option"} onClick={() => handleClick("email")}>
                        <img src={"https://static.vecteezy.com/system/resources/thumbnails/018/886/508/small_2x/email-line-icon-png.png"} alt={"Email"} />
                        <span>{t("sign_up_with_email")}</span>
                    </div>
                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} width="100%" useOneTap />
                </div>
                <div className={"title1"}>
                    <h4 className={"h4"}>
                        <span>{t("already_have_a")}</span>
                        <Link to={`/login`} className={"link"}>{t("buyonida_account")}</Link>
                    </h4>
                    <h4>
                        <span>{t("by_proceeding_you_agree_to_the")}</span>
                        <Link to={'/terms'} className={"link"}>{t("terms_and_conditions")}</Link>
                        <span>{t("and")}</span>
                        <Link to={'/privacy'} className={"link"}>{t("privacy_policy")}</Link>
                    </h4>
                </div>
            </div>
            <ToastContainer />
        </section>;
}
export default function WrappedAdminRegisterOptions() {
  return <GoogleOAuthProvider clientId="563103512847-4s3ft6rout2th0qgkt8p45r269sq0qqs.apps.googleusercontent.com">
            <AdminRegisterOptions />
        </GoogleOAuthProvider>;
}