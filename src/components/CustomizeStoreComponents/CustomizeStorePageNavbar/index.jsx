import "./index.scss";
import { FiMonitor } from "react-icons/fi";
import { RxExit } from "react-icons/rx";
import { HiOutlineHome } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import {useNavigate} from "react-router-dom";

function CustomizeStorePageNavbar() {

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
                <FiMonitor />
            </div>
        </section>
    );
}

export default CustomizeStorePageNavbar;