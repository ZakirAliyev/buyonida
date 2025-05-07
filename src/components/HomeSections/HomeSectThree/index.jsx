import { useTranslation } from "react-i18next";
import './index.scss';
import { Col, Row } from 'antd';
import { Link } from "react-router-dom";
import image from "/src/assets/Image2.png";
function HomeSectThree() {
  const {
    t
  } = useTranslation();
  return <section id="homeSectThree">
            <div className="container">
                <Row className="row" gutter={[16, 16]}>
                    <Col className="col" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <h2>{t("your_own_store")}</h2>
                        <h3>{t("you_can_create_your_own_store_and_start")}</h3>
                        <h4>{t("selling_immediately")}</h4>
                        <div className="img">
                            <img src={image} alt="Image" />
                        </div>
                    </Col>
                    <Col className="col col1" xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className="title">
                            <h5>{t("no_monthly_fee_no_sign_up_fee")}</h5>
                            <h6>{t("sign_up_to_buyonida_for_free_and_start_using_your_store_in_minutes_without_paying_any_monthly_fees")}</h6>
                        </div>
                        <div className="title">
                            <h5>{t("customize_your_store")}</h5>
                            <h6>{t("customize_your_store_with_your_logo_store_banners_and_announcements_about_your_business_or_brand")}</h6>
                        </div>
                        <div className="title">
                            <h5>{t("list_your_items")}</h5>
                            <h6>{t("start_listing_items_and_creating_content_on_your_store")}</h6>
                        </div>
                        <div className="title">
                            <h5>{t("you_are_ready_to_sell")}</h5>
                            <h6>{t("you_are_ready_to_sell_now_your_customers_can_visit_your_store_on_their_computers_or_mobile_devices_and_you_are_ready_to_getting_orders")}</h6>
                        </div>
                    </Col>
                </Row>
                <div className={"linkDiv"}>
                    <Link to={'/register'} className={"link"}>{t("get_started")}</Link>
                </div>
            </div>
        </section>;
}
export default HomeSectThree;