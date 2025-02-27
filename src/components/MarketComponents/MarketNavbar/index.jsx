import './index.scss'
import image1 from "/src/assets/sariLogo.png"
import {Link} from "react-router-dom";
import {FaShoppingBag} from "react-icons/fa";

function MarketNavbar() {
    return (
        <section id={"marketNavbar"}>
            <div className={"container"}>
                <nav>
                    <div className={"logo"}>
                        <img src={image1} alt={"Image"}/>
                    </div>
                    <div className={"links"}>
                        <Link to={``} className={"link"}>CATEGORIES</Link>
                        <Link to={``} className={"link"}>COLLECTIONS</Link>
                        <Link to={``} className={"link"}>ABOUT US</Link>
                    </div>
                    <div className={"search"}>
                        <input placeholder={"Search"}/>
                        <FaShoppingBag className={"icon"}/>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default MarketNavbar;