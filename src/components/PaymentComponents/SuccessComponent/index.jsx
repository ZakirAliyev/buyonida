import './index.scss'
import image1 from "/src/assets/suc.png"
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

function SuccessComponent() {

    const navigate = useNavigate();

    return (
        <section id="successComponent">
            <Helmet>
                <title>{'Success!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <img src={image1} alt={"Image"}/>
            <h4>Payment successful!</h4>
            <p>Thank you for your purchase. We'll start preparing your order right away!</p>
            <button onClick={() => navigate('/')}>Continue shopping</button>
        </section>
    );
}

export default SuccessComponent;