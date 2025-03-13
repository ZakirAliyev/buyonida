import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {BANNER_LOGO} from "../../../../../constants.js";

export default function CSMarketSwiperHero({swipers = []}) {
    const sortedSwipers = [...swipers].sort(
        (a, b) => a.displayOrderId - b.displayOrderId
    );

    return (
        <div id="cSMarketSwiperHero">
            <Swiper className="mySwiper">
                {sortedSwipers.map((swiper, index) => {
                    if (!swiper.image || swiper.image.length === 0) return null;

                    const image = swiper.image[0];
                    let imageSrc = "";
                    if (image?.originFileObj) {
                        imageSrc = URL.createObjectURL(image.originFileObj);
                    } else if (image) {
                        imageSrc = `${BANNER_LOGO}${image.name}`;
                    }

                    return (
                        <SwiperSlide key={index}>
                            <img src={imageSrc} alt="Image"/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
