import './index.scss';
import { useNavigate } from 'react-router-dom';
import { BLOG_CARD_IMAGE } from '../../../../constants.js';

function BlogCard({ colCount, blog }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/blogs/${blog?.id}`);
    };

    return (
        <div className={`col-${colCount} col-md-${colCount} col-sm-6 col-xs-6`}>
            <section id="blogCard" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <img src={BLOG_CARD_IMAGE + blog?.cardImageName} alt={blog?.titleEN} />
                <div className="start">{blog?.titleEN}</div>
                <div className="middle">{blog?.subTitleEN}</div>
                <div className="end">{'Mar 27, 2025'}</div>
            </section>
        </div>
    );
}

export default BlogCard;