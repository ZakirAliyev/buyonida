import "./index.scss";
import { FiMonitor } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { HiOutlineHome } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import {Link, useNavigate} from "react-router-dom";
import {LuEarth} from "react-icons/lu";
import {BASE_URL} from "../../../../constants.js";
import {useGetStoreByIdQuery} from "../../../service/userApi.js";
import Cookies from "js-cookie";

function CustomizeStorePageNavbar() {
    const { data: getStoreById } = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
    const store = getStoreById?.data;
    const navigate = useNavigate();

    return (
        <section id={"customizeStorePageNavbar"}>
            <div className={"start"}>
                <div className={"exit"} onClick={() => navigate('/cp/home')}>
                    <RxExit className={"icon"} />
                    Exit
                </div>
                <div className={"line"}></div>
                <div className={"exit"}>
                    Theme <span>Premio</span>
                </div>
            </div>
            <div className={"middle"}>
                <HiOutlineHome className={"icon"} />
                <span>Default Home Page</span>
                <GoChevronDown className={"icon"} />
            </div>
            <div className={"end"}>
                <Link to={`${BASE_URL}@${store?.name}`}> <LuEarth /></Link>
                <FiMonitor />
            </div>
        </section>
    );
}

export default CustomizeStorePageNavbar;