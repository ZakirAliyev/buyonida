import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import image1 from "/src/assets/mohtesem.jpg"

export default function CSMarketSwiperHero({swipers}) {

    return (
        <div id={"cSMarketSwiperHero"}>
            <Swiper className="mySwiper">
                {swipers && swipers.map((swiper, index) => (
                    <SwiperSlide key={index}>
                        <img src={image1} alt={"Image"}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
