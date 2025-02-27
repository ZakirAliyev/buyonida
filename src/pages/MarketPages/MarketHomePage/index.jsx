import './index.scss'
import MarketNavbar from "../../../components/MarketComponents/MarketNavbar/index.jsx";
import MarketSwiperHero from "../../../components/MarketComponents/MarketSwiperHero/index.jsx";
import MarketCard from "../../../components/MarketComponents/MarketCard/index.jsx";
import MarketTitle from "../../../components/MarketComponents/MarketTitle/index.jsx";
import MarketFooter from "../../../components/MarketComponents/MarketFooter/index.jsx";

function MarketHomePage() {
    return (
        <section id={"marketHomePage"}>
            <MarketNavbar/>
            <MarketSwiperHero/>
            <div className={"section"}>
                <MarketTitle title={"Collection name:"}/>
                <div className={"container"}>
                    <div className={"row"}>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                    </div>
                </div>
                <MarketTitle title={"Category name:"}/>
                <div className={"container"}>
                    <div className={"row"}>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                    </div>
                </div>
                <MarketTitle title={"Category 2 name:"}/>
                <div className={"container"}>
                    <div className={"row"}>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                        <MarketCard number={12}/>
                    </div>
                </div>
            </div>
            <MarketFooter/>
        </section>
    );
}

export default MarketHomePage;