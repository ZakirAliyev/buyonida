import './index.scss'
import {Col, Row} from "antd";
import {IoCheckmarkOutline} from "react-icons/io5";

function HomeSectFour() {
    return (
        <section id={"homeSectFour"}>
            <div className={"container"}>
                <Row className={"row"}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col col1"}>
                        <div className={"wrapper"}>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                </div>
                                <div className={"right"}>
                                    <h2>Sign up for free</h2>
                                    <h3>Sign up to Shopier for free and start using right away</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                </div>
                                <div className={"right"}>
                                    <h2>No monthly fees</h2>
                                    <h3>Sign up to Shopier for free and start using right away</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                </div>
                                <div className={"right"}>
                                    <h2>No listing fees</h2>
                                    <h3>Sign up to Shopier for free and start using right away</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                </div>
                                <div className={"right"}>
                                    <h2>No hidden fees</h2>
                                    <h3>Sign up to Shopier for free and start using right away</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"wrapper1"}>
                            <Row className={"row1"}>
                                <Col>
                                    <span>Domestic</span>
                                    <div className={"price"}>
                                        <h4>4.99%</h4>
                                        <h5>+ 0.49 AZN</h5>
                                    </div>
                                    <h6>as low as, per transaction</h6>
                                </Col>
                                <Col>
                                    <span>International</span>
                                    <div className={"price"}>
                                        <h4>4.99%</h4>
                                        <h5>+ 0.49 AZN</h5>
                                    </div>
                                    <h6>as low as, per transaction</h6>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col2"}>
                        <div className={"title1"}>
                            <h3>Personal or business accounts</h3>
                            <h4>Either sell as personal or as a business, it is so easy and free to open an account at
                                Buyonida and start selling your items </h4>
                        </div>
                        <div className={"title1"}>
                            <h3>Personal or business accounts</h3>
                            <h4>Either sell as personal or as a business, it is so easy and free to open an account at
                                Buyonida and start selling your items </h4>
                        </div>
                        <div className={"title1"}>
                            <h3>Personal or business accounts</h3>
                            <h4>Either sell as personal or as a business, it is so easy and free to open an account at
                                Buyonida and start selling your items </h4>
                        </div>
                        <div className={"title1"}>
                            <h3>Personal or business accounts</h3>
                            <h4>Either sell as personal or as a business, it is so easy and free to open an account at
                                Buyonida and start selling your items </h4>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default HomeSectFour;