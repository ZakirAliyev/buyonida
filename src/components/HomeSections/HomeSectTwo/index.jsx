import './index.scss'
import {Col, Row} from "antd";
import {Link} from "react-router-dom";

function HomeSectTwo() {

    const arr = new Array(12).fill(0);

    return (
        <section id={"homeSectTwo"}>
            <div className={"container"}>
                <Row className={"row"} gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col0"}>
                        <h3>E-commerce</h3>
                        <h3>platform for</h3>
                        <h3 className={"success"}>successful brands</h3>
                        <h4>Sell your products all around the world without paying any extra fees. Join our community of
                            over 7000 users in Europe</h4>
                        <Link to={'/public'} className={"link"}>Get Started</Link>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col"}>
                        <Row className={"row"}>
                            {arr.map((item, index) => (
                                <Col key={index} xs={8} sm={8} md={8} lg={8} xl={8} className={"col1"}>
                                    <img src={'https://download.logo.wine/logo/Apple_Inc./Apple_Inc.-Logo.wine.png'}
                                         alt={"Logo"}/>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default HomeSectTwo;
