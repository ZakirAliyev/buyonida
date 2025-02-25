import './index.scss';
import "react-quill/dist/quill.snow.css";
import image1 from "/src/assets/miniPhoto.png"
import {useNavigate} from "react-router-dom";

function AdminCategoriesMenu() {

    const navigate = useNavigate()

    return (
        <section id="adminCategoriesMenu">
            <div className={"textWrapper"}>
                <h2>Categories</h2>
                <button onClick={() => {
                    navigate('/cp/add-category')
                }}>Create category
                </button>
            </div>
            <table>
                <thead>
                <tr className={"first"}>
                    <th>
                        <button>All categories</button>
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
                        Default category
                    </td>
                    <td>5</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}

export default AdminCategoriesMenu;
