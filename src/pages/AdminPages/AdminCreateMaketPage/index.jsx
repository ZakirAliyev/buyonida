import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import {IoChevronForward} from 'react-icons/io5';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import image1 from "/src/assets/sariLogo.png"
import image2 from "/src/assets/laundry.png"
import {
    usePostConfirmLoginOwnerMutation,
    usePostCreateNewConfirmEmailCodeOwnerMutation
} from "../../../service/userApi.js";

function AdminCreateMaketPage() {
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

    const [postConfirmLoginOwner] = usePostConfirmLoginOwnerMutation();
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

    const arr = new Array(12).fill(0);

    return (
        <section id="adminCreateMaketPage">
            <div className="wrapper">
                <div className="img">
                    <img src={image1} alt="Logo"/>
                </div>
                <div className="title">
                    <h2>Mağazan üçün ad seçək</h2>
                    <h3>Mağazan üçün bir ad seç, narahat olma
                        sonradan dəyişdirə biləcəksən</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={"marketWrapper"}>
                        <input placeholder={"Market name..."}/>
                        <div style={{
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "20px",
                            marginTop: '20px'
                        }}>Sahəni seç
                        </div>
                        <div className="aminake row">
                            {arr?.map((a, index) => (
                                <div key={index} className="qwe col-3">
                                    <div className="asdasd">
                                        <img src={image2} alt="Image"/>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: '-10px',
                                            backgroundColor: '#FFBB00',
                                            padding: '2px 10px',
                                            borderRadius: '5px',
                                            fontSize: '10px',
                                            width: 'max-content',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Geyim
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            const email = localStorage.getItem('loginEmail');
                            let code = 0;
                            code += otp1[0] * 1000;
                            code += otp1[1] * 100;
                            code += otp1[2] * 10;
                            code += otp1[3] * 1;
                            setIsSubmitting(true);
                            try {
                                const response = await postConfirmLoginOwner({email, code}).unwrap();
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
                                    theme: 'dark',
                                });
                            }
                            setIsSubmitting(false);
                        }}
                    >
                        İləri
                    </button>
                </form>
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

export default AdminCreateMaketPage;
