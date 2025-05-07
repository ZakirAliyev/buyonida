import { useTranslation } from "react-i18next";
import './index.scss';
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Video from "../../../components/LegalComponents/Video/index.jsx";
import { Helmet } from "react-helmet-async";
function VideoPage() {
  const {
    t
  } = useTranslation();
  return <section id={"videoPage"}>
            <Helmet>
                <title>{'Video Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar />
            <Video />
            <HomeFooter />
        </section>;
}
export default VideoPage;