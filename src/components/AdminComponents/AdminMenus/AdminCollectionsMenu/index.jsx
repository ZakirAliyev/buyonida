import './index.scss';
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDeleteCollectionMutation, useGetAllCollectionsByMarketIdQuery } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { COLLECTION_LOGO } from "../../../../../constants.js";
import { GoDotFill } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function AdminCollectionsMenu() {
    const navigate = useNavigate();
    const { data: getAllCollectionsByMarketId, refetch } = useGetAllCollectionsByMarketIdQuery(Cookies.get("chooseMarket"));
    const collections = getAllCollectionsByMarketId?.data || [];
    const [deleteCollection] = useDeleteCollectionMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const collectionsPerPage = 5;

    // Calculate pagination data
    const totalCollections = collections.length;
    const totalPages = Math.ceil(totalCollections / collectionsPerPage);
    const indexOfLastCollection = currentPage * collectionsPerPage;
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
    const currentCollections = collections.slice(indexOfFirstCollection, indexOfLastCollection);

    // Calculate the range of page numbers to display (max 5 pages)
    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    // Adjust startPage if endPage is at totalPages to ensure 5 pages are shown when possible
    if (endPage - startPage + 1 < maxPageNumbers && startPage > 1) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    // Handle page change
    const handlePageChange = (pageNumber) => {
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

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleDelete = async (id) => {
        const marketId = Cookies.get("chooseMarket");
        try {
            const response = await deleteCollection({ id, marketId }).unwrap();
            if (response?.statusCode === 200) {
                refetch();
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
                // Adjust current page if necessary
                if (currentCollections.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            }
        } catch (error) {
            toast.error('Xeta bas verdi!', {
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
                {currentCollections && currentCollections.length !== 0 ? (
                    currentCollections.map((item) => (
                        <tr key={item?.id}>
                            <td className="checkboxWrapper">
                                <input type="checkbox" />
                            </td>
                            <td>
                                <img
                                    className="image"
                                    src={item?.coverImageUrl ? COLLECTION_LOGO + item.coverImageUrl : "path/to/placeholder/image.jpg"}
                                    alt="Image"
                                    onError={(e) => (e.target.src = "path/to/placeholder/image.jpg")}
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
                                <span className={`${item?.isActive ? 'status' : 'statusDont'}`}>
                                    <GoDotFill />
                                    {item?.isActive ? 'Active' : 'Deactive'}
                                </span>
                            </td>
                            <td
                                onClick={() => {
                                    navigate(`/cp/edit-collection/${Cookies.get('chooseMarket')}/${item?.id}`);
                                }}
                            >
                                {item?.products?.length || 0}
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
            {totalCollections > collectionsPerPage && (
                <div className="pagination">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="page-btn"
                    >
                        Previous
                    </button>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`page-btn ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="page-btn"
                    >
                        Next
                    </button>
                </div>
            )}
            <ToastContainer />
        </section>
    );
}

export default AdminCollectionsMenu;