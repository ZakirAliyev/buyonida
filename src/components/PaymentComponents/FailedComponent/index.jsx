import './index.scss'
import image1 from "/src/assets/failed.png"
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

function FailedComponent() {

    const navigate = useNavigate();

    return (
        <section id="failedComponent">
            <Helmet>
                <title>{'Failed!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <img src={image1} alt={"Image"}/>
            <h4>Payment Failed</h4>
            <p>Something went wrong. Please try again or use a different payment method</p>
            <button onClick={()=>navigate('/')}>Try again</button>
        </section>
    );
}

export default FailedComponent;