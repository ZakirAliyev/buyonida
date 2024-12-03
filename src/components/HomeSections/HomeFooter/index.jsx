import './index.scss'

function HomeFooter() {
    return (
        <section id={'homeFooter'}>
            <div className={"container"}>
                <div className='footer_content'>
                    <div className="footer_content_top">
                        <div className="footer_content_box">
                            <div>
                                <p>Product</p>
                                <ul>
                                    <li>Features</li>
                                    <li>E-commerce Plans</li>
                                    <li>Testimonials</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_content_box">
                            <div>
                                <p>Product</p>
                                <ul>
                                    <li>About Us</li>
                                    <li>Contact</li>
                                    <li>Blogs</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer_content_box">
                            <div>
                                <p>Featured Posts</p>
                                <ul>
                                    <li>What's E-commerce?</li>
                                    <li>Trending products to Sell Online</li>
                                    <li>Business ideas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer_content_bottom">
                        <p>2024 Buyonida inc. All rights reserved.</p>
                        <ul>
                            <li>Privacy Policy</li>
                            <li>Terms of Services</li>
                            <li>Human Resources Policy</li>
                            <li>Enviromental and Social Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeFooter;