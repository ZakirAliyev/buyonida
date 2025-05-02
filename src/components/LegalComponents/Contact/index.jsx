import './index.scss'
import {FaLocationDot, FaPhone} from "react-icons/fa6";
import {IoIosMailOpen, IoLogoWhatsapp} from "react-icons/io";
import {FaFacebook} from "react-icons/fa";
import {AiFillInstagram, AiFillTikTok} from "react-icons/ai";

function Contact() {
    return (
        <section id={"contact"}>
            <div className={"aboutBanner"}>
                <h2>Contact us</h2>
                <p>Whether you’re curious about features, pricing, or anything else, our team is ready to answer all
                    your questions.</p>
            </div>
            <div className={"container5"}>
                <div className={"aboutForm"}>
                    <div className={"row"}>
                        <div className={"col-5 col-md-5 col-sm-12 col-xs-12"}>
                            <h2>Get in touch</h2>
                            <p>Your next success story starts here — get in touch with Buyonida.</p>
                            <div className={"locationWrapper"}>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <FaLocationDot className={"icon"}/>
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>Location</h4>
                                        <h5>Aşıq Molla Cuma str 46b</h5>
                                    </div>
                                </div>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <FaPhone className={"icon"}/>
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>Phone</h4>
                                        <h5>+994 (10) 265 59 90</h5>
                                    </div>
                                </div>
                                <div className={"location"}>
                                    <div className={"circle"}>
                                        <IoIosMailOpen className={"icon"}/>
                                    </div>
                                    <div className={"textWrapper"}>
                                        <h4>Email</h4>
                                        <h5>info@buyonida.com</h5>
                                    </div>
                                </div>
                            </div>
                            <h2 style={{
                                marginTop: '50px'
                            }}>Social media</h2>
                            <div className={"social"}>
                                <div className={"socialIcon"}>
                                    <IoLogoWhatsapp className={"icon"}/>
                                </div>
                                <div className={"socialIcon"}>
                                    <AiFillInstagram className={"icon"}/>
                                </div>
                                <div className={"socialIcon"}>
                                    <AiFillTikTok className={"icon"}/>
                                </div>
                                <div className={"socialIcon"}>
                                    <FaFacebook className={"icon"}/>
                                </div>
                            </div>
                        </div>
                        <div className={"col-7 col-md-5 col-sm-12 col-xs-12"}>
                            <h2 className={"asdasd"}>Send us a message</h2>
                            <div className={"row"}>
                                <div className={"box col-6"}>
                                    <label>Name</label>
                                    <input placeholder={"Add your name"}/>
                                </div>
                                <div className={"box col-6"}>
                                    <label>Surname</label>
                                    <input placeholder={"Add your surname"}/>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>Email</label>
                                    <input placeholder={"example@example.com"}/>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>Number</label>
                                    <input placeholder={"+994 XX XXX XX XX"}/>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <label>Note</label>
                                    <textarea rows={5}/>
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"box col-12"}>
                                    <button>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.892233203415!2d49.8580676!3d40.4112381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0027d3cbe7%3A0xa174ef828ee6652!2sBuyonida!5e0!3m2!1str!2saz!4v1746183795479!5m2!1str!2saz"
                    style={{
                        border:0
                    }} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    );
}

export default Contact;