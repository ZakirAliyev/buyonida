import './index.scss';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {useDeleteCategoryMutation, useGetAllCategoriesByMarketIdQuery} from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { CATEGORY_LOGO } from "../../../../../constants.js";
import {GoDotFill} from "react-icons/go";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

function AdminCategoriesMenu() {
    const navigate = useNavigate();
    const marketId = Cookies.get("chooseMarket");

    // Bileşen her mount olduğunda veriler yeniden çekilsin.
    const { data: getAllCategories, refetch } = useGetAllCategoriesByMarketIdQuery(marketId, {
        refetchOnMountOrArgChange: true,
    });
    const categories = getAllCategories?.data || [];
    const [loading, setLoading] = useState(false);
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const marketId = Cookies.get("chooseMarket");
            const response = await deleteCategory({marketId, id}).unwrap()
            if(response.statusCode === 200) {
                refetch()
                toast.success("Silindi!", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark",
                });
            }
            setLoading(false);
        } catch (e) {
            toast.error("Error", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            setLoading(false);
        }
    };

    return (
        <section id="adminCategoriesMenu">
            <div className="textWrapper">
                <h2>Categories</h2>
                <button onClick={() => navigate('/cp/add-category')}>
                    Create category
                </button>
            </div>
            <table>
                <thead>
                <tr className="first">
                    <th colSpan="5" style={{
                        border: 'none',
                    }}>
                        <button>All categories</button>
                    </th>
                </tr>
                <tr className="bgbg" style={{
                    background: '#EBEBEB'
                }}>
                    <td className="checkboxWrapper">
                        <input type="checkbox" />
                    </td>
                    <th className="imageCol">Image</th>
                    <th className="titleCol">Title</th>
                    <th className="titleCol">Status</th>
                    <th className="productsCol">Products</th>
                    <th className="actionCol">Action</th>
                </tr>
                </thead>
                <tbody>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <tr key={category.id}>
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td className="imageCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                <img
                                    className="image"
                                    src={CATEGORY_LOGO + category.imageName}
                                    alt="Category"
                                />
                            </td>
                            <td className="titleCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                {category.name}
                            </td>
                            <td className={"titleCol"}>
                                {category.isActive ? (
                                    <span className="status active"><GoDotFill className="dot" /> Active</span>
                                ) : (
                                    <span className="statusDont">
                                        <GoDotFill className="dot" /> Deactive</span>
                                )}
                            </td>
                            <td className="productsCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                {category.products ? category.products.length : 0}
                            </td>
                            <td className="actionCol">
                                <button
                                    className="deleteBtn"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2">
                            <div className="noData">
                                There are no categories.
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <ToastContainer />
        </section>
    );
}

export default AdminCategoriesMenu;
