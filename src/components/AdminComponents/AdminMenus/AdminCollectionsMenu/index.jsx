import './index.scss';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {useDeleteCollectionMutation, useGetAllCollectionsByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { COLLECTION_LOGO } from "../../../../../constants.js";
import {GoDotFill} from "react-icons/go";
import {toast} from "react-toastify";

function AdminCollectionsMenu() {
    const navigate = useNavigate();
    const { data: getAllCollectionsByMarketId, refetch } = useGetAllCollectionsByMarketIdQuery(Cookies.get("chooseMarket"));
    const collections = getAllCollectionsByMarketId?.data;
const [deleteCollection] = useDeleteCollectionMutation()
    const handleDelete = async (id) => {
    const marketId = Cookies.get("chooseMarket");
        try {
            const response = await deleteCollection({id, marketId}).unwrap
            if(response?.statusCode === 200) {
                toast.success('Sifariş uğurla tamamlandı!', {
                    position: 'bottom-right',
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        } catch (error) {
            toast.success('Xeta bas verdi!', {
                position: 'bottom-right',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
        refetch();
    };

    return (
        <section id="adminCollectionsMenu">
            <div className="textWrapper">
                <h2>Collections</h2>
                <button
                    onClick={() => {
                        navigate('/cp/add-collection');
                    }}
                >
                    Create collection
                </button>
            </div>
            <table>
                <thead>
                <tr className="first">
                    <th>
                        <button>All collections</button>
                    </th>
                </tr>
                <tr className="bgbg">
                    <th className="checkboxWrapper">
                        <input type="checkbox" />
                    </th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Products</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {collections && collections.length !== 0 ? (
                    collections.map((item) => (
                        <tr key={item?.id}>
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td>
                                <img
                                    className="image"
                                    src={COLLECTION_LOGO + item?.coverImageUrl}
                                    alt="Image"
                                    onError={(e) => (e.target.src = "path/to/placeholder/image.jpg")} // Fallback image if loading fails
                                />
                            </td>
                            <td
                                onClick={() => {
                                    navigate(`/cp/edit-collection/${Cookies.get('chooseMarket')}/${item?.id}`);
                                }}
                            >
                                {item?.title}
                            </td>
                            <td>
                  <span className={`status ${item?.isActive ? 'active' : 'inactive'}`}>
                      <GoDotFill/>
                    {item?.isActive ? 'Active' : 'Inactive'}
                  </span>
                            </td>
                            <td
                                onClick={() => {
                                    navigate(`/cp/edit-collection/${Cookies.get('chooseMarket')}/${item?.id}`);
                                }}
                            >
                                {item?.products?.length}
                            </td>
                            <td>
                                <button
                                    className="deleteButton"
                                    onClick={() => handleDelete(item?.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                            There are no collections available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default AdminCollectionsMenu;