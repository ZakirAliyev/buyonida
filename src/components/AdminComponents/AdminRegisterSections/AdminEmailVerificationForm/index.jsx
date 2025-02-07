import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import {IoChevronForward} from 'react-icons/io5';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import image1 from "/src/assets/sariLogo.png"
import {
    usePostConfirmEmailOwnerMutation,
    usePostCreateNewConfirmEmailCodeOwnerMutation
} from "../../../../service/userApi.js";
import Countdown from "react-countdown";

function AdminEmailVerificationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp1, setOtp1] = useState(['', '', '', '']);
    const [countdownKey, setCountdownKey] = useState(0); // Key to reset Countdown
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [postConfirmEmailOwner] = usePostConfirmEmailOwnerMutation();
    const [postCreateNewConfirmEmailCodeOwner] = usePostCreateNewConfirmEmailCodeOwnerMutation();
    const navigate = useNavigate();

    const Completionist = () => (
        <span
            onClick={() => {
                const email = localStorage.getItem('email');
                postCreateNewConfirmEmailCodeOwner(email).unwrap();
                setCountdownKey(prevKey => prevKey + 1); // Reset countdown
            }}
            style={{color: '#0866FF', cursor: 'pointer'}}
        >
            Kod yenidən göndər!
        </span>
    );

    const renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            return <Completionist/>;
        }
        return (
            <span style={{
                color: 'gray'
            }}>
                Kodu yenidən göndər:
                <span style={{color: 'black', marginLeft: '10px'}}>
                    0{minutes}:{seconds}
                </span>
            </span>
        );
    };

    return (
        <section id="adminEmailVerificationForm">
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo"/>
                </div>
                <div className="title">
                    <h2>Mail adresini təstiqlə</h2>
                    <h3>{localStorage.getItem('email')} adresinə göndərilən kodu daxil et və hesabını təstiqlə</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="boxWrapper">
                        {otp1.map((value, index) => (
                            <div className="box" key={index}>
                                <input
                                    ref={(el) => inputsRef[index] = el}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    style={{textAlign: 'center'}}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            margin: '15px 0 100px 0',
                            color: '#0866FF'
                        }}
                    >
                        <Countdown
                            key={countdownKey} // Reset Countdown with key
                            date={Date.now() + countdownDuration}
                            renderer={renderer}
                        />
                    </div>
                    <button
                        onClick={async () => {
                            const email = localStorage.getItem('email');
                            let code = 0;
                            code += otp1[0] * 1000;
                            code += otp1[1] * 100;
                            code += otp1[2] * 10;
                            code += otp1[3] * 1;
                            setIsSubmitting(true);
                            try {
                                const response = await postConfirmEmailOwner({email, code}).unwrap();
                                if (response?.statusCode === 200) {
                                    toast.success(`Təstiqləmə uğurlu oldu`, {
                                        position: 'bottom-right',
                                        autoClose: 2500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: 'dark',
                                    });
                                    navigate('/login');
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
                                    theme: 'dark',
                                });
                            }
                            setIsSubmitting(false);
                        }}
                    >
                        Kodu təstiqlə
                    </button>
                </form>
                <div className="title1">
                    <h4 className="h4">
                        <span>Hesabın var?</span>
                        <Link to="/login" className="link">
                            Daxil ol
                        </Link>
                        <IoChevronForward
                            style={{
                                color: '#0866FF',
                            }}
                        />
                    </h4>
                </div>
                <div className="links">
                    <Link to="/public" className="link">Help</Link>
                    <Link to="/public" className="link">Privacy</Link>
                    <Link to="/public" className="link">Terms</Link>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}

export default AdminEmailVerificationForm;
