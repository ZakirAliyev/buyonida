import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.scss";
import { useGetStoreWithSectionsQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { BANNER_LOGO } from "../../../../constants.js";
import { useNavigate } from "react-router-dom";

export default function MarketSwiperHero({ id }) {
    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(id);
    const data = getStoreWithSections?.data?.sections[0]?.bannerItems;

    const sortedBannerItems = data
        ? [...data].sort((a, b) => a.displayOrderId - b.displayOrderId)
        : [];

    const navigate = useNavigate();

    return (
        <div id="marketSwiperHero">
            <Swiper className="mySwiper">
                {sortedBannerItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className="bgImage"
                            style={{
                                background: item?.imageName
                                    ? `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BANNER_LOGO + item.imageName})`
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
                                    <button onClick={() => (window.location = item?.buttonLink)}>
                                        {item?.buttonLink === "#" ? "Shop Now" : "Shop Now"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}