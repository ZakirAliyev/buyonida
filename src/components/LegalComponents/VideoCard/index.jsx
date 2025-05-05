import './index.scss';
import image1 from '/src/assets/art3.png';

function VideoCard({ thumbnail, title, channelTitle, videoId, onCardClick }) {
    return (
        <div className={'col-6 col-md-6 col-sm-12 col-xs-12'}>
            <section id={'videoCard'} onClick={() => onCardClick(videoId)}>
                <div className={'video-link'}>
                    <img
                        src={thumbnail || image1}
                        alt={'Video Thumbnail'}
                        className={'video-thumbnail'}
                    />
                </div>
                <div className={'video-info'}>
                    <h3 className={'video-title'}>{title}</h3>
                    <p className={'video-channel'}>{channelTitle}</p>
                </div>
            </section>
        </div>
    );
}

export default VideoCard;