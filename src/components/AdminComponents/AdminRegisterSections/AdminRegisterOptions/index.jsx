import './index.scss'
import {Link, useNavigate} from "react-router-dom";

function AdminRegisterOptions() {

    const navigate = useNavigate();

    function handleClick(str) {
        if (str === "email") {
            navigate('/reg-via-email')
        }
    }

    return (
        <section id={"adminRegisterOptions"}>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={"/src/assets/sariLogo.png"} alt={"Logo"}/>
                </div>
                <div className={"title"}>
                    <h2>Create Buyonida account</h2>
                    <h3>One last step before starting to sell</h3>
                </div>
                <div className={"options"}>
                    <div className={"option"} onClick={() => handleClick("email")}>
                        <img
                            src={"https://static.vecteezy.com/system/resources/thumbnails/018/886/508/small_2x/email-line-icon-png.png"}
                            alt={"Image"}/>
                        <span>Sign up with email</span>
                    </div>
                    <div className={"option"} onClick={() => handleClick("apple")}>
                        <img
                            src={"https://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png"}
                            alt={"Image"}/>
                        <span>Sign up with Apple</span>
                    </div>
                    <div className={"option"} onClick={() => handleClick("facebook")}>
                        <img src={"https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"}
                             alt={"Image"}/>
                        <span>Sign up with Facebook</span>
                    </div>
                    <div className={"option"} onClick={() => handleClick("google")}>
                        <img src={"https://pngimg.com/d/google_PNG19635.png"} alt={"Image"}/>
                        <span>Sign up with Google</span>
                    </div>
                </div>
                <div className={"title1"}>
                    <h4 className={"h4"}>
                        <span>Already have a</span>
                        <Link to={`/login`} className={"link"}>Buyonida account</Link>
                    </h4>
                    <h4>
                        <span>By proceeding, you agree to the</span>
                        <Link to={'/public'} className={"link"}>Terms and Conditions</Link>
                        <span>and</span>
                        <Link to={'/public'} className={"link"}> Privacy Policy</Link>
                    </h4>
                </div>
            </div>
        </section>
    );
}

export default AdminRegisterOptions;