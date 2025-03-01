import './index.scss'
import {HiOutlineArrowLongRight} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";

function MarketTitle({title, category, collection}) {

    const navigate = useNavigate();

    return (
        <div className={"container"}>
            <section id={"marketTitle"}>
                <h2>{title}</h2>
                <button onClick={() => {
                    if (category?.id) {
                        navigate(`category/${category?.id}`)
                    } else if (collection?.id) {
                        navigate(`collection/${collection?.id}`)
                    }
                }}>Find out more
                    <HiOutlineArrowLongRight/>
                </button>
            </section>
        </div>
    );
}

export default MarketTitle;