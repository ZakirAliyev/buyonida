import './index.scss'
import image1 from "../../../assets/sariLogo.png";
import {Link} from "react-router-dom";
import {PulseLoader} from "react-spinners";
import {useFormik} from "formik";
import {useState} from "react";

function AdminForgotPass() {

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleClick() {

    }


    return (
        <section id={"adminForgotPass"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"}/>
                </div>
                <div className={"title"}>
                    <h2>Forgot password</h2>
                    <h3>First enter your E-mail address</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label>E-mail</label>
                    <input
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
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

export default AdminForgotPass;