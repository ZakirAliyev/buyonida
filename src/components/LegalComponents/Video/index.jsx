import './index.scss';
import { useState } from 'react';
import { useGetAllTutorialsQuery } from '../../../service/userApi.js';
import image2 from '/src/assets/qaraLogo.png';
import image3 from '/src/assets/kilit.png';
import image4 from '/src/assets/analytics.png';
import PulseLoader from 'react-spinners/PulseLoader';
import VideoCard from '../VideoCard/index.jsx';
import VideoCard1 from '../VideoCard1/index.jsx';

function Video() {
    const { data: getAllTutorials, isLoading: isAllBlogsLoading } = useGetAllTutorialsQuery();
    const blogData = getAllTutorials?.data;
    const isBlogLoading = isAllBlogsLoading;

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;
    const totalPages = Math.ceil(blogData?.length / blogsPerPage);

    // Calculate the blogs to display on the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogData?.slice(indexOfFirstBlog, indexOfLastBlog);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle previous page
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle next page
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Generate page numbers for display (limited to 10)
    const pageNumbers = [];
    const maxPagesToShow = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (isBlogLoading || isAllBlogsLoading) {
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#333',
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                <img
                    style={{
                        width: '250px',
                    }}
                    src={image2}
                    alt={'Logo'}
                />
                <PulseLoader />
            </div>
        );
    }

    return (
        <section id={'video'}>
            <div className={'blogsBanner'}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '400px',
                    }}
                >
                    <img
                        src={image4}
                        alt={'Image'}
                        style={{
                            marginTop: '50px',
                        }}
                        className={'zakiraliyev'}
                    />
                    Tutorials
                    <img
                        src={image3}
                        alt={'Image'}
                        style={{
                            marginBottom: '50px',
                        }}
                        className={'zakiraliyev'}
                    />
                </div>
            </div>
            <div className={'container'}>
                {/* Display the IDs from blogData */}
                <div className={'tutorial-ids'}>
                    {currentBlogs?.map((tutorial) => (
                        <div key={tutorial.id} className={'tutorial-id'}>
                            Tutorial ID: {tutorial.id}
                        </div>
                    ))}
                </div>
                <div className={'row'}>
                    <VideoCard />
                    <VideoCard />
                </div>
                <div className={'row'}>
                    <VideoCard1 />
                    <VideoCard1 />
                    <VideoCard1 />
                </div>
                <div className={'pagination'}>
                    <button
                        className={'pagination-btn'}
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        &lt; Before
                    </button>
                    <div className={'page-numbers'}>
                        {pageNumbers?.map((number) => (
                            <button
                                key={number}
                                className={`page-number ${currentPage === number ? 'active' : ''}`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                    <button
                        className={'pagination-btn'}
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Video;