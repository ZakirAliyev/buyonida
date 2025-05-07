import { useTranslation } from "react-i18next";
import './index.scss';
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
function HomeSectOne() {
  const {
    t
  } = useTranslation();
  return <section id={"homeSectOne"}>
            <div className={"container"}>
                <h2>{t("one_platform")}</h2>
                <h2>{t("infinite_possibilities")}</h2>
                <Row className={"row"} gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr />
                        <h3>{t("build_your_market")}</h3>
                        <h4>{t("tools_and_extensive_capabilities_to_create_a_complete_market_design")}</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr />
                        <h3>{t("upload_your_products")}</h3>
                        <h4>{t("you_can_upload_your_products_from_any_category_or_collection")}</h4>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={"col"}>
                        <hr />
                        <h3>{t("sales_analysis")}</h3>
                        <h4>{t("analytics_track_sales_volume_total_revenue_and_customer_interactions_with_products_whether_they_re_added_to_carts_attempted_for_purchase_or_ultimately_purchased")}</h4>
                    </Col>
                </Row>
                <Link to={'/register'} className={"link"}>{t("get_started")}</Link>
            </div>
        </section>;
}
export default HomeSectOne;