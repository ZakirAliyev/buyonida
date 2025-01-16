import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import {IoChevronForward} from 'react-icons/io5';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";

function AdminLoginVerificationForm() {
    // eslint-disable-next-line no-unused-vars
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = [];

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        let newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputsRef[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Kod: ' + otp.join(''));
    };

    return (
        <section id="adminLoginVerificationForm">
            <div className="wrapper">
                <div className="img">
                    <img
                        src="/src/assets/sariLogo.png"
                        alt="Logo"
                    />
                </div>
                <div className="title">
                    <h2>Mail adresini təstiqlə</h2>
                    <h3>************yev@gmail.com adresinə göndərilən kodu daxil et və hesabına daxil ol</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="boxWrapper">
                        {otp.map((value, index) => (
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
                    <div style={{
                        textAlign: "center",
                        margin: '15px 0 100px 0',
                        color: '#0866FF'
                    }}>Kodu yenidən göndər: <span style={{color: 'black'}}>00:45</span></div>
                    <button>Kodu təstiqlə</button>
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

export default AdminLoginVerificationForm;
