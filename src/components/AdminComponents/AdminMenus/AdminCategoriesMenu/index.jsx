import './index.scss';
import "react-quill/dist/quill.snow.css";
import {useNavigate} from "react-router-dom";
import {useGetAllCategoriesByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {CATEGORY_LOGO} from "../../../../../constants.js";

function AdminCategoriesMenu() {

    const navigate = useNavigate()

    const {data: getAllCategories} = useGetAllCategoriesByMarketIdQuery(Cookies.get("chooseMarket"));
    const categories = getAllCategories?.data;

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
                {categories && categories.map((category) => (
                    <tr key={category.id}>
                        <td className={"checkboxWrapper"}>
                            <input type="checkbox"/>
                        </td>
                        <td onClick={() => {
                            navigate(`/cp/edit-category/${Cookies.get('chooseMarket')}/${category?.id}`)
                        }}>
                            <img className={"image"} src={CATEGORY_LOGO + category?.imageName} alt={"Image"}/>
                            <p>{category?.name}</p>
                        </td>
                        <td onClick={() => {
                            navigate(`/cp/edit-category/${Cookies.get('chooseMarket')}/${category?.id}`)
                        }}>5
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}

export default AdminCategoriesMenu;
