import './index.scss'
import image1 from "/src/assets/sariLogo.png"
import {useNavigate} from "react-router-dom";

function HomeFooter() {

    const navigate = useNavigate();

    return (
        <section id={'homeFooter'}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-12"}>
                        <img style={{
                            width: "200px",
                        }} src={image1} alt={"Logo"}/>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-12"}>
                        <h3>Product</h3>
                        <h4>About Us</h4>
                        <h4>Contact</h4>
                        <h4>Blogs</h4>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>
                        <h3>Featured Posts</h3>
                        <h4>What is E-commerce?</h4>
                        <h4>Trending Products to Sell Online</h4>
                        <h4>Business Ideas</h4>
                    </div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>
                        <h3>Product</h3>
                        <h4>Features</h4>
                        <h4>E-commerce Plans</h4>
                        <h4>Testimonials</h4>
                    </div>
                </div>
                <div className={"row"} style={{
                    color: 'white',
                    margin: '10px 0 30px',
                }}>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={()=> {
                        navigate('/privacy')
                    }}>Privacy Policy</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={()=> {
                        navigate('/terms')
                    }}>Terms of Services</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={()=> {
                        navigate('/')
                    }}>Human Resources Policy</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"} onClick={()=> {
                        navigate('/')
                    }}>Environmental and Social Policy</div>
                </div>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginTop: '10px',
                }}>2024-2025 Buyonida inc. All rights reserved.
                </div>
            </div>
        </section>
    )
}

export default HomeFooter;