import { useTranslation } from "react-i18next";
import './index.scss';
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Blogs from "../../../components/LegalComponents/Blogs/index.jsx";
import { Helmet } from "react-helmet-async";
function BlogPage() {
  const {
    t
  } = useTranslation();
  return <section id={"blogPage"}>
            <Helmet>
                <title>{'Blog Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar />
            <Blogs />
            <HomeFooter />
        </section>;
}
export default BlogPage;