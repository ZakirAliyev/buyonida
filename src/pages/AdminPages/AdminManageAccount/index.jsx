import './index.scss'
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import {LuCircleUserRound} from "react-icons/lu";
import {CiLock} from "react-icons/ci";

function AdminManageAccount() {
    return (
        <>
            <AdminNavbar/>
            <section id={"adminManageAccount"}>
                <div className={"container"}>
                    <div className={"wrapper"}>
                        <div className={"row"}>
                            <div className={"nav-item nav-item-1 col-6"}>
                                <LuCircleUserRound className={"icon"}/>
                                General
                            </div>
                            <div className={"nav-item nav-item-2 col-6"}>
                                <CiLock className={"icon"}/>Security
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminManageAccount;