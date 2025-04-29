import './index.scss'
import image1 from "/src/assets/suc.png"
import {useNavigate} from "react-router-dom";

function SuccessComponent() {

    const navigate = useNavigate();

    return (
        <section id="successComponent">
            <img src={image1} alt={"Image"}/>
            <h4>Payment successful!</h4>
            <p>Thank you for your purchase. We'll start preparing your order right away!</p>
            <button onClick={() => navigate('/')}>Continue shopping</button>
        </section>
    );
}

export default SuccessComponent;