import './index.scss'
import {HiOutlineArrowLongRight} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";

function MarketTitle({title, categories, collections,palet}) {
    const navigate = useNavigate();
    return (
        <div className={"container"}>
            <section id={"marketTitle"}>
                <h2>{title}</h2>
                <button onClick={() => {
                    if (categories?.id) {
                        navigate(`category/${categories?.id}`)
                    } else if (collections?.id) {
                        navigate(`collection/${collections?.id}`)
                    }
                }}
                        style={{backgroundColor:palet ? (`${palet[0]?.buttonBgColor}`) : ("#ffffff"),color:palet ? (`${palet[0]?.buttonTextColor}`) : ("#000000"),borderColor:palet ? (`${palet[0]?.buttonBorderColor}`) : ("#000000")}}>See All
                    <HiOutlineArrowLongRight style={{marginLeft:"10px"}}/>
                </button>
            </section>
        </div>
    );
}

export default MarketTitle;