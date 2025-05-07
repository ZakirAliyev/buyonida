import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from '/src/assets/art3.png';
function VideoCard1({
  thumbnail,
  title,
  channelTitle,
  videoId,
  onCardClick
}) {
  const {
    t
  } = useTranslation();
  return <div className={'col-4 col-md-4 col-sm-12 col-xs-12'}>
            <section id={'videoCard1'} onClick={() => onCardClick(videoId)}>
                <div className={'video-link'}>
                    <img src={thumbnail || image1} alt={'Video Thumbnail'} className={'video-thumbnail'} />
                </div>
                <div className={'video-info'}>
                    <h3 className={'video-title'}>{title}</h3>
                    <p className={'video-channel'}>{channelTitle}</p>
                </div>
            </section>
        </div>;
}
export default VideoCard1;