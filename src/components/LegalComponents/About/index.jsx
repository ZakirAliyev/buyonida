import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "/src/assets/about1.png";
import image3 from "/src/assets/about2.png";
import image4 from "/src/assets/about3.png";
import image5 from "/src/assets/about4.png";
import image6 from "/src/assets/about6.png";
import image2 from "/src/assets/aboutSeyisi.png";
function About() {
  const {
    t
  } = useTranslation();
  return <section id={"about"}>
            <div className={"aboutBanner"}>
                <h2>{t("about_us")}</h2>
                <p>{t("at_buyonida_we_believe_every_idea_can_become_reality_with_passion_and_the_right_approach")}</p>
            </div>
            <div className={"container"}>
                <div className={"imageWrapper"}>
                    <div className={"row"}>
                        <div className={"box col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image1} alt={"Image"} />
                        </div>
                        <div className={"box pad col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image3} alt={"Image"} />
                        </div>
                        <div className={"box col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image4} alt={"Image"} />
                        </div>
                        <div className={"box pad col-3 col-md-3 col-sm-4 col-xs-4 zakir"}>
                            <img src={image5} alt={"Image"} />
                        </div>
                    </div>
                </div>
                <div className={"textWrapper"}>
                    <h2>{t("discover_who_we_are_and_what_drives_us")}</h2>
                    <div className={"row"}>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <h3>{t("at_buyonida_we_are_more_than_just_a_team_we_are_a_collective_of_innovators_creators_and_dreamers_committed_to_building_exceptional_buyonida_experiences_our_journey_began_with_a_simple_idea_to_empower_businesses_to_thrive_in_the_digital_world_through_beautiful_functional_and_effective_online_stores")}</h3>
                        </div>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <h3>{t("every_project_we_take_on_is_an_opportunity_to_bring_fresh_ideas_to_life_create_lasting_impact_and_push_the_boundaries_of_what_s_possible")}</h3>
                        </div>
                    </div>
                </div>
                <div className={"textWrapper1"}>
                    <div className={"row"}>
                        <div className={"col-5 col-md-5 col-sm-12 col-xs-12"}>
                            <img src={image6} alt={"Image"} />
                        </div>
                        <div className={"p0 col-7 col-md-7 col-sm-12 col-xs-12"}>
                            <h2>{t("what_makes_buyonida_unique_and_why_our_clients_trust_us")}</h2>
                            <div className={"row"}>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <h3>{t("at_buyonida_we_believe_that_true_success_lies_in_the_details_the_small_things_that_create_a_big_impact")}</h3>
                                </div>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <h3>{t("we_don_t_just_deliver_a_product_we_build_lasting_partnerships_that_empower_brands_to_thrive_in_the_competitive_digital_landscape_with_buyonida_you_re_not_just_getting_a_service_you_re_gaining_a_team_that_genuinely_cares_about_your_journey_and_your_success")}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"textWrapper2"}>
                    <div className={"h2"}>
                        <h2>{t("discover_what_we_offer_to_help_your_brand_grow_and_succeed")}</h2>
                    </div>
                    <div className={"row"} style={{
          justifyContent: 'center'
        }}>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"} />
                            <h4>{t("personal_or_business_accounts")}</h4>
                            <h5>{t("open_a_free_buyonida_account_and_start_selling_easily")}</h5>
                        </div>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"} />
                            <h4>{t("board_payment_options")}</h4>
                            <h5>{t("accept_visa_and_mastercard_overall_the_world")}</h5>
                        </div>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"} />
                            <h4>{t("installement_options")}</h4>
                            <h5>{t("you_can_offer_installment_options_to_your_customers_with_buyonida")}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
}
export default About;