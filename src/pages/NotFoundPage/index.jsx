import { useEffect, useState } from "react";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from "axios";

const getFingerprint = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    return result.visitorId; // FingerprintJS tarafından oluşturulan kimlik
};

const getUserIP = async () => {
    try {
        const response = await axios.get("https://api64.ipify.org?format=json"); // Kullanıcının IP adresini al
        return response.data.ip;
    } catch (error) {
        console.error("IP fetch error:", error);
        return "unknown-ip"; // Eğer hata alırsak varsayılan bir değer döndür
    }
};

const NotFoundPage = () => {
    const [fingerprint, setFingerprint] = useState("");
    const [ip, setIp] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            let storedFingerprint = localStorage.getItem("user_fingerprint");
            let storedIP = localStorage.getItem("user_ip");

            if (!storedFingerprint || !storedIP) {
                const fp = await getFingerprint();
                const ipAddress = await getUserIP();

                const uniqueUserID = `${fp}-${ipAddress}`; // Benzersiz ID oluştur

                localStorage.setItem("user_fingerprint", fp);
                localStorage.setItem("user_ip", ipAddress);

                setFingerprint(fp);
                setIp(ipAddress);
            } else {
                setFingerprint(storedFingerprint);
                setIp(storedIP);
            }
        };

        loadUserData();
    }, []);

    return (
        <section id="notFoundPage">
            <h1>404 - Not Found!</h1>
            <h2>Unique User ID: {fingerprint}-{ip}</h2>
        </section>
    );
};

export default NotFoundPage;
