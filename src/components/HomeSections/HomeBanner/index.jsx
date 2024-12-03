import './index.scss'
import {Link} from "react-router-dom";

function HomeBanner() {
    return (
        <section id={"homeBanner"}>
            <h2>Create a website without limits</h2>
            <h4>Build and scale with confidence. From a powerful website builder to advanced business solutions – we've
                got you covered.</h4>
            <Link to={'/public'} className={"link"}>
                Get Started
            </Link>
            <h6>Get Started. Start for free. No credit card required.</h6>
            <div className={"img"}>
                <img src={"https://images3.alphacoders.com/135/1350069.jpeg"} alt={"Image Inside"}/>
            </div>
        </section>
    );
}

export default HomeBanner;