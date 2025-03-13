import './index.scss'
import {HiOutlineArrowLongRight} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";

function CSMarketTitle({title, category, collection}) {

    const navigate = useNavigate();

    return (
        <div className={"container"}>
            <section id={"cSMarketTitle"}>
                <h2>{title}</h2>
                <button onClick={() => {
                }}>Find out more
                    <HiOutlineArrowLongRight/>
                </button>
            </section>
        </div>
    );
}

export default CSMarketTitle;