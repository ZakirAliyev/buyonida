import './index.scss'
import {FaRegBell, FaUser} from "react-icons/fa";

function AdminNavbar() {
    return (
        <section id={"adminNavbar"}>
            <div className={"imageWrapper"}>
                <img
                    src={"/src/assets/sariLogo.png"}
                    alt={"Image"} className={"first"}/>
            </div>
            <div className={"inputWrapper"}>
                <input placeholder={"Search"}/>
            </div>
            <div className={"wrapper"}>
                <FaRegBell className={"icon"}/>
                <div className={"profilePhoto"}><FaUser className={"icon"}/></div>
                <p>Elvar Aghamaliyev</p>
            </div>
        </section>
    );
}

export default AdminNavbar;