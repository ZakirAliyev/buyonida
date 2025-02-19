import './index.scss'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import image1 from "/src/assets/bg.jpg"
import image2 from "/src/assets/sariLogo.png"

function AdminChooseMarketPage() {

    const [chooseMarket, setChooseMarket] = useState(null);
    const markets = [1, 2, 3]

    const navigate = useNavigate()

    return (
        <section id={"adminChooseMarketPage"}>
            <div className={"wrapper"}>
                <div className="img">
                    <img
                        src={image2}
                        alt="Logo"
                    />
                </div>
                <h2>Mağazanı seç</h2>
                <div className={"boxWrapper"}>
                    {markets && markets.map((market, index) => (
                        <div
                            onClick={() => setChooseMarket(index)}
                            key={index}
                            className={`box ${chooseMarket === index ? 'selected' : ''}`}
                        >
                            <img src={image1} alt={""}/>
                            <div>
                                <h3>Qaraqan Store</h3>
                                <p>elvar.agamaliyev.official@gmail.com</p>
                            </div>
                        </div>
                    ))}
                    {markets.length === 0 ? (
                        <>
                            <div className={"noMarket newBox"}>Mağaza yoxdur</div>
                            <div className={"newBox"}>
                                <p>+ Yeni mağaza yarat</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {markets.length < 3 && (
                                <div className={"newBox"}>
                                    <p>+ Yeni mağaza yarat</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <form>
                    <button onClick={() => {
                        navigate('/cp')
                    }}>Daxil ol
                    </button>
                </form>
                <div className="links">
                    <Link to="/public" className="link">
                        Help
                    </Link>
                    <Link to="/public" className="link">
                        Privacy
                    </Link>
                    <Link to="/public" className="link">
                        Terms
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AdminChooseMarketPage;