import { useTranslation } from "react-i18next";
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import image1 from "/src/assets/sariLogo.png";
import { usePostConfirmLoginOwnerMutation, usePostCreateNewConfirmEmailCodeOwnerMutation } from "../../../../service/userApi.js";
import Countdown from "react-countdown";
import Cookies from "js-cookie";
function AdminLoginVerificationForm() {
  const {
    t
  } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp1, setOtp1] = useState(['', '', '', '']);
  const [countdownKey, setCountdownKey] = useState(0);
  const inputsRef = [];
  const countdownDuration = 5000;
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp1];
    newOtp[index] = value.slice(-1);
    setOtp1(newOtp);
    if (value && index < otp1.length - 1) {
      inputsRef[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp1[index] && index > 0) {
      inputsRef[index - 1].focus();
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
  };
  const [postConfirmLoginOwner] = usePostConfirmLoginOwnerMutation();
  const [postCreateNewConfirmEmailCodeOwner] = usePostCreateNewConfirmEmailCodeOwnerMutation();
  const navigate = useNavigate();
  const Completionist = () => <span onClick={() => {
    const email = localStorage.getItem('email');
    postCreateNewConfirmEmailCodeOwner(email).unwrap();
    setCountdownKey(prevKey => prevKey + 1);
  }} style={{
    color: '#0866FF',
    cursor: 'pointer'
  }}>{t("kod_yenid_n_g_nd_r")}</span>;
  const renderer = ({
    minutes,
    seconds,
    completed
  }) => {
    if (completed) {
      return <Completionist />;
    }
    return <span style={{
      color: 'gray'
    }}>{t("kodu_yenid_n_g_nd_r")}<span style={{
        color: 'black',
        marginLeft: '10px'
      }}>{t("0")}{minutes}{t("")}{seconds}
                </span>
            </span>;
  };
  return <section id="adminLoginVerificationForm">
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo" />
                </div>
                <div className="title">
                    <h2>{t("mail_adresini_t_stiql")}</h2>
                    <h3>{t("mail_adresin_g_nd_ril_n_kodu_daxil_et_v_hesab_n_t_stiql")}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="boxWrapper">
                        {otp1.map((value, index) => <div className="box" key={index}>
                                <input ref={el => inputsRef[index] = el} type="text" maxLength="1" value={value} onChange={e => handleChange(index, e.target.value)} onKeyDown={e => handleKeyDown(index, e)} style={{
              textAlign: 'center'
            }} />
                            </div>)}
                    </div>
                    <div style={{
          textAlign: "center",
          margin: '15px 0',
          color: '#0866FF'
        }}>
                        <Countdown key={countdownKey} date={Date.now() + countdownDuration} renderer={renderer} />
                    </div>
                    <button onClick={async () => {
          const email = localStorage.getItem('loginEmail');
          let code = 0;
          code += otp1[0] * 1000;
          code += otp1[1] * 100;
          code += otp1[2] * 10;
          code += otp1[3] * 1;
          setIsSubmitting(true);
          try {
            const response = await postConfirmLoginOwner({
              email,
              code
            }).unwrap();
            if (response?.statusCode === 200) {
              toast.success(`Təstiqləmə uğurlu oldu`, {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
              });
              Cookies.set('buyonidaToken', response?.data?.token, {
                expires: 1
              });
              navigate('/choose-market');
            }
          } catch (error) {
            toast.error(`Error`, {
              position: 'bottom-right',
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark'
            });
          }
          setIsSubmitting(false);
        }}>{t("kodu_t_stiql")}</button>
                </form>
                <div className="title1">
                    <h4 className="h4">
                        <span>{t("hesab_n_var")}</span>
                        <Link to="/login" className="link">{t("daxil_ol")}</Link>
                        <IoChevronForward style={{
            color: '#0866FF'
          }} />
                    </h4>
                </div>
                <div className="links">
                    <Link to={'/help'} className={"link"}>{t("help")}</Link>
                    <Link to={'/privacy'} className={"link"}>{t("privacy")}</Link>
                    <Link to={'/terms'} className={"link"}>{t("terms")}</Link>
                </div>
            </div>
            <ToastContainer />
        </section>;
}
export default AdminLoginVerificationForm;