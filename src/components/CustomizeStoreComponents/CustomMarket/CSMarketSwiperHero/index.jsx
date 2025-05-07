import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.scss";
import { BANNER_LOGO } from "../../../../../constants.js";
import Cookies from "js-cookie";
import { useGetStoreWithSectionsQuery } from "../../../../service/userApi.js";
import { Link } from "react-router-dom";
export default function CSMarketSwiperHero({
  swipers = []
}) {
  const {
    t
  } = useTranslation();
  const {
    data: getStoreWithSectionsByMarketId
  } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
  const storeWithSections = getStoreWithSectionsByMarketId?.data;
  const selectedPaletId = storeWithSections?.selectedPaletId;
  const selectedPalette = storeWithSections?.palets?.find(p => p.id === selectedPaletId);
  const swiperStyles = selectedPalette ? {
    "--background-color": selectedPalette.cardBgColor
  } : {};
  const [previewSwipers, setPreviewSwipers] = useState(swipers);
  useEffect(() => {
    setPreviewSwipers(swipers);
  }, [swipers]);
  const sortedSwipers = [...previewSwipers].sort((a, b) => a.displayOrderId - b.displayOrderId);
  return <div id="cSMarketSwiperHero" style={swiperStyles}>
            <Swiper className="mySwiper" style={{
      height: "60vh"
    }}>
                {sortedSwipers.map((swiper, index) => {
        if (!swiper.image || swiper.image.length === 0) return null;
        const image = swiper.image[0];
        let imageSrc = "";
        if (image?.originFileObj) {
          imageSrc = URL.createObjectURL(image.originFileObj);
        } else if (image) {
          imageSrc = `${BANNER_LOGO}${image.name}`;
        }
        return <SwiperSlide key={index} className="swiper-slide-with-overlay">
                            <div className="banner-content" style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
                                <div className="overlay"></div>
                                <div className={"tutle"}>{swiper?.title}</div>
                                <div className={"tutle1"}>{swiper?.subTitle}</div>
                                <Link to={``} className={"linkm"}>{t("shop_now")}</Link>
                            </div>
                        </SwiperSlide>;
      })}
            </Swiper>
        </div>;
}