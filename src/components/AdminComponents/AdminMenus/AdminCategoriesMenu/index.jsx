import { useTranslation } from "react-i18next";
import './index.scss';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation, useGetAllCategoriesByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { CATEGORY_LOGO } from "../../../../../constants.js";
import { GoDotFill } from "react-icons/go";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
function AdminCategoriesMenu() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const marketId = Cookies.get("chooseMarket");

  // Bileşen her mount olduğunda veriler yeniden çekilsin.
  const {
    data: getAllCategories,
    refetch
  } = useGetAllCategoriesByMarketIdQuery(marketId, {
    refetchOnMountOrArgChange: true
  });
  const categories = getAllCategories?.data || [];
  const [loading, setLoading] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  // Calculate pagination data
  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Calculate the range of page numbers to display (max 5 pages)
  const maxPageNumbers = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  // Adjust startPage if endPage is at totalPages to ensure 5 pages are shown when possible
  if (endPage - startPage + 1 < maxPageNumbers && startPage > 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }
  const pageNumbers = Array.from({
    length: endPage - startPage + 1
  }, (_, index) => startPage + index);

  // Handle page change
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // Handle Previous and Next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleDelete = async id => {
    try {
      setLoading(true);
      const marketId = Cookies.get("chooseMarket");
      const response = await deleteCategory({
        marketId,
        id
      }).unwrap();
      if (response.statusCode === 200) {
        refetch();
        toast.success("Silindi!", {
          position: "bottom-right",
          autoClose: 2500,
          theme: "dark"
        });
        // Adjust current page if necessary
        if (currentCategories.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
      setLoading(false);
    } catch (e) {
      toast.error("Error", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      setLoading(false);
    }
  };
  return <section id="adminCategoriesMenu">
            <div className="textWrapper">
                <h2>{t("categories")}</h2>
                <button onClick={() => navigate('/cp/add-category')}>{t("create_category")}</button>
            </div>
            <table>
                <thead>
                <tr className="first">
                    <th colSpan="5" style={{
            border: 'none'
          }}>
                        <button>{t("all_categories")}</button>
                    </th>
                </tr>
                <tr className="bgbg" style={{
          background: '#EBEBEB'
        }}>
                    <td className="checkboxWrapper">
                        <input type="checkbox" />
                    </td>
                    <th className="imageCol">{t("image")}</th>
                    <th className="titleCol">{t("title")}</th>
                    <th className="titleCol">{t("status")}</th>
                    <th className="productsCol">{t("products")}</th>
                    <th className="actionCol">{t("action")}</th>
                </tr>
                </thead>
                <tbody>
                {currentCategories.length > 0 ? currentCategories.map(category => <tr key={category.id}>
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td className="imageCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                <img className="image" src={CATEGORY_LOGO + category.imageName} alt="Category" />
                            </td>
                            <td className="titleCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                {category.name}
                            </td>
                            <td className={"titleCol div"}>
                                {category.isActive ? <span className="status active"><GoDotFill className="dot" />{t("active")}</span> : <span className="statusDont">
                                        <GoDotFill className="dot" />{t("deactive")}</span>}
                            </td>
                            <td className="productsCol" onClick={() => navigate(`/cp/edit-category/${marketId}/${category.id}`)}>
                                {category.products ? category.products.length : 0}
                            </td>
                            <td className="actionCol">
                                <button className="deleteBtn" onClick={() => handleDelete(category.id)} disabled={loading}>{t("delete")}</button>
                            </td>
                        </tr>) : <tr>
                        <td colSpan="6">
                            <div className="noData">{t("there_are_no_categories")}</div>
                        </td>
                    </tr>}
                </tbody>
            </table>
            {totalCategories > categoriesPerPage && <div className="pagination">
                    <button onClick={handlePrevious} disabled={currentPage === 1} className="page-btn">{t("previous")}</button>
                    {pageNumbers.map(page => <button key={page} onClick={() => handlePageChange(page)} className={`page-btn ${currentPage === page ? 'active' : ''}`}>
                            {page}
                        </button>)}
                    <button onClick={handleNext} disabled={currentPage === totalPages} className="page-btn">{t("next")}</button>
                </div>}
            <ToastContainer />
        </section>;
}
export default AdminCategoriesMenu;