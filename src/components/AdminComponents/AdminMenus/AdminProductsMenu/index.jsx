import "./index.scss";
import {FiPlus} from "react-icons/fi";
import image1 from "/src/assets/bg.jpg";
import {useNavigate} from "react-router-dom";
import {GoDotFill} from "react-icons/go";
import {useGetAllProductsByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {PRODUCT_LOGO} from "../../../../../constants.js";

function AdminProductsMenu() {
    const navigate = useNavigate();
    const arr = new Array(1).fill(0);

    const {data: getAllProductsByMarketId} = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
    const products = getAllProductsByMarketId?.data;
    console.log(products);

    return (
        <section id="adminProductsMenu">
            {products && products.length !== 0 ? (
                <>
                    <div className={"textWrapper"}>
                        <h2>Products</h2>
                        <button onClick={() => {
                            navigate('/cp/add-product')
                        }}>Create product
                        </button>
                    </div>
                    <table>
                        <thead>
                        <tr className="first">
                            <th>
                                <button>All products</button>
                            </th>
                        </tr>
                        <tr className="bgbg">
                            <td className="checkboxWrapper">
                                <input type="checkbox"/>
                            </td>
                            <td>
                                <span style={{fontWeight: "600"}}>Image</span>
                                <span style={{fontWeight: "600", marginLeft: "33px"}}>Title</span>
                            </td>
                            <td style={{fontWeight: "600"}}>Status</td>
                            <td style={{fontWeight: "600"}}>Inventory</td>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product?.id}>
                                <td className="checkboxWrapper">
                                    <input type="checkbox"/>
                                </td>
                                <td onClick={() => {
                                    navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product?.id}`)
                                }}>
                                    <img className="image" src={PRODUCT_LOGO + product?.imageNames[0]} alt="Product"/>
                                    {product?.title}
                                </td>
                                <td onClick={() => {
                                    navigate(`/cp/edit-product/${Cookies.get('chooseMarket')}/${product?.id}`)
                                }}>
                                    <span className="status">
                                        <GoDotFill className="dot"/> Active
                                    </span>
                                </td>
                                <td onClick={() => {
                                    navigate(`/cp/edit-product/${product?.id}`)
                                }}>5
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="wrapper">
                    <div className="box">
                        <h2>Create your products</h2>
                        <p>Start by stocking your store with products your customers will love</p>
                        <button onClick={() => navigate("/cp/add-product")}>
                            <FiPlus/>
                            Create product
                        </button>
                    </div>
                    <img src={image1} alt="Background"/>
                </div>
            )}
        </section>
    );
}

export default AdminProductsMenu;
