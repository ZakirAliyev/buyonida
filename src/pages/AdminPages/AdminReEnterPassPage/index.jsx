import './index.scss'
import image1 from "../../../assets/sariLogo.png";
import {Link} from "react-router-dom";
import {PulseLoader} from "react-spinners";
import {useFormik} from "formik";
import {useState} from "react";
import Countdown from "react-countdown";
import 'react-toastify/dist/ReactToastify.css'

function AdminReEnterPassPage() {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleClick() {

    }

    const Completionist = () => (
        <span
            onClick={() => {
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
        <section id={"adminReEnterPassPage"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"}/>
                </div>
                <div className={"title"}>
                    <h2>Forgot password</h2>
                    <h3>First enter your E-mail address</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label>New password</label>
                    <input
                        name="newPassword"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <label>Re-enter new password</label>
                    <input
                        name="reEnterNewPassword"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
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
                            margin: '15px 0 20px 0',
                            color: '#0866FF'
                        }}
                    >
                        <Countdown
                            key={countdownKey} // Reset Countdown with key
                            date={Date.now() + countdownDuration}
                            renderer={renderer}
                        />
                    </div>
                    <button type="submit" onClick={() => handleClick()}>
                        {!isSubmitting && <span>Get reset link</span>}
                        <PulseLoader
                            color={'white'}
                            size={8}
                            loading={isSubmitting}
                        />
                    </button>
                </form>
                <div className={"links"}>
                    <Link to={'/public'} className={"link"}>Help</Link>
                    <Link to={'/public'} className={"link"}>Privacy</Link>
                    <Link to={'/public'} className={"link"}>Terms</Link>
                </div>
            </div>
        </section>
    );
}

export default AdminReEnterPassPage;