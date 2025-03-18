import CustomizeStorePageNavbar from "../../components/CustomizeStoreComponents/CustomizeStorePageNavbar/index.jsx";
import CustomizeStoreScreens from "../../components/CustomizeStoreComponents/CustomizeStoreScreens/index.jsx";

function CustomizeStorePages() {
    return (
        <section id={"customizeStorePages"} style={{
            fontFamily: "'Space Grotesk', sans-serif"
        }}>
            <CustomizeStorePageNavbar/>
            <CustomizeStoreScreens/>
        </section>
    );
}

export default CustomizeStorePages;