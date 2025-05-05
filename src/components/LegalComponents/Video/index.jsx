import './index.scss';
import { useState, useEffect } from 'react';
import { useGetAllTutorialsQuery } from '../../../service/userApi.js';
import image2 from '/src/assets/qaraLogo.png';
import image3 from '/src/assets/kilit.png';
import image4 from '/src/assets/analytics.png';
import PulseLoader from 'react-spinners/PulseLoader';
import VideoCard from '../VideoCard/index.jsx';
import VideoCard1 from '../VideoCard1/index.jsx';

function Video() {
    const { data: getAllTutorials, isLoading: isAllBlogsLoading } = useGetAllTutorialsQuery();
    const blogData = getAllTutorials?.data || [];
    const isBlogLoading = isAllBlogsLoading;

    // State for YouTube API data and modal
    const [youtubeData, setYoutubeData] = useState(null);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5; // Exactly 5 videos per page
    const totalPages = Math.ceil(blogData.length / blogsPerPage) || 1;

    // Calculate the blogs to display on the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);

    // Fetch YouTube data
    useEffect(() => {
        if (blogData.length > 0) {
            const videoIds = blogData.map((tutorial) => tutorial.youtubeVideoId).join(',');
            const apiKey = 'AIzaSyDUvi4pfuLz0FEfEb-Ty1MAsJA41thEA-E'; // Replace with your actual YouTube API key
            const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${apiKey}`;

            fetch(youtubeApiUrl)
                .then((response) => response.json())
                .then((data) => {
                    setYoutubeData(data);
                })
                .catch((error) => {
                    console.error('Error fetching YouTube data:', error);
                });
        }
    }, [blogData]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 0);
        }
    };

    // Generate page numbers for display
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

    // Function to get the highest quality thumbnail
    const getHighestQualityThumbnail = (thumbnails) => {
        if (!thumbnails) return image2;
        return (
            thumbnails.maxres?.url ||
            thumbnails.high?.url ||
            thumbnails.medium?.url ||
            thumbnails.default?.url ||
            image2
        );
    };

    const openModal = (videoId) => {
        setSelectedVideoId(videoId);
    };

    const closeModal = () => {
        setSelectedVideoId(null);
    };

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
                        alt={'Analytics Icon'}
                        style={{
                            marginTop: '50px',
                        }}
                        className={'zakiraliyev'}
                    />
                    <h2>Tutorials</h2>
                    <img
                        src={image3}
                        alt={'Lock Icon'}
                        style={{
                            marginBottom: '50px',
                        }}
                        className={'zakiraliyev'}
                    />
                </div>
            </div>
            <div className={'container'}>
                {/* First Row: Up to 2 larger cards */}
                <div className={'row'}>
                    {currentBlogs.slice(0, 2).map((tutorial) => {
                        const video = youtubeData?.items?.find((item) => item.id === tutorial.youtubeVideoId);
                        return (
                            <VideoCard
                                key={tutorial.id}
                                thumbnail={getHighestQualityThumbnail(video?.snippet?.thumbnails)}
                                title={video?.snippet?.title || 'Loading...'}
                                channelTitle={video?.snippet?.channelTitle || 'Unknown Channel'}
                                videoId={tutorial.youtubeVideoId}
                                onCardClick={openModal}
                            />
                        );
                    })}
                </div>
                {/* Second Row: Up to 3 smaller cards */}
                <div className={'row'}>
                    {currentBlogs.slice(2, 5).map((tutorial) => {
                        const video = youtubeData?.items?.find((item) => item.id === tutorial.youtubeVideoId);
                        return (
                            <VideoCard1
                                key={tutorial.id}
                                thumbnail={getHighestQualityThumbnail(video?.snippet?.thumbnails)}
                                title={video?.snippet?.title || 'Loading...'}
                                channelTitle={video?.snippet?.channelTitle || 'Unknown Channel'}
                                videoId={tutorial.youtubeVideoId}
                                onCardClick={openModal}
                            />
                        );
                    })}
                </div>
                <div className={'pagination'}>
                    <button
                        className={'pagination-btn'}
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Before
                    </button>
                    <div className={'page-numbers'}>
                        {pageNumbers.map((number) => (
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
                        Next
                    </button>
                </div>
            </div>

            {selectedVideoId && (
                <div className={'modal'}>
                    <div className={'modal-content'}>
                        <button className={'modal-close'} onClick={closeModal}>
                            X
                        </button>
                        <iframe
                            title="YouTube Video"
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Video;