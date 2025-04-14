import './index.scss';
import {useRef, useState} from 'react';
import html2canvas from 'html2canvas';
import image1 from "/src/assets/static.png"

function NotFoundPage() {
    const captureRef = useRef(null);
    const [image, setImage] = useState(null);

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

    return (
        <>
            <section
                id="notFoundPage"
                ref={captureRef}
            >
                <img src={image1} alt={"Image"}/>
                404 - Not Found!
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
