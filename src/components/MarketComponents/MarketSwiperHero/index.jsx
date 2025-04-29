import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.scss";
import { useGetStoreWithSectionsQuery } from "../../../service/userApi.js";
import { useNavigate } from "react-router-dom";
import { BANNER_LOGO } from "../../../../constants.js";

// Debounce utility function
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default function MarketSwiperHero({ id }) {
    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(id);
    const data = getStoreWithSections?.data?.sections[0]?.bannerItems;

    const sortedBannerItems = data
        ? [...data].sort((a, b) => a.displayOrderId - b.displayOrderId)
        : [];

    const navigate = useNavigate();

    // State to hold navbar height
    const [navHeight, setNavHeight] = useState(0);

    // Function to measure navbar height
    const measureNavHeight = () => {
        const navbarEl = document.getElementById("marketNavbar");
        if (navbarEl) {
            const height = navbarEl.offsetHeight;
            setNavHeight(height);
            return true;
        } else {
            console.warn("#marketNavbar element not found in DOM");
            return false;
        }
    };

    // Debounced version of measureNavHeight for resize events
    const debouncedMeasureNavHeight = debounce(measureNavHeight, 200);

    useEffect(() => {
        // Initial measurement
        let intervalId;
        const attemptMeasurement = () => {
            const found = measureNavHeight();
            if (found) {
                clearInterval(intervalId); // Stop retrying once found
            }
        };

        // Try immediately on mount
        if (!measureNavHeight()) {
            // If not found, retry every 100ms for up to 5 seconds
            intervalId = setInterval(attemptMeasurement, 100);
            setTimeout(() => {
                clearInterval(intervalId);
                if (navHeight === 0) {
                    console.warn("Failed to find #marketNavbar after 5 seconds, using fallback height");
                }
            }, 5000);
        }

        // Add resize event listener to update height dynamically
        window.addEventListener("resize", debouncedMeasureNavHeight);

        // Cleanup
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", debouncedMeasureNavHeight);
        };
    }, [navHeight, debouncedMeasureNavHeight]);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    height: navHeight,
                }}
            />

            <div id="marketSwiperHero">
                <Swiper className="mySwiper">
                    {sortedBannerItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="bgImage"
                                style={{
                                    background: item?.imageName
                                        ? `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${BANNER_LOGO + item.imageName})`
                                        : "none",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundColor: item?.imageName ? "transparent" : "#d4a017",
                                }}
                            >
                                <div className="container">
                                    <div className="bannerText">
                                        <h2>{item?.title}</h2>
                                        <p>{item?.subtitle}</p>
                                        <button onClick={() => window.location.assign(item?.buttonLink)}>
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}