import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from '/src/assets/theme.png';
import image2 from '/src/assets/theme1.png';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../../constants.js';
import { useGetStoreByIdQuery } from '../../../../service/userApi.js';
import Cookies from 'js-cookie';
import { MdContentCopy } from 'react-icons/md';
import { message } from "antd";
import { FaApple } from "react-icons/fa6";
import { FaPlay, FaKeyboard, FaBatteryHalf, FaWifi, FaSearch, FaUserCircle, FaClock } from "react-icons/fa";
function AdminCustomizeStoreMenu() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    data: getStoreById
  } = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
  const store = getStoreById?.data;
  const handleCopyLink = () => {
    const link = `${BASE_URL}@${store?.name}`;
    navigator.clipboard.writeText(link).then(() => {
      message.success('Copied!');
    }).catch(err => {
      message.success(`${err}`);
    });
  };
  return <section id={'adminCustomizeStoreMenu'}>
            <h2>{t("themes")}</h2>
            <div className={'wrapper'}>
                <div className={'imageWrapper'}>
                    <div className={'box'}>
                        <div className={"cameraWrapper"}>
                            <div className={"text"}><FaApple /></div>
                            <div className={"text"}>{t("edit")}</div>
                            <div className={"text"}>{t("view")}</div>
                            <div className={"text"}>{t("history")}</div>
                            <div className={"text"}>{t("bookmarks")}</div>

                            <div className={"camera"}>
                                <div className={"focus"}></div>
                            </div>
                            <div className="text"><FaPlay /></div>
                            <div className="text"><FaKeyboard /></div>
                            <div className="text"><FaBatteryHalf /></div>
                            <div className="text"><FaWifi /></div>
                            <div className="text"><FaSearch /></div>
                            <div className="text"><FaUserCircle /></div>
                            <div className="text"><FaClock /></div>
                            <div className={"text"}>{t("09_41")}</div>
                        </div>
                        <img src={image1} alt={'background'} />
                    </div>
                    <div className={'box1'}>
                        <div className={"cameraWrapper cameraWrapper1"}>
                            <div className={"text"}>{t("sim_1")}</div>
                            <div className={"camera camera1"}>
                                <div className={"focus"}></div>
                            </div>
                            <div className={"text"}>{t("09_41")}</div>
                        </div>
                        <img src={image2} alt={'background'} />
                    </div>
                </div>
                <div className={'line'}></div>
                <div className={'bottom1'}>
                    <div className={'first'}>
                        <img src={image1} alt={'Image'} />
                        <div className={'textWrapper'}>
                            <span className={'span'}>{t("current_theme")}</span>
                            <span>{t("premio")}</span>
                        </div>
                    </div>
                    <div className={'buttonContainer'}>
                        <button onClick={() => {
            navigate('/customize-store-page');
          }}>{t("customize")}</button>
                        <button className={'gotoMarket'}>
                            <a href={`${BASE_URL}@${store?.name}`} target="_blank" rel="noopener noreferrer" style={{
              color: 'black'
            }}>{t("go_to_store")}</a>

                        </button>
                        <button className={'copy'} onClick={handleCopyLink}>
                            <MdContentCopy />
                        </button>
                    </div>
                </div>
            </div>
            <div className={'wrapper wrapper1'}>
                <h2>{t("theme_library")}</h2>
                <input placeholder={'New themes are coming soon...'} />
            </div>
        </section>;
}
export default AdminCustomizeStoreMenu;