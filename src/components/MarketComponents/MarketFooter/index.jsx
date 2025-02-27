import './index.scss'
import image1 from "/src/assets/sariLogo.png"

function MarketFooter() {
    return (
        <section id={"marketFooter"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-15-60"}>
                        <img src={image1} alt={"Image"}/>
                    </div>
                    <div className={"col-15-60"}>
                        <h2>Pages</h2>
                        <p>Collections</p>
                        <p>Categories</p>
                        <p>About Us</p>
                    </div>
                    <div className={"col-15-60"}>
                        <h2>Social Links</h2>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Tiktok</p>
                    </div>
                    <div className={"col-15-60"}>
                        <h2>Get Help</h2>
                        <p>FAQ</p>
                        <p>Buyonida support</p>
                        <p>Documentary</p>
                    </div>
                </div>
                <div className={"bottom"}>
                    <h3>Powered by Buyonida</h3>
                </div>
            </div>
        </section>
    );
}

export default MarketFooter;