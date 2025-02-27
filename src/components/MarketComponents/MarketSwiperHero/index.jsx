import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import image1 from "/src/assets/mohtesem.jpg"

export default function MarketSwiperHero() {
    return (
        <div id={"marketSwiperHero"}>
            <Swiper className="mySwiper">
                <SwiperSlide>
                    <img src={image1} alt={"Image"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt={"Image"}/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
