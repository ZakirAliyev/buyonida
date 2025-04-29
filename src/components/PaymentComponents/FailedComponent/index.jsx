import './index.scss'
import image1 from "/src/assets/failed.png"
import {useNavigate} from "react-router-dom";

function FailedComponent() {

    const navigate = useNavigate();

    return (
        <section id="failedComponent">
            <img src={image1} alt={"Image"}/>
            <h4>Payment Failed</h4>
            <p>Something went wrong. Please try again or use a different payment method</p>
            <button onClick={()=>navigate('/')}>Try again</button>
        </section>
    );
}

export default FailedComponent;