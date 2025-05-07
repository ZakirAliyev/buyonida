import { useTranslation } from "react-i18next";
import './index.scss';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMailOpen, IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
function Contact() {
  const {
    t
  } = useTranslation();
  return <section id={"contact"}>
            <div className={"aboutBanner"}>
                <h2>{t("contact_us")}</h2>
                <p>{t("whether_you_re_curious_about_features_pricing_or_anything_else_our_team_is_ready_to_answer_all_your_questions")}</p>
            </div>
            <div className={"container5"}>
                <div className={"aboutForm"}>
                    <div className={"row"}>
                        <div className={"col-5 col-md-5 col-sm-12 col-xs-12"}>
                            <h2>{t("get_in_touch")}</h2>
                            <p>{t("your_next_success_story_starts_here_get_in_touch_with_buyonida")}</p>
                            <div className={"locationWrapper"}>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <FaLocationDot className={"icon"} />
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>{t("location")}</h4>
                                        <h5>{t("a_q_molla_cuma_str_46b")}</h5>
                                    </div>
                                </div>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <FaPhone className={"icon"} />
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>{t("phone")}</h4>
                                        <h5>{t("994_10_265_59_90")}</h5>
                                    </div>
                                </div>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <IoIosMailOpen className={"icon"} />
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>{t("email")}</h4>
                                        <h5>{t("info_buyonida_com")}</h5>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{
              marginTop: '50px'
            }}>{t("social_media")}</h2>
                            <div className={"social"}>
                                <div className={"socialIcon"}>
                                    <IoLogoWhatsapp className={"icon"} />
                                </div>
                                <div className={"socialIcon"}>
                                    <AiFillInstagram className={"icon"} />
                                </div>
                                <div className={"socialIcon"}>
                                    <AiFillTikTok className={"icon"} />
                                </div>
                                <div className={"socialIcon"}>
                                    <FaFacebook className={"icon"} />
                                </div>
                            </div>
                        </div>
                        <div className={"col-7 col-md-5 col-sm-12 col-xs-12"}>
                            <h2 className={"asdasd"}>{t("send_us_a_message")}</h2>
                            <div className={"row"}>
                                <div className={"box col-6"}>
                                    <label>{t("name")}</label>
                                    <input placeholder={"Add your name"} />
                                </div>
                                <div className={"box col-6"}>
                                    <label>{t("surname")}</label>
                                    <input placeholder={"Add your surname"} />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>{t("email")}</label>
                                    <input placeholder={"example@example.com"} />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>{t("number")}</label>
                                    <input placeholder={"+994 XX XXX XX XX"} />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>{t("note")}</label>
                                    <textarea rows={5} />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <button>{t("send")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.892233203415!2d49.8580676!3d40.4112381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0027d3cbe7%3A0xa174ef828ee6652!2sBuyonida!5e0!3m2!1str!2saz!4v1746183795479!5m2!1str!2saz" style={{
        border: 0
      }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>;
}
export default Contact;