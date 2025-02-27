import './index.scss'
import image1 from "/src/assets/mohtesem.jpg"

function MarketCard({number}) {
    return (
        <div className={`col-${number}-60`}>
            <section id={"marketCard"}>
                <img src={image1} alt={"Image"}/>
                <div className={"textWrapper"}>
                    <h2>Hip-Hoper Tshirt</h2>
                    <h3>$223</h3>
                </div>
            </section>
        </div>
    );
}

export default MarketCard;