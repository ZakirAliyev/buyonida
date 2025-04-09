import './index.scss'
import {Link} from "react-router-dom";
import {BsFillCursorFill} from "react-icons/bs";
import kilit from "/src/assets/kilit.png"
import analytics from "/src/assets/analytics.png"

function HomeBanner() {
    return (
        <section id={"homeBanner"}>
            <div className={"container"}>
                <div className={"kilit"}>
                    <img src={kilit} alt={"Kilit"}/>
                </div>
                <div className={"analytics"}>
                    <img src={analytics} alt={"Analytics"}/>
                </div>
                <div className={"animationWrapper"}>
                    <div className={"animation animation1"}>
                    <span>
                        Customize your store 🤩
                        <BsFillCursorFill className={"icon"}/>
                    </span>
                    </div>
                    <div className={"animation animation2"}>
                    <span>
                        List your items
                        <BsFillCursorFill className={"icon"}/>
                    </span>
                    </div>
                </div>
                <h2>Create a website without limits</h2>
                <div className={"h4"}>
                    <h4>Build and scale with confidence. From a powerful website builder to advanced business solutions
                        – we've
                        got you covered.</h4>
                </div>
                <div className={"linkWrapper"}>
                    <Link to={'/public'} className={"link"}>
                        Get Started
                    </Link>
                </div>
                <h6>Get Started. Start for free. No credit card required.</h6>
                <div className={"animationWrapper animationWrapper1"}>
                    <div className={"animation animation2 d-none"}>
                    <span>
                        List your items
                        <BsFillCursorFill className={"icon"}/>
                    </span>
                    </div>
                    <div className={"animation animation3"}>
                    <span>
                        Your own ssdftore 😎
                        <BsFillCursorFill className={"icon"}/>
                    </span>
                    </div>
                </div>
                <img className={"img"} src={"https://wallpapers.com/images/hd/e-commerce-pictures-ieb3cw7wuo7qbyez.jpg"} alt={"Theme"}/>
            </div>
        </section>
    );
}

export default HomeBanner;