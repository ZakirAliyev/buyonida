import './index.scss';
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {useGetStoreWithSectionsQuery} from "../../../../service/userApi.js";

function CSMarketTitle({ title, category, collection }) {
    const navigate = useNavigate();
    const { data: getStoreWithSectionsByMarketId } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const storeWithSections = getStoreWithSectionsByMarketId?.data;
    const selectedPaletId = storeWithSections?.selectedPaletId;
    const selectedPalette = storeWithSections?.palets?.find(p => p.id === selectedPaletId);

    const titleStyles = selectedPalette
        ? {
            '--text-color': selectedPalette.textColor,
            '--button-bg-color': selectedPalette.buttonBgColor,
            '--button-text-color': selectedPalette.buttonTextColor,
            '--button-border-color': selectedPalette.buttonBorderColor,
        }
        : {};

    return (
        <div className="container">
            <section id="cSMarketTitle" style={titleStyles}>
                <h2>{title}</h2>
                <button onClick={() => {}}>
                    Find out more <HiOutlineArrowLongRight />
                </button>
            </section>
        </div>
    );
}

export default CSMarketTitle;