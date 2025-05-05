import './index.scss'
import image1 from "../../../assets/sariLogo.png";
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {Helmet} from "react-helmet-async";

function AdminSuccessPage() {
    return (
        <section id={"adminSuccessPage"}>
            <Helmet>
                <title>{'Success!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <div className={"wrapper"}>
                <div className={"img"}>
                    <img src={image1} alt={"Logo"}/>
                </div>
                <div className={"title"}>
                    <h2>Success!</h2>
                    <h3>Your password reseted succesfully.</h3>
                </div>
                <div className={"links"}>
                    <Link to={'/help'} className={"link"}>Help</Link>
                    <Link to={'/privacy'} className={"link"}>Privacy</Link>
                    <Link to={'/terms'} className={"link"}>Terms</Link>
                </div>
            </div>
        </section>
    );
}

export default AdminSuccessPage;