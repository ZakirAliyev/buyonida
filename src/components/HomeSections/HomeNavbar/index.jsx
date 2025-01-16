import './index.scss'
import {Link} from "react-router-dom";
import HomeNavbarDrawer from "../HomeNavbarDrawer/index.jsx";

function HomeNavbar() {
    return (
        <section id={"homeNavbar"}>
            <img src={"/src/assets/sariLogo.png"} alt={"Logo"}/>
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