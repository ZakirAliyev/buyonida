import './index.scss'
import image1 from "/src/assets/ac1.png"
import image2 from "/src/assets/ac2.png"
import image3 from "/src/assets/ac3.png"
import image4 from "/src/assets/ac4.png"

function AdminAnalyticsMenu() {

    return (
        <section id={"adminAnalyticsMenu"}>
            <div className={"textWrapper"}>
                <h2>Analytics</h2>
            </div>
            <div className={"row"}>
                <div className={"pd0 col-6"}>
                    <div className="wrapper">
                        <img src={image1} alt={"Image"}/>
                    </div>
                </div>
                <div className={"pd0 col-6"}>
                    <div className="wrapper">
                        <img src={image2} alt={"Image"}/>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"pd0 col-6"}>
                    <div className="wrapper">
                        <img src={image3} alt={"Image"}/>
                    </div>
                </div>
                <div className={"pd0 col-6"}>
                    <div className="wrapper">
                        <img src={image4} alt={"Image"}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminAnalyticsMenu;