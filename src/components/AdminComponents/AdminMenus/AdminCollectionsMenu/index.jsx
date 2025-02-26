import './index.scss';
import "react-quill/dist/quill.snow.css";
import image1 from "/src/assets/miniPhoto.png"
import {useNavigate} from "react-router-dom";
import {RxCross2} from "react-icons/rx";
import image2 from "../../../../assets/order.png";

function AdminCollectionsMenu() {

    const navigate = useNavigate()
    const arr = new Array(2).fill(0)

    return (
        <section id="adminCollectionsMenu">
            <div className={"textWrapper"}>
                <h2>Collections</h2>
                <button onClick={() => {
                    navigate('/cp/add-collection')
                }}>Create collection
                </button>
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
                {arr && arr.length !== 0 ? (
                    arr.map((item, index) => (
                        <tr key={index}>
                            <td className={"checkboxWrapper"}>
                                <input type="checkbox"/>
                            </td>
                            <td onClick={()=> {
                                navigate('/cp/edit-collection')
                            }}>
                                <img className={"image"} src={image1} alt={"Image"}/>
                                Default collection
                            </td>
                            <td onClick={()=> {
                                navigate('/cp/edit-collection')
                            }}>5</td>
                        </tr>
                    ))
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <img src={image2} alt={"Image"}/>
                        <div style={{
                            maxWidth: '400px',
                            width: '100%',
                        }}>
                            There are no products in this collection.
                            Search for products
                        </div>
                    </div>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default AdminCollectionsMenu;
