import './index.scss';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {FaBars, FaFacebook, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx';
import {useNavigate} from 'react-router-dom';
import image1 from '/src/assets/sariLogo.png';
import {FaInstagram} from "react-icons/fa6";

export default function HomeNavbarDrawer() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigate = (path) => {
        window.scrollTo(0, 0)
        navigate(path);
        setOpen(false);
    };

    const DrawerList = (
        <>
            <div onClick={toggleDrawer(false)} className="asdasd123123">
                <RxCross2 className="asdasd123"/>
            </div>
            <Box sx={{width: 350}} role="presentation" id="burgerMenu">
                <div className="wrapper">
                    <img src={image1} alt="Logo"/>
                    <div className="line"></div>
                    <div className="name" onClick={() => handleNavigate('/')}>
                        Home page
                    </div>
                    <div className="name" onClick={() => handleNavigate('/products')}>
                        Products
                    </div>
                    <div className="name" onClick={() => handleNavigate('/portfolio')}>
                        Portfolio
                    </div>
                    <div className="name" onClick={() => handleNavigate('/about')}>
                        About us
                    </div>
                    <div className="name" onClick={() => handleNavigate('/contact')}>
                        Contact
                    </div>
                    <div className="line"></div>
                    <Divider/>
                </div>
                <div className="links1">
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaInstagram/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaFacebook/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaLinkedin/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaTwitter/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaYoutube/></div>
                </div>
            </Box>
        </>
    );

    return (
        <div>
            <FaBars onClick={toggleDrawer(true)} style={{
                color: 'white'
            }}/>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}