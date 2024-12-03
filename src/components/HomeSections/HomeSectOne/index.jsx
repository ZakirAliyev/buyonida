import './index.scss'
import {Col, Row} from "antd";
import {Link} from "react-router-dom";

function HomeSectOne() {
    return (
        <section id={"homeSectOne"}>
            <div className={"container"}>
                <h2>One platform</h2>
                <h2>infinite possibilities</h2>
                <Row className={"row"} gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr/>
                        <h3>Build a website</h3>
                        <h4>Design with a full suite of intuitive tools and powerful AI to create the iste you want</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr/>
                        <h3>Build a website</h3>
                        <h4>Design with a full suite of intuitive tools and powerful AI to create the iste you want</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr/>
                        <h3>Build a website</h3>
                        <h4>Design with a full suite of intuitive tools and powerful AI to create the iste you want</h4>
                    </Col>
                </Row>
                <Link to={'/public'} className={"link"}>Get Started</Link>
            </div>
        </section>
    )
}

export default HomeSectOne;
