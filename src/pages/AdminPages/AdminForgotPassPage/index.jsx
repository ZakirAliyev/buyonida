import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "../../../assets/sariLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import { useState } from "react";
import { usePostForgotPasswordMutation } from "../../../service/userApi.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
function AdminForgotPass() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postForgotPassword] = usePostForgotPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async values => {
      setIsSubmitting(true);
      try {
        const response = await postForgotPassword({
          email: values.email
        }).unwrap();
        if (response?.statusCode === 200) {
          toast.success("Reset link sent to your email!", {
            position: "bottom-right",
            autoClose: 2500,
            theme: "dark",
            onClose: () => navigate('/re-enter-pass', {
              state: {
                email: values.email
              }
            })
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to send reset link. Please try again.", {
          position: "bottom-right",
          autoClose: 2500,
          theme: "dark"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  return <section id="adminForgotPass">
            <Helmet>
                <title>{'Forgot Password Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo" />
                </div>
                <div className="title">
                    <h2>{t("forgot_password")}</h2>
                    <h3>{t("please_enter_your_email_address")}</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">{t("e_mail")}</label>
                    <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <PulseLoader color="white" size={8} loading={isSubmitting} /> : <span>{t("get_reset_link")}</span>}
                    </button>
                </form>
                <div className="links">
                    <Link to={'/help'} className={"link"}>{t("help")}</Link>
                    <Link to={'/privacy'} className={"link"}>{t("privacy")}</Link>
                    <Link to={'/terms'} className={"link"}>{t("terms")}</Link>
                </div>
            </div>
            <ToastContainer />
        </section>;
}
export default AdminForgotPass;