import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import HomeNavbarDrawer from '../HomeNavbarDrawer/index.jsx';
import image1 from '/src/assets/sariLogo.png';
import { TfiWorld } from 'react-icons/tfi';

function HomeNavbar() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to top after navigation
        }, 100); // Small delay to ensure navigation completes
    };

    const handlePricingClick = () => {
        navigate('/');
        setTimeout(() => {
            // Programmatically scroll to homeSectFour after navigation
            animateScroll.scrollTo(document.querySelector('#homeSectFour').offsetTop, {
                smooth: true,
                duration: 500,
            });
        }, 100);
    };

    return (
        <section id={'homeNavbar'}>
            <img src={image1} alt={'Logo'} onClick={() => navigate('/')} />
            <div className={'drawer'}>
                <HomeNavbarDrawer />
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
                {/* Pricing link with custom handler */}
                <span
                    className={'link'}
                    onClick={handlePricingClick}
                    style={{ cursor: 'pointer' }}
                >
                    Pricing
                </span>
                <TfiWorld className="link" />
                <svg width="1" height="19" viewBox="0 0 1 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="1" height="19" fill="#454545" />
                </svg>
                <Link to={'/login'} className={'link logInBtn'}>
                    Log in
                </Link>
                <Link to={'/register'} className={'link signUpBtn'}>
                    Sign up
                </Link>
            </ul>
        </section>
    );
}

export default HomeNavbar;