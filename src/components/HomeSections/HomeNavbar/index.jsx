import './index.scss';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import react-scroll Link
import HomeNavbarDrawer from '../HomeNavbarDrawer/index.jsx';
import image1 from '/src/assets/sariLogo.png';

function HomeNavbar() {
    return (
        <section id={'homeNavbar'}>
            <img src={image1} alt={'Logo'} />
            <div className={'drawer'}>
                <HomeNavbarDrawer />
            </div>
            <ul>
                <ScrollLink
                    to="homeSectOne"
                    smooth={true}
                    duration={500}
                    className={'link'}
                >
                    Solutions
                </ScrollLink>
                <ScrollLink
                    to="homeSectFour"
                    smooth={true}
                    duration={500}
                    className={'link'}
                >
                    Pricing
                </ScrollLink>
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