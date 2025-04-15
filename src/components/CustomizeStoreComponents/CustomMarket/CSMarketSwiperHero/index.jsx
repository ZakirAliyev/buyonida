import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BANNER_LOGO } from "../../../../../constants.js";
import Cookies from "js-cookie";
import {useGetStoreWithSectionsQuery} from "../../../../service/userApi.js";

export default function CSMarketSwiperHero({ swipers = [] }) {
    const { data: getStoreWithSectionsByMarketId } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const storeWithSections = getStoreWithSectionsByMarketId?.data;
    const selectedPaletId = storeWithSections?.selectedPaletId;
    const selectedPalette = storeWithSections?.palets?.find(p => p.id === selectedPaletId);

    const swiperStyles = selectedPalette
        ? {
            '--background-color': selectedPalette.cardBgColor, // Assuming cardBgColor for background
        }
        : {};

    const sortedSwipers = [...swipers].sort(
        (a, b) => a.displayOrderId - b.displayOrderId
    );

    return (
        <div id="cSMarketSwiperHero" style={swiperStyles}>
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
                            <img src={imageSrc} alt="Image" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}