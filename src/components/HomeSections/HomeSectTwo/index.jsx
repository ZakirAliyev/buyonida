import { useTranslation } from "react-i18next";
import './index.scss';
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
function HomeSectTwo() {
  const {
    t
  } = useTranslation();
  const arr = new Array(12).fill(0);
  return <section id={"homeSectTwo"}>
            <div className={"container"}>
                <Row className={"row"} gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col0"}>
                        <h3>{t("e_commerce")}</h3>
                        <h3>{t("platform_for")}</h3>
                        <h3 className={"success"}>{t("successful_brands")}</h3>
                        <h4>{t("sell_your_products_all_around_the_world_without_paying_any_extra_fees_join_our_community_of_over_7000_users_in_europe")}</h4>
                        <Link to={'/register'} className={"link"}>{t("get_started")}</Link>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col"}>
                        <Row className={"row"}>
                            {arr.map((item, index) => <Col key={index} xs={8} sm={8} md={8} lg={8} xl={8} className={"col1"}>
                                    <img src={'https://download.logo.wine/logo/Apple_Inc./Apple_Inc.-Logo.wine.png'} alt={"Logo"} />
                                </Col>)}
                        </Row>
                    </Col>
                </Row>
            </div>
        </section>;
}
export default HomeSectTwo;