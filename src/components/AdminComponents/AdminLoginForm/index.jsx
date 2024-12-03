import './index.scss'
import {Link, useNavigate} from "react-router-dom";
import {IoChevronForwardOutline, IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {useFormik} from "formik";
import {usePostLoginMutation} from "../../../service/userApi.js";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {PulseLoader} from "react-spinners";
import {useState} from "react";
import * as Yup from "yup";
import Cookies from 'js-cookie'

function AdminLoginForm() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [postLogin] = usePostLoginMutation()
    const navigate = useNavigate();

    function handleClick() {
        formik.validateForm().then((errors) => {
            if (Object.keys(errors).length !== 0) {
                const errorMessages = {
                    userNameOrEmail: 'Username or email is',
                    password: 'Password is',
                };

                Object.entries(errors).forEach(([field, message]) => {
                    if (errorMessages[field]) {
                        toast.error(`${errorMessages[field]} ${message}`, {
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
                });
            }
        });
    }

    const SignupSchema = Yup.object().shape({
        userNameOrEmail: Yup.string().required('required!'),
        password: Yup.string()
            .min(8, 'too short!')
            .max(50, 'too long!')
            .required('required!'),
    });

    const formik = useFormik({
        initialValues: {
            userNameOrEmail: '',
            password: '',
        },
        onSubmit: async (values, {resetForm}) => {
            setIsSubmitting(true);
            const response = await postLogin(values);

            if (response?.error?.data?.statusCode === 400) {
                toast.error(`${response?.error?.data?.error}`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            } else if (response?.data?.token) {
                toast.success(`User login successfully!`, {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                Cookies.set('token', response?.data?.token, {expires: 7});
                resetForm();
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }

            setIsSubmitting(false);
        },
        validationSchema: SignupSchema
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section id={"adminLoginForm"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/6/60/Logo-logosu.png"} alt={"Logo"}/>
                </div>
                <div className={"title"}>
                    <h2>Log in</h2>
                    <h3>Continue to Buyonida</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label>Username or email</label>
                    <input
                        name="userNameOrEmail"
                        onChange={formik.handleChange}
                        value={formik.values.userNameOrEmail}
                    />
                    <label>Password</label>
                    <div style={{
                        position: 'relative',
                    }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            style={{
                                width: '100%'
                            }}
                        />
                        <div
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '18px',
                                margin: 0,
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? <IoEyeOffOutline style={{
                                fontSize: '20px'
                            }}/> : <IoEyeOutline style={{
                                fontSize: '20px'
                            }}/>}
                        </div>
                    </div>
                    <Link to={`/forgot-pass`} className={"forgotPass"}>
                        Forgot password?
                    </Link>
                    <button type="submit" onClick={() => handleClick()}>
                        {!isSubmitting && <span>Log in</span>}
                        <PulseLoader
                            color={'white'}
                            size={8}
                            loading={isSubmitting}
                        />
                    </button>
                </form>
                <div className={"orWrapper"}>
                    <div className={"line"}></div>
                    <div className={"or"}>or</div>
                    <div className={"line"}></div>
                </div>
                <div className={"options"}>
                    <div className={"option"}>
                        <img src={"https://download.logo.wine/logo/Apple_Inc./Apple_Inc.-Logo.wine.png"} alt={"Image"}/>
                    </div>
                    <div className={"option option1"}>
                        <img src={"https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"}
                             alt={"Image"}/>
                    </div>
                    <div className={"option"}>
                        <img src={"https://pngimg.com/d/google_PNG19635.png"} alt={"Image"}/>
                    </div>
                </div>
                <nav>
                    New to Buyonida
                    <Link to={`/register`} className={"link"}>Get Started</Link>
                    <IoChevronForwardOutline className={"link"}/>
                </nav>
                <div className={"links"}>
                    <Link to={'/public'} className={"link"}>Help</Link>
                    <Link to={'/public'} className={"link"}>Privacy</Link>
                    <Link to={'/public'} className={"link"}>Terms</Link>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}

export default AdminLoginForm;