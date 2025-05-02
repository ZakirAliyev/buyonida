import './index.scss'
import image1 from "/src/assets/art3.png"

function VideoCard1() {
    return (
        <div className={"col-4 col-md-4 col-sm-12 col-xs-12"}>
            <section id={"videoCard1"}>
                <img src={image1} alt={"Image"}/>
            </section>
        </div>
    );
}

export default VideoCard1;