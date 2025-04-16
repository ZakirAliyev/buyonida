import "./index.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {useGetStoreWithSectionsQuery} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {BANNER_LOGO} from "../../../../constants.js";

export default function MarketSwiperHero({id}) {
    const {data:getStoreWithSections} = useGetStoreWithSectionsQuery(id)
    const data = getStoreWithSections?.data?.sections[0]?.bannerItems
    console.log(data)
    return (
        <div id={"marketSwiperHero"}>
            <Swiper className="mySwiper">
                {data && data.map((item)=>(
                    <SwiperSlide>
                        <div className={"bgImage"} style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BANNER_LOGO + item?.imageName})`}}>
                            <div className={"container"}>
                                <div className={"bannerText"}>
                                    <h2>{item?.title}</h2>
                                    <p>{item?.subtitle}</p>
                                    <button>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
