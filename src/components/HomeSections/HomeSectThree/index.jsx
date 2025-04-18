import './index.scss';
import {Col, Row} from 'antd';
import {Link} from "react-router-dom";

function HomeSectThree() {
    return (
        <section id="homeSectThree">
            <div className="container">
                <Row className="row" gutter={[16, 16]}>
                    <Col className="col" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <h2>Your Own Store</h2>
                        <h3>You can create your own store and start</h3>
                        <h4>selling immediately!</h4>
                        <div className="img">
                            <img src="https://images3.alphacoders.com/135/1350069.jpeg" alt="Image"/>
                        </div>
                    </Col>
                    <Col className="col col1" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className="title">
                            <h5>No monthly fee / No sign up fee</h5>
                            <h6>Sign up to Buyonida for free and start using your store in minutes
                                without paying any monthly fees.</h6>
                        </div>
                        <div className="title">
                            <h5>Customize your store</h5>
                            <h6>Customize your store with your logo, store banners and announcements
                                about your business or brand.</h6>
                        </div>
                        <div className="title">
                            <h5>List your items</h5>
                            <h6>Start listing items and creating content on your store</h6>
                        </div>
                        <div className="title">
                            <h5>You are ready to sell</h5>
                            <h6>You are ready to sell now! Your customers can visit your store on their
                                computers or mobile devices and you are ready to getting orders.</h6>
                        </div>
                    </Col>
                </Row>
                <div className={"linkDiv"}>
                    <Link to={'/register'} className={"link"}>Get Started</Link>
                </div>
            </div>
        </section>
    );
}

export default HomeSectThree;
