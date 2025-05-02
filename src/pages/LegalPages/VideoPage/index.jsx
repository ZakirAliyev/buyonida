import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Video from "../../../components/LegalComponents/Video/index.jsx";

function VideoPage() {
    return (
        <section id={"videoPage"}>
            <HomeNavbar/>
            <Video/>
            <HomeFooter/>
        </section>
    );
}

export default VideoPage;