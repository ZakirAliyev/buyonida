import './index.scss'
import {MARKET_LOGO} from "../../../../constants.js";

function MarketFooter({palet,store}) {
    return (
        <section id={"marketFooter"} style={{backgroundColor:palet ? (palet[0]?.footerBgColor):("#000000"),color:palet ? (`${palet[0]?.footerTextColor}`) : ("#ffffff")}}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <img
                            style={{ width: `${store?.logoWidth}px` }}
                            src={store?.logoImageName ? MARKET_LOGO + store?.logoImageName : ''}
                            alt="Logo"
                        />
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>Pages</h3>
                        <p>Collections</p>
                        <p>Categories</p>
                        <p>About Us</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>Social Links</h3>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Tiktok</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3>Get Help</h3>
                        <p>FAQ</p>
                        <p>Buyonida support</p>
                        <p>Documentary</p>
                    </div>
                </div>
                <div className={"bottom"}>
                    <h4>Powered by Buyonida</h4>
                </div>
            </div>
        </section>
    );
}

export default MarketFooter;