import './index.scss';
import "react-quill/dist/quill.snow.css";
import image1 from "/src/assets/miniPhoto.png"

function AdminCollectionsMenu() {
    return (
        <section id="adminCollectionsMenu">
            <div className={"textWrapper"}>
                <h2>Collections</h2>
                <button>Create collection</button>
            </div>
            <table>
                <thead>
                <tr className={"first"}>
                    <th>
                        <button>All collections</button>
                    </th>
                </tr>
                <tr className={"bgbg"}>
                    <th className={"checkboxWrapper"}>
                        <input type="checkbox"/>
                    </th>
                    <th>Title</th>
                    <th>Products</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={"checkboxWrapper"}>
                        <input type="checkbox"/>
                    </td>
                    <td>
                        <img className={"image"} src={image1} alt={"Image"}/>
                        Default collection
                    </td>
                    <td>5</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}

export default AdminCollectionsMenu;
