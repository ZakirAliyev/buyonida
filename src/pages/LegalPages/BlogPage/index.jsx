import './index.scss'
import HomeNavbar from "../../../components/HomeSections/HomeNavbar/index.jsx";
import HomeFooter from "../../../components/HomeSections/HomeFooter/index.jsx";
import Blogs from "../../../components/LegalComponents/Blogs/index.jsx";

function BlogPage() {
    return (
        <section id={"blogPage"}>
            <HomeNavbar/>
            <Blogs/>
            <HomeFooter/>
        </section>
    );
}

export default BlogPage;