import './index.scss'
import image1 from "/src/assets/mohtesem.jpg"
import {PRODUCT_LOGO} from "../../../../constants.js";
import {useNavigate} from "react-router-dom";

function MarketCard({number, product}) {

    const navigate = useNavigate();

    return (
        <div className={`col-${number}-60`} onClick={() => {
            navigate(`product/${product?.id}`)
        }}>
            <section id={"marketCard"}>
                <div className={"img"}>
                    <img src={PRODUCT_LOGO + product?.imageNames[0]} alt={"Image"}/>
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