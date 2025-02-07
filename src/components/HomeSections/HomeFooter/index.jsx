import './index.scss'

function HomeFooter() {
    return (
        <section id={'homeFooter'}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 col-md-4 col-sm-6 col-xs-6"}>
                        <h3>Product</h3>
                        <h4>Features</h4>
                        <h4>E-commerce Plans</h4>
                        <h4>Testimonials</h4>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-6 col-xs-6"}>
                        <h3>Product</h3>
                        <h4>About Us</h4>
                        <h4>Contact</h4>
                        <h4>Blogs</h4>
                    </div>
                    <div className={"col-4 col-md-4 col-sm-6 col-xs-6"}>
                        <h3>Featured Posts</h3>
                        <h4>What is E-commerce?</h4>
                        <h4>Trending Products to Sell Online</h4>
                        <h4>Business Ideas</h4>
                    </div>
                </div>
                <div className={"row"} style={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: '30px',
                }}>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>Privacy Policy</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>Terms of Services</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>Human Resources Policy</div>
                    <div className={"col-3 col-md-3 col-sm-6 col-xs-6"}>Environmental and Social Policy</div>
                </div>
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: '30px',
                    fontWeight: 'bold'
                }}>2024-2025 Buyonida inc. All rights reserved.
                </div>
            </div>
        </section>
    )
}

export default HomeFooter;