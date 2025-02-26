import './index.scss'
import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function NotFoundPage() {


    const [fingerprint, setFingerprint] = useState("");

    useEffect(() => {
        const loadFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerprint(result.visitorId);
            console.log("Fingerprint ID:", result.visitorId);
        };
        loadFingerprint();
    }, []);

    return (
        <section id={"notFoundPage"}>
            404 - Not Found!
            <h2>Unique User ID: {fingerprint}</h2>
        </section>
    );
}

export default NotFoundPage;