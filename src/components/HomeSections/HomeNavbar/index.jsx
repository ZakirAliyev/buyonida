import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import {Link as ScrollLink, animateScroll} from 'react-scroll';
import HomeNavbarDrawer from '../HomeNavbarDrawer/index.jsx';
import image1 from '/src/assets/sariLogo.png';
import {TfiWorld} from 'react-icons/tfi';
import {useState, useEffect, useRef} from 'react';
import Cookies from 'js-cookie';
import {FiLogOut} from 'react-icons/fi';
import {useGetUserQuery} from "../../../service/userApi.js";
import {USER_LOGO} from "../../../../constants.js";

function HomeNavbar() {
    const {data: getUser} = useGetUserQuery()
    const user1 = getUser?.data;
    const navigate = useNavigate();
    const [layerOpen, setLayerOpen] = useState(false); // Profile dropdown state
    const layerRef = useRef(null);
    const token = Cookies.get('buyonidaToken'); // Check for token in cookies
    const user = {
        name: user1?.name + " " + user1?.surname || '',
        email: user1?.email || '',
    }; // Mock user data (replace with actual user data from your API)

    const handleNavigation = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top after navigation
        }, 100);
    };

    const handlePricingClick = () => {
        navigate('/');
        setTimeout(() => {
            animateScroll.scrollTo(document.querySelector('#homeSectFour').offsetTop, {
                smooth: true,
                duration: 500,
            });
        }, 100);
    };

    const handleLogOut = () => {
        // Clear all cookies
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const [name] = cookie.split('=').map(c => c.trim());
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    // Close dropdown when clicking outside
    const handleLayerClickOutside = (event) => {
        if (layerRef.current && !layerRef.current.contains(event.target)) {
            setLayerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleLayerClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleLayerClickOutside);
        };
    }, []);

    return (
        <section id={'homeNavbar'}>
            <img src={image1} alt={'Logo'} onClick={() => navigate('/')}/>
            <div className={'drawer'}>
                <HomeNavbarDrawer/>
            </div>
            <ul>
                <ScrollLink
                    smooth={true}
                    duration={500}
                    className={'link'}
                    onClick={() => handleNavigation('/blogs')}
                >
                    Blogs
                </ScrollLink>
                <ScrollLink
                    smooth={true}
                    duration={500}
                    className={'link'}
                    onClick={() => handleNavigation('/about')}
                >
                    About us
                </ScrollLink>
                <ScrollLink
                    smooth={true}
                    duration={500}
                    className={'link'}
                    onClick={() => handleNavigation('/contact')}
                >
                    Contact us
                </ScrollLink>
                <span
                    className={'link'}
                    onClick={handlePricingClick}
                    style={{cursor: 'pointer'}}
                >
                    Pricing
                </span>
                <TfiWorld className="link"/>
                <svg width="1" height="19" viewBox="0 0 1 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1" height="19" fill="#454545"/>
                </svg>
                {token ? (
                    <div className={'profileWrapper'}>
                        <div
                            className={'wrapper'}
                            onClick={() => setLayerOpen(!layerOpen)}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            <div>
                                <p style={{
                                    fontSize: '14px',
                                    textAlign: 'end'
                                }}>{user1?.name} {user1?.surname}</p>
                                <p style={{
                                    fontSize: '10px',
                                    textAlign: 'end'
                                }}>{user1?.email}</p>
                            </div>
                            <div className={'profilePhoto'}>
                                <img src={USER_LOGO + user1?.profileImageName}
                                     alt={'Profile'}/> {/* Replace with actual profile image */}
                            </div>
                        </div>
                        <div
                            className={`layer ${layerOpen ? 'open' : 'close'}`}
                            ref={layerRef}
                            aria-hidden={!layerOpen}
                        >
                            <div className={'wrapper'}>
                                <div className={'box box1'}>
                                    <span>{user.name}</span>
                                    <div className={'mail'}>{user.email}</div>
                                </div>
                                <div className={'box'} onClick={() => navigate('/choose-market')}>
                                    <span>All stores</span>
                                </div>
                                <div className={'box logOut'} onClick={handleLogOut}>
                                    <span>Log out</span>
                                    <FiLogOut style={{rotate: '180deg', fontWeight: '400'}}/>
                                </div>
                            </div>
                            <div className={'line'}></div>
                            <div className={'wrapper'}>
                                <div className={'box'}>
                                    <span>Help Center</span>
                                </div>
                                <div className={'box'} onClick={() => navigate('/tutorials')}>
                                    <span>Tutorials</span>
                                </div>
                                <div className={'box'}>
                                    <span>Get help</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to={'/login'} className={'link logInBtn'}>
                            Log in
                        </Link>
                        <Link to={'/register'} className={'link signUpBtn'}>
                            Sign up
                        </Link>
                    </>
                )}
            </ul>
        </section>
    );
}

export default HomeNavbar;