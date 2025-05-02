import './index.scss';
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import image1 from "/src/assets/static.png"

function NotFoundPage() {
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [inputValues, setInputValues] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchVideoData = async () => {
        const idParams = Object.values(inputValues)
            .filter((val) => val.trim() !== '')
            .join(',');

        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idParams}&key=AIzaSyDUvi4pfuLz0FEfEb-Ty1MAsJA41thEA-E`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                setVideoData(data.items.map(item => item.snippet));
            } else {
                console.error('Video bulunamadı.');
                setVideoData(null);
            }
        } catch (error) {
            console.error('API çağrısı başarısız:', error);
        }
    };

    return (
        <>
            <section id="notFoundPage" ref={captureRef}>
                <img src={image1} alt="Image" />
                <p>404 - Not Found!</p>
                {videoData && videoData.map((video, index) => (
                    <div key={index}>
                        <h2>YouTube Video Başlığı: {video.title}</h2>
                        <p>Açıklama: {video.description}</p>
                        <img src={video.thumbnails.medium.url} alt="Video Thumbnail" />
                    </div>
                ))}
            </section>

            <div>
                <input
                    type="text"
                    name="input1"
                    placeholder="Video ID 1"
                    value={inputValues.input1}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="input2"
                    placeholder="Video ID 2"
                    value={inputValues.input2}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="input3"
                    placeholder="Video ID 3"
                    value={inputValues.input3}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="input4"
                    placeholder="Video ID 4"
                    value={inputValues.input4}
                    onChange={handleInputChange}
                />
                <button onClick={fetchVideoData}>Fetch YouTube Data</button>
            </div>

            {image && (
                <div>
                    <a href={image} download="screenshot.png">İndir</a>
                </div>
            )}

            <div>Bu githubu yoxlamaq ucundur.</div>
        </>
    );
}

export default NotFoundPage;
