import './index.scss'
import {FaRegBell} from "react-icons/fa";

function AdminNavbar() {
    return (
        <section id={"adminNavbar"}>
            <div className={"imageWrapper"}>
                <img
                    src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/shopify-glyph-white-DZNyE9BvHIk-.svg"}
                    alt={"Image"} className={"first"}/>
                <img
                    src={"https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/shopify-wordmark-monochrome-CpVsfBAAmxEP.svg"}
                    alt={"Image"} style={{
                    marginTop: '3px'
                }}
                />
            </div>
            <div className={"inputWrapper"}>
                <input placeholder={"Search"}/>
            </div>
            <div className={"wrapper"}>
                <FaRegBell className={"icon"}/>
                <div className={"profilePhoto"}>MS</div>
                <p>My Store</p>
            </div>
        </section>
    );
}

export default AdminNavbar;