import './index.scss'
import {BASE_URL, PRODUCT_LOGO} from "../../../../constants.js";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

function MarketCard({number, product,palet,marketName}) {
    const newNumber = 60/number
    const navigate = useNavigate();
    return (
        <div className={`col-${newNumber}-60 col-md-30-60 col-sm-30-60 col-xs-30-60`} style={{padding:"8px"}} onClick={() => {
            navigate(`/@${marketName}/product/${product?.id}`)
        }}>
            <section id={"marketCard2"} style={{backgroundColor:palet ? (`${palet[0]?.cardBgColor}`) : ("#ffffff"),color:palet ? (`${palet[0]?.cardTextColor}`) : ("#000000")}}>
                   <div className={"img"}>
                       <img src={product?.imageNames.includes('https://images.unsplash.com') ? (product?.imageNames) : (PRODUCT_LOGO + product?.imageNames[0])} alt={"Image"}/>
                   </div>
                <div className={"textWrapper"}>
                <h2>{product?.title}</h2>
                    <h3>{product?.price} AZN</h3>
                </div>
            </section>
        </div>
    );
}

export default MarketCard;