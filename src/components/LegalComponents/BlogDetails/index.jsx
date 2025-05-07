import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from '/src/assets/aboutImage.png';
import image2 from '/src/assets/qaraLogo.png';
import BlogCard from '../BlogCard/index.jsx';
import { useGetAllBlogsQuery, useGetBlogByIdQuery } from '../../../service/userApi.js';
import { BLOG_CARD_IMAGE } from '../../../../constants.js';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
function BlogDetails() {
  const {
    t
  } = useTranslation();
  const params = useParams();
  const id = params?.id;
  const {
    data: getBlogById,
    isLoading: isBlogLoading,
    isFetching: isBlogFetching
  } = useGetBlogByIdQuery(id);
  const blog = getBlogById?.data;
  const {
    data: getAllBlogs,
    isLoading: isAllBlogsLoading,
    isFetching: isAllBlogsFetching
  } = useGetAllBlogsQuery();
  const blogs = getAllBlogs?.data || [];
  const [showLoading, setShowLoading] = useState(true);

  // Calculate read time
  const calculateReadTime = content => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length; // Split by whitespace to count words
    const readTime = Math.ceil(words / 225); // 225 words per minute, round up
    return readTime;
  };
  const readTime = calculateReadTime(blog?.contentEN);

  // Randomly shuffle blogs and select first 4 (excluding current blog)
  const relatedBlogs = blogs.filter(b => b.id !== id) // Exclude current blog
  .sort(() => Math.random() - 0.5) // Random shuffle
  .slice(0, 4); // Take first 4

  // Control loading state
  useEffect(() => {
    if (isBlogLoading || isAllBlogsLoading || isBlogFetching || isAllBlogsFetching) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isBlogLoading, isAllBlogsLoading, isBlogFetching, isAllBlogsFetching]);

  // Show loading screen
  if (showLoading) {
    return <div style={{
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
      gap: '30px'
    }}>
                <img style={{
        width: '250px'
      }} src={image2} alt="Logo" />
                <PulseLoader />
            </div>;
  }
  return <section id={'blogDetails'}>
            <div className={'container6'}>
                <div className={'box'} style={{
        marginLeft: '16px',
        marginRight: '16px'
      }}>
                    <h2>{blog?.titleEN}</h2>
                    <div className={'author-info'}>
                        <img src={image1} alt="Author" className={'author-avatar'} />
                        <div>
                            <p className={'author-name'}>{t("zakir_aliyev")}</p>
                            <p className={'author-details'}>{t("published_in_buyonida_com")}{blog?.date || 'Unknown Date'}{t("")}{readTime}{t("min_read")}</p>
                        </div>
                    </div>
                    <img src={BLOG_CARD_IMAGE + (blog?.bannerImageName || blog?.cardImageName)} alt={blog?.titleEN} className={'blog-image'} />
                    <p className={'content'}>{blog?.contentEN}</p>
                </div>
                <div className={'related-blogs'}>
                    <h3>{t("more_from_blog")}</h3>
                    <div className={'row'}>
                        {relatedBlogs.length > 0 ? relatedBlogs.map(relatedBlog => <BlogCard colCount={6} key={relatedBlog.id} // Use blog ID as key
          blog={relatedBlog} />) : <p>{t("no_related_blogs_available")}</p>}
                    </div>
                </div>
            </div>
        </section>;
}
export default BlogDetails;