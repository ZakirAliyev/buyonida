import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {useGetStoreWithSectionsQuery} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {BANNER_LOGO} from "../../../../constants.js";

export default function MarketSwiperHero() {
    const id = Cookies.get("chooseMarket")
    console.log(id)
    const {data:getStoreWithSections} = useGetStoreWithSectionsQuery(id)
    const data = getStoreWithSections?.data.sections[0].bannerItems
    console.log(data)

    return (
        <div id={"marketSwiperHero"}>
            <Swiper className="mySwiper">
                {data && data.map((item)=>(
                    <SwiperSlide>
                        <img src={BANNER_LOGO + item.imageName} alt={"Image"}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
