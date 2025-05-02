import './index.scss';
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import image1 from "/src/assets/static.png"

function NotFoundPage() {
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [videoData, setVideoData] = useState(null); // YouTube verisi için state

    const takeScreenshot = () => {
        if (captureRef.current) {
            html2canvas(captureRef.current, {
                width: 1290,
                height: 2796,
                scale: 1,
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                setImage(imgData);
            });
        }
    };

    // YouTube API çağrısı
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await fetch(
                    'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=tg9rSiEtdgI&key=AIzaSyDUvi4pfuLz0FEfEb-Ty1MAsJA41thEA-E'
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    setVideoData(data.items[0].snippet);
                } else {
                    console.error('Video bulunamadı.');
                }
            } catch (error) {
                console.error('API çağrısı başarısız:', error);
            }
        };

        fetchVideoData();
    }, []);

    return (
        <>
            <section
                id="notFoundPage"
                ref={captureRef}
            >
                <img src={image1} alt={"Image"} />
                <p>404 - Not Found!</p>
                {videoData && (
                    <div>
                        <h2>YouTube Video Başlığı: {videoData.title}</h2>
                        <p>Açıklama: {videoData.description}</p>
                        <img src={videoData.thumbnails.medium.url} alt="Video Thumbnail" />
                    </div>
                )}
            </section>

            {image && (
                <div>
                    <a href={image} download="screenshot.png">
                        İndir
                    </a>
                </div>
            )}

            <div>Bu githubu yoxlamaq ucundur.</div>
        </>
    );
}

export default NotFoundPage;
