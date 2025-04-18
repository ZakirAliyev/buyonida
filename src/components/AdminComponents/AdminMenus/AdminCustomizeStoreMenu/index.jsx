import './index.scss';
import image1 from '/src/assets/theme.png';
import image2 from '/src/assets/theme1.png';
import HomeNavbar from '../../../HomeSections/HomeNavbar/index.jsx';
import HomeBanner from '../../../HomeSections/HomeBanner/index.jsx';
import HomeSectOne from '../../../HomeSections/HomeSectOne/index.jsx';
import HomeSectTwo from '../../../HomeSections/HomeSectTwo/index.jsx';
import HomeSectThree from '../../../HomeSections/HomeSectThree/index.jsx';
import HomeSectFour from '../../../HomeSections/HomeSectFour/index.jsx';
import HomeMainSlogan from '../../../HomeSections/HomeMainSlogan/index.jsx';
import HomeFooter from '../../../HomeSections/HomeFooter/index.jsx';
import MarketNavbar from '../../../MarketComponents/MarketNavbar/index.jsx';
import MarketHomePage from '../../../../pages/MarketPages/MarketHomePage/index.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../../constants.js';
import { useGetStoreByIdQuery } from '../../../../service/userApi.js';
import Cookies from 'js-cookie';
import { MdContentCopy } from 'react-icons/md';

function AdminCustomizeStoreMenu() {
    const navigate = useNavigate();
    const { data: getStoreById } = useGetStoreByIdQuery(Cookies.get('chooseMarket'));
    const store = getStoreById?.data;

    const handleCopyLink = () => {
        const link = `${BASE_URL}@${store?.name}`;
        navigator.clipboard.writeText(link)
            .then(() => {
                alert('Store link copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link.');
            });
    };

    return (
        <section id={'adminCustomizeStoreMenu'}>
            <h2>Themes</h2>
            <div className={'wrapper'}>
                <div className={'imageWrapper'}>
                    <div className={'box'}>
                        <img src={image1} alt={'background'} />
                    </div>
                    <div className={'box1'}>
                        <img src={image2} alt={'background'} />
                    </div>
                </div>
                <div className={'line'}></div>
                <div className={'bottom1'}>
                    <div className={'first'}>
                        <img src={image1} alt={'Image'} />
                        <div className={'textWrapper'}>
                            <span className={'span'}>Current theme</span>
                            <span>Premio</span>
                        </div>
                    </div>
                    <div className={'buttonContainer'}>
                        <button
                            onClick={() => {
                                navigate('/customize-store-page');
                            }}
                        >
                            Customize
                        </button>
                        <button className={'gotoMarket'}>
                            <Link to={`${BASE_URL}@${store?.name}`}>Go to store</Link>
                        </button>
                        <button className={'copy'} onClick={handleCopyLink}>
                            <MdContentCopy />
                        </button>
                    </div>
                </div>
            </div>
            <div className={'wrapper wrapper1'}>
                <h2>Theme library</h2>
                <input placeholder={'New themes are coming soon...'} />
            </div>
        </section>
    );
}

export default AdminCustomizeStoreMenu;