import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import BlogDetails from "../../../components/LegalComponents/BlogDetails/index.jsx";

function BlogDetailsPage() {
    return (
        <section id={"blogDetailsPage"}>
            <HomeNavbar/>
            <BlogDetails/>
            <HomeFooter/>
        </section>
    );
}

export default BlogDetailsPage;