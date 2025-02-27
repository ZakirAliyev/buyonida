import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import image1 from "/src/assets/mohtesem.jpg"

function MarketAboutPage() {
    return (
        <section id={"marketAboutPage"}>
            <MarketNavbar/>
            <div className={"section"}>
                <div className={"container"}>
                    <div className={"titleWrapper"}>
                        <img src={image1} alt={"Image"}/>
                        <div className={"textWrapper"}>
                            <h2>About store title</h2>
                            <h3>A short description about product. You will see product details and good sentences in
                                here
                                because i want like that because i want like thatA short description about product. You
                                will
                                see product details and good sentences in here because i want like that because i want
                                like
                                thatA short description about product. You will see product details and good sentences
                                in
                                here because i want like that because i want like thatA short description about product.
                                You
                                will see product details and good sentences in here because i want like that because i
                                want
                                like thatA short description about product. You will see product details and good
                                sentences
                                in here because i want like that because i want like that</h3>
                        </div>
                    </div>
                </div>
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketAboutPage;