import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";
import image1 from "/src/assets/mohtesem.jpg"
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

function MarketCollectionPage() {
    return (
        <section id={"marketCollectionPage"}>
            <MarketNavbar/>
            <div className={"section"}>
                <div className={"container"}>
                    <div className={"titleWrapper"}>
                        <img src={image1} alt={"Image"}/>
                        <div className={"textWrapper"}>
                            <h2>Collection name:</h2>
                            <h3>A short description about product. You will see product details and good sentences in
                                here because i want like that because i want like that</h3>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"line"}></div>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <div className={"line"}></div>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <div className={"line"}></div>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <div className={"line"}></div>
                    </div>
                    <div className={"lookOther"}>
                        <h4>Lets look to other collections:</h4>
                        <div className={"row"}>
                            <div className={"box box1 col-2-60"}>
                                <FaChevronRight className={"icon"}/>
                            </div>
                            <MarketCard number={14}/>
                            <MarketCard number={14}/>
                            <MarketCard number={14}/>
                            <MarketCard number={14}/>
                            <div className={"box col-2-60"}>
                                <FaChevronRight className={"icon"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketCollectionPage;