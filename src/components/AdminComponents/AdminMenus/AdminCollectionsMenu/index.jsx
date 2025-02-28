import './index.scss';
import "react-quill/dist/quill.snow.css";
import image1 from "/src/assets/miniPhoto.png"
import {useNavigate} from "react-router-dom";
import image2 from "../../../../assets/order.png";
import {useGetAllCollectionsByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import {COLLECTION_LOGO} from "../../../../../constants.js";

function AdminCollectionsMenu() {

    const navigate = useNavigate()

    const {data: getAllCollectionsByMarketId} = useGetAllCollectionsByMarketIdQuery(Cookies.get("chooseMarket"));
    const collections = getAllCollectionsByMarketId?.data

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
                {collections && collections.length !== 0 ? (
                    collections.map((item) => (
                        <tr key={item?.id}>
                            <td className={"checkboxWrapper"}>
                                <input type="checkbox"/>
                            </td>
                            <td onClick={() => {
                                navigate(`/cp/edit-collection/${Cookies.get('chooseMarket')}/${item?.id}`)
                            }}>
                                <img className={"image"} src={COLLECTION_LOGO + item?.coverImageUrl} alt={"Image"}/>
                                {item?.title}
                            </td>
                            <td onClick={() => {
                                navigate(`/cp/edit-collection/${Cookies.get('chooseMarket')}/${item?.id}`)
                            }}>{item?.products?.length}
                            </td>
                        </tr>
                    ))
                ) : (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <div style={{
                            maxWidth: '400px',
                            width: '100%',
                            padding: '16px 32px',
                            textAlign: 'start'
                        }}>
                            There are no products in this collection.
                        </div>
                    </div>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default AdminCollectionsMenu;
