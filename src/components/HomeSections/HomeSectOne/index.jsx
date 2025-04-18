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
                        <h3>Build your market</h3>
                        <h4>Tools and extensive capabilities to create a complete market design</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr/>
                        <h3>Upload your products</h3>
                        <h4>You can upload your products from any category or collection.</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr/>
                        <h3>Sales analysis</h3>
                        <h4>Analytics track sales volume, total revenue, and customer interactions with products—whether they’re added to carts, attempted for purchase, or ultimately purchased.</h4>
                    </Col>
                </Row>
                <Link to={'/register'} className={"link"}>Get Started</Link>
            </div>
        </section>
    )
}

export default HomeSectOne;
