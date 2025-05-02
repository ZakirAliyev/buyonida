import './index.scss'
import image1 from "/src/assets/art3.png"

function VideoCard() {
    return (
        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
            <section id={"videoCard"}>
                <img src={image1} alt={"Image"}/>
            </section>
        </div>
    );
}

export default VideoCard;