import './index.scss'
import {Link} from "react-router-dom";
import HomeNavbarDrawer from "../HomeNavbarDrawer/index.jsx";
import image1 from "/src/assets/sariLogo.png"

function HomeNavbar() {
    return (
        <section id={"homeNavbar"}>
            <img src={image1} alt={"Logo"}/>
            <HomeNavbarDrawer/>
            <ul>
                <Link to={'/public'} className={"link"}>
                    Solutions
                </Link>
                <Link to={'/public'} className={"link"}>
                    Pricing
                </Link>
                <Link to={`/login`} className={"link logInBtn"}>
                    Log in
                </Link>
                <Link to={`/register`} className={"link signUpBtn"}>Sign up</Link>
            </ul>
        </section>
    );
}

export default HomeNavbar;