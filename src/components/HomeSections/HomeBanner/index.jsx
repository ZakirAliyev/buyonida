import { useTranslation } from "react-i18next";
import './index.scss';
import { Link } from "react-router-dom";
import { BsFillCursorFill } from "react-icons/bs";
import kilit from "/src/assets/kilit.png";
import analytics from "/src/assets/analytics.png";
function HomeBanner() {
  const {
    t
  } = useTranslation();
  return <section id={"homeBanner"}>
            <div className={"container"}>
                <div className={"kilit"}>
                    <img src={kilit} alt={"Kilit"} />
                </div>
                <div className={"analytics"}>
                    <img src={analytics} alt={"Analytics"} />
                </div>
                <div className={"animationWrapper"}>
                    <div className={"animation animation1"}>
                    <span>{t("customize_your_store")}<BsFillCursorFill className={"icon"} />
                    </span>
                    </div>
                    <div className={"animation animation2"}>
                    <span>{t("list_your_items")}<BsFillCursorFill className={"icon"} />
                    </span>
                    </div>
                </div>
                <h2>{t("create_a_website_without_limits")}</h2>
                <div className={"h4"} style={{
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center"
      }}>
                    <h4>{t("build_and_scale_with_confidence")}</h4>
                    <h4 style={{
          maxWidth: "650px",
          width: "100%"
        }}>{t("from_a_powerful_website_builder_to_advanced_business_solutions_we_ve_got_you_covered")}</h4>
                </div>
                <div className={"linkWrapper"}>
                    <Link to={'/register'} className={"link"}>{t("get_start_for_free")}</Link>
                </div>
                <h6>{t("get_started_start_for_free_no_credit_card_required")}</h6>
                <div className={"animationWrapper animationWrapper1"}>
                    <div className={"animation animation2 d-none"}>
                    <span>{t("list_your_items")}<BsFillCursorFill className={"icon"} />
                    </span>
                    </div>
                    <div className={"animation animation3"}>
                    <span>{t("your_own_ssdftore")}<BsFillCursorFill className={"icon"} />
                    </span>
                    </div>
                </div>
                <img className={"img"} src={"https://wallpapers.com/images/hd/e-commerce-pictures-ieb3cw7wuo7qbyez.jpg"} alt={"Theme"} />
            </div>
        </section>;
}
export default HomeBanner;