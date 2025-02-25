import "./index.scss";
import { FiPlus } from "react-icons/fi";
import image1 from "/src/assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

function AdminProductsMenu() {
    const navigate = useNavigate();
    const arr = new Array(0).fill(0);

    return (
        <section id="adminProductsMenu">
            <h1>Products</h1>
            {arr && arr.length !== 0 ? (
                <table>
                    <thead>
                    <tr className="first">
                        <th>
                            <button>All products</button>
                        </th>
                    </tr>
                    <tr className="bgbg">
                        <td className="checkboxWrapper">
                            <input type="checkbox" />
                        </td>
                        <td>
                            <span style={{ fontWeight: "600" }}>Image</span>
                            <span style={{ fontWeight: "600", marginLeft: "33px" }}>Title</span>
                        </td>
                        <td style={{ fontWeight: "600" }}>Status</td>
                        <td style={{ fontWeight: "600" }}>Inventory</td>
                    </tr>
                    </thead>
                    <tbody>
                    {arr.map((item, index) => (
                        <tr key={index}>
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td>
                                <img className="image" src={image1} alt="Product" />
                                T-shirt
                            </td>
                            <td>
                                    <span className="status">
                                        <GoDotFill className="dot" /> Active
                                    </span>
                            </td>
                            <td>5</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div className="wrapper">
                    <div className="box">
                        <h2>Add your products</h2>
                        <p>Start by stocking your store with products your customers will love</p>
                        <button onClick={() => navigate("/cp/add-product")}>
                            <FiPlus />
                            Add product
                        </button>
                    </div>
                    <img src={image1} alt="Background" />
                </div>
            )}
        </section>
    );
}

export default AdminProductsMenu;
