import './index.scss'
import { MARKET_LOGO } from "../../../../constants.js";
import { useNavigate } from 'react-router-dom';

function MarketFooter({ palet, store }) {
    const navigate = useNavigate();

    return (
        <section id={"marketFooter"} style={{ backgroundColor: palet ? (palet[0]?.footerBgColor) : ("#000000"), color: palet ? (`${palet[0]?.footerTextColor}`) : ("#ffffff") }}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <img
                            style={{ width: `${store?.logoWidth}px` }}
                            src={store?.logoImageName ? MARKET_LOGO + store?.logoImageName : ''}
                            alt="Logo"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer', width: `${store?.logoWidth}px` }}
                        />
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Pages</h3>
                        <p onClick={() => navigate(`/@${store?.name}/about`)} style={{ cursor: 'pointer' }}>About Us</p>
                        <p onClick={() => navigate(`/@${store?.name}/about`)} style={{ cursor: 'pointer' }}>Contact Us</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3 onClick={() => navigate('/social')} style={{ cursor: 'pointer' }}>Social Links</h3>
                        <p onClick={() => navigate('https://instagram.com')} style={{ cursor: 'pointer' }}>Instagram</p>
                        <p onClick={() => navigate('https://facebook.com')} style={{ cursor: 'pointer' }}>Facebook</p>
                        <p onClick={() => navigate('https://tiktok.com')} style={{ cursor: 'pointer' }}>Tiktok</p>
                    </div>
                    <div className={"col-15-60 col-md-30-60 col-sm-60-60 col-xs-60-60"}>
                        <h3 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Get Help</h3>
                        <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>FAQ</p>
                        <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Buyonida support</p>
                        <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Documentary</p>
                    </div>
                </div>
                <div className={"bottom"}>
                    <h4 onClick={() => window.location.href = 'https://buyonida.com'} style={{ cursor: 'pointer' }}>
                        Powered by <span style={{ color: '#F7E073' }}>Buyonida</span>
                    </h4>
                </div>
            </div>
        </section>
    );
}

export default MarketFooter;
