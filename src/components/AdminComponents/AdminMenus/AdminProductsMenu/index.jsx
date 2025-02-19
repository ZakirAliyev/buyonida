import './index.scss'
import {FiPlus} from "react-icons/fi";
import image1 from "/src/assets/bg.jpg"
import {useNavigate} from "react-router-dom";

function AdminProductsMenu() {

    const navigate = useNavigate();

    return (
        <section id={"adminProductsMenu"}>
            <h1>Products</h1>
            <div className={"wrapper"}>
                <div className={"box"}>
                    <h2>Add your products</h2>
                    <p>Start by stocking your store with products your customers will love</p>
                    <button onClick={() => {
                        navigate('/cp/add-product')
                    }}>
                        <FiPlus/>
                        Add product
                    </button>
                </div>
                <img src={image1} alt={"Image"}/>
            </div>
        </section>
    );
}

export default AdminProductsMenu;