import { useTranslation } from "react-i18next";
import './index.scss';
import { Col, Row } from "antd";
import { IoCheckmarkOutline } from "react-icons/io5";
function HomeSectFour() {
  const {
    t
  } = useTranslation();
  return <section id={"homeSectFour"}>
            <div className={"container"}>
                <Row className={"row"}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col col1"}>
                        <div className={"wrapper"}>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"} />
                                </div>
                                <div className={"right"}>
                                    <h2>{t("sign_up_for_free")}</h2>
                                    <h3>{t("sign_up_to_buyonida_for_free_and_start_using_right_away")}</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"} />
                                </div>
                                <div className={"right"}>
                                    <h2>{t("no_monthly_fees")}</h2>
                                    <h3>{t("sign_up_to_buyonida_for_free_and_start_using_right_away")}</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"} />
                                </div>
                                <div className={"right"}>
                                    <h2>{t("no_listing_fees")}</h2>
                                    <h3>{t("there_are_no_listing_fees_required_when_listing_your_products_on_our_platform")}</h3>
                                </div>
                            </div>
                            <div className={"title"}>
                                <div className={"left"}>
                                    <IoCheckmarkOutline className={"icon"} />
                                </div>
                                <div className={"right"}>
                                    <h2>{t("no_hidden_fees")}</h2>
                                    <h3>{t("there_are_no_hidden_fees_on_our_platform_all_payment_terms_are_presented_in_full_transparency")}</h3>
                                </div>
                            </div>
                        </div>
                        <div className={"wrapper1"}>
                            <Row className={"row1"}>
                                <Col>
                                    <span>{t("domestic")}</span>
                                    <div className={"price"}>
                                        <h4>{t("4_99")}</h4>
                                        <h5>{t("0_49_azn")}</h5>
                                    </div>
                                    <h6>{t("as_low_as_per_transaction")}</h6>
                                </Col>
                                <Col>
                                    <span>{t("international")}</span>
                                    <div className={"price"}>
                                        <h4>{t("4_99")}</h4>
                                        <h5>{t("0_49_azn")}</h5>
                                    </div>
                                    <h6>{t("as_low_as_per_transaction")}</h6>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={"col2"}>
                        <div className={"title1"}>
                            <h3>{t("personal_or_business_accounts")}</h3>
                            <h4>{t("either_sell_as_personal_or_as_a_business_it_is_so_easy_and_free_to_open_an_account_at_buyonida_and_start_selling_your_items")}</h4>
                        </div>
                        <div className={"title1"}>
                            <h3>{t("board_payment_options")}</h3>
                            <h4>{t("accept_visa_and_mastercard_overall_the_world_to_start_getting_paid_just_list_your_items_on_buyonida")}</h4>
                        </div>
                        <div className={"title1"}>
                            <h3>{t("settlements_every_wednesday")}</h3>
                            <h4>{t("for_the_fulfilled_orders_your_money_is_transferred_to_your_bank_account_on_every_wednesday")}</h4>
                        </div>
                        <div className={"title1"}>
                            <h3>{t("create_your_market_from_scratch_fully_customize")}</h3>
                            <h4>{t("build_your_market_from_scratch_and_fully_customize_every_detail_to_uniquely_reflect_your_brand_identity")}</h4>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>;
}
export default HomeSectFour;