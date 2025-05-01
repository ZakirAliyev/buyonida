import './index.scss'
import image1 from "/src/assets/aboutImage.png"
import image2 from "/src/assets/aboutSeyisi.png"

function About() {
    return (
        <section id={"about"}>
            <div className={"aboutBanner"}>
                <h2>About us</h2>
                <p>At Buyonida, we believe every idea can become reality with passion and the right approach.</p>
            </div>
            <div className={"container"}>
                <div className={"imageWrapper"}>
                    <div className={"row"}>
                        <div className={"box col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image1} alt={"Image"}/>
                        </div>
                        <div className={"box pad col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image1} alt={"Image"}/>
                        </div>
                        <div className={"box col-3 col-md-3 col-sm-4 col-xs-4"}>
                            <img src={image1} alt={"Image"}/>
                        </div>
                        <div className={"box pad col-3 col-md-3 col-sm-4 col-xs-4 zakir"}>
                            <img src={image1} alt={"Image"}/>
                        </div>
                    </div>
                </div>
                <div className={"textWrapper"}>
                    <h2>Discover Who We Are and What Drives Us</h2>
                    <div className={"row"}>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <h3>At Buyonida, we are more than just a team — we are a collective of innovators, creators,
                                and dreamers committed to building exceptional Shopify experiences. Our journey began
                                with a simple idea: to empower businesses to thrive in the digital world through
                                beautiful, functional, and effective online stores.</h3>
                        </div>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <h3>Every project we take on is an opportunity to bring fresh ideas to life, create lasting
                                impact, and push the boundaries of what’s possible.</h3>
                        </div>
                    </div>
                </div>
                <div className={"textWrapper1"}>
                    <div className={"row"}>
                        <div className={"col-5 col-md-5 col-sm-12 col-xs-12"}>
                            <img src={image1} alt={"Image"}/>
                        </div>
                        <div className={"p0 col-7 col-md-7 col-sm-12 col-xs-12"}>
                            <h2>What Makes Buyonida Unique and Why Our Clients Trust Us</h2>
                            <div className={"row"}>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <h3>At Buyonida, we believe that true success lies in the details — the small things
                                        that
                                        create a big impact. </h3>
                                </div>
                                <div className={"col-12 col-md-12 col-sm-12 col-xs-12"}>
                                    <h3>
                                        We don’t just deliver a product; we build lasting partnerships that empower
                                        brands to
                                        thrive in the competitive digital landscape.With Buyonida, you're not just
                                        getting a
                                        service — you're gaining a team that genuinely cares about your journey and your
                                        success.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"textWrapper2"}>
                    <div className={"h2"}>
                        <h2>Discover What We Offer to Help Your Brand Grow and Succeed</h2>
                    </div>
                    <div className={"row"} style={{
                        justifyContent: 'center'
                    }}>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"}/>
                            <h4>Personal or business accounts</h4>
                            <h5>Open a free Buyonida account and start selling easily.</h5>
                        </div>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"}/>
                            <h4>Board payment options</h4>
                            <h5>Accept Visa and MasterCard overall the world.</h5>
                        </div>
                        <div className={"box1 col-4 col-md-6 col-sm-12 col-xs-12"}>
                            <img src={image2} alt={"Image"}/>
                            <h4>Installement options</h4>
                            <h5>You can offer installment options to your customers with Buyonida.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;