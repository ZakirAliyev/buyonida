import './index.scss';
import image1 from "../../../assets/sariLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useFormik } from "formik";
import { useState, useRef } from "react";
import Countdown from "react-countdown";
import { usePostResetPasswordMutation } from "../../../service/userApi.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet-async";

function AdminReEnterPassPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromPreviousPage = location.state?.email || '';

    const [postResetPassword] = usePostResetPasswordMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp1, setOtp1] = useState(['', '', '', '']);
    const [countdownKey, setCountdownKey] = useState(0); // Countdown'ı sıfırlamak için key
    const inputsRef = useRef([]);
    const countdownDuration = 5000;

    const formik = useFormik({
        initialValues: {
            email: emailFromPreviousPage,
            confirmNumber: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            setIsSubmitting(true);
            // OTP kodunu birleştirip confirmNumber alanını güncelliyoruz.
            values.confirmNumber = otp1.join('');
            try {
                const response = await postResetPassword({
                    email: values.email,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                    confirmNumber: values.confirmNumber,
                }).unwrap();
                if (response?.statusCode === 200) {
                    toast.success("Password reset successful!", {
                        position: "bottom-right",
                        autoClose: 2500,
                        theme: "dark",
                        onClose: () => navigate('/login')
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error("Failed to reset password. Please try again.", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark",
                });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp1];
        newOtp[index] = value.slice(-1);
        setOtp1(newOtp);

        // Eğer varsa sonraki inputa odaklan
        if (value && index < otp1.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp1[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Yeniden kod gönderme işlemini ve countdown'ı sıfırlamayı sağlayan fonksiyon
    const resendCode = () => {
        // Burada yeniden gönderme işlemi ekleyebilirsiniz (örneğin API çağrısı)
        setCountdownKey(prevKey => prevKey + 1);
    };

    // Countdown tamamlandığında gösterilecek bileşen
    const Completionist = () => (
        <span onClick={resendCode} style={{ color: '#0866FF', cursor: 'pointer' }}>
            Kod yenidən göndər!
        </span>
    );

    // Countdown render fonksiyonu
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        }
        return (
            <span style={{ color: 'gray' }}>
                Kodu yenidən göndər:
                <span style={{ color: 'black', marginLeft: '10px' }}>
                    0{minutes}:{seconds}
                </span>
            </span>
        );
    };

    // Formdaki alanlardan herhangi biri boşsa submit butonunu devre dışı bırak
    const isFormIncomplete =
        !formik.values.email ||
        !formik.values.newPassword ||
        !formik.values.confirmPassword ||
        otp1.some(digit => digit === '');

    return (
        <section id="adminReEnterPassPage">
            <Helmet>
                <title>{'Re-enter Password Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Reset Password</h2>
                    <h3>Please enter your email, new password, and the OTP code sent to your email.</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        readOnly
                    />
                    <label htmlFor="newPassword">New password</label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                    />
                    <label htmlFor="confirmPassword">Re-enter new password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    <div className="boxWrapper">
                        {otp1.map((value, index) => (
                            <div className="box" key={index}>
                                <input
                                    ref={el => inputsRef.current[index] = el}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={e => handleChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(index, e)}
                                    style={{ textAlign: 'center' }}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: "center", margin: '15px 0 20px 0', color: '#0866FF' }}>
                        <Countdown
                            key={countdownKey} // Countdown'ı sıfırlamak için key
                            date={Date.now() + countdownDuration}
                            renderer={renderer}
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting || isFormIncomplete}>
                        {isSubmitting ? (
                            <PulseLoader color="white" size={8} loading={isSubmitting} />
                        ) : (
                            <span>Reset Password</span>
                        )}
                    </button>
                </form>
                <div className="links">
                    <Link to={'/help'} className={"link"}>Help</Link>
                    <Link to={'/privacy'} className={"link"}>Privacy</Link>
                    <Link to={'/terms'} className={"link"}>Terms</Link>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default AdminReEnterPassPage;
