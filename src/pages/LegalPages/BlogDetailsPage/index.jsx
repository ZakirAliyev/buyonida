import { useTranslation } from "react-i18next";
import './index.scss';
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import BlogDetails from "../../../components/LegalComponents/BlogDetails/index.jsx";
import { Helmet } from "react-helmet-async";
function BlogDetailsPage() {
  const {
    t
  } = useTranslation();
  return <section id={"blogDetailsPage"}>
            <Helmet>
                <title>{'Blog Details Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <HomeNavbar />
            <BlogDetails />
            <HomeFooter />
        </section>;
}
export default BlogDetailsPage;