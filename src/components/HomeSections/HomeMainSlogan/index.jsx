import { useTranslation } from "react-i18next";
import './index.scss';
function HomeMainSlogan() {
  const {
    t
  } = useTranslation();
  const spans = Array(4).fill("Digitalize trade, cross borders!");
  return <div className={"kaplayici"}>
            <section id={"homeMainSlogan"}>
                <div className="scrolling-text">
                    {spans.map((text, index) => <span key={index}>{text}</span>)}
                    {spans.map((text, index) => <span key={index + spans.length}>{text}</span>)}
                </div>
            </section>
        </div>;
}
export default HomeMainSlogan;