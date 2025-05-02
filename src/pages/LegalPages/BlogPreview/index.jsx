import './index.scss';

function BlogPreview({ blog }) {
    return (
        <div className={"preview-card"}>
            <img src={blog.image} alt={blog.title} />
            <div className={"preview-content"}>
                <h4>{blog.title}</h4>
                <p>{blog.subtitle}</p>
                <div className={"preview-details"}>
                    <span>{blog.date}</span>
                    <div>
                        <span>👀 {blog.views}</span>
                        <span>❤️ {blog.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogPreview;