import './index.scss'
import {HiOutlineArrowLongRight} from "react-icons/hi2";

function MarketTitle({title}) {
    return (
        <div className={"container"}>
            <section id={"marketTitle"}>
                <h2>{title}</h2>
                <button>Find out more
                    <HiOutlineArrowLongRight/>
                </button>
            </section>
        </div>
    );
}

export default MarketTitle;