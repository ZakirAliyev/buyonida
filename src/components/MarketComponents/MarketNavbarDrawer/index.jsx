import { useTranslation } from "react-i18next";
import './index.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { FaBars, FaChevronDown, FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa6';
import { MARKET_LOGO } from '../../../../constants.js';
import { useGetStoreByNameQuery, useGetStoreWithSectionsQuery } from '../../../service/userApi.js';
export default function MarketNavbarDrawer({
  logo,
  palet
}) {
  const {
    t
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const name = params?.marketName?.substring(1) || 'Zakir magaza';
  const {
    data: getStoreByName
  } = useGetStoreByNameQuery(name);
  const store = getStoreByName?.data;
  const marketId = store?.id;
  const {
    data: getStoreWithSections
  } = useGetStoreWithSectionsQuery(marketId, {
    skip: !marketId
  });
  const sections = getStoreWithSections?.data?.sections || [];

  // Categories and collections
  const categories = sections.filter(section => section.sectionType === 'Category').map(section => section.category).filter(Boolean);
  const collections = sections.filter(section => section.sectionType === 'Collection').map(section => section.collection).filter(Boolean);
  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
    if (!newOpen) {
      setIsCategoriesOpen(false);
      setIsCollectionsOpen(false);
    }
  };
  const toggleCategories = () => {
    setIsCategoriesOpen(prev => !prev);
    setIsCollectionsOpen(false);
  };
  const toggleCollections = () => {
    setIsCollectionsOpen(prev => !prev);
    setIsCategoriesOpen(false);
  };
  const handleNavigate = path => {
    window.scrollTo(0, 0);
    navigate(path);
    setOpen(false);
    setIsCategoriesOpen(false);
    setIsCollectionsOpen(false);
  };
  const DrawerList = <Box sx={{
    width: 350
  }} role="presentation" id="burgerMenu" style={{
    backgroundColor: palet?.[0]?.navbarBgColor || '#121212',
    color: palet?.[0]?.navbarTextColor || '#f9f9f9'
  }}>
            <div className="close-icon-wrapper" onClick={toggleDrawer(false)}>
                <RxCross2 className="close-icon" style={{
        backgroundColor: palet?.[0]?.navbarBgColor || '#121212',
        color: palet?.[0]?.navbarTextColor || '#f9f9f9'
      }} />
            </div>
            <div className="wrapper">
                <img src={logo ? MARKET_LOGO + logo : ''} alt="Logo" />
                <div className="line" style={{
        backgroundColor: palet?.[0]?.buttonBorderColor || '#ffcf00'
      }}></div>

                <div className="dropdown">
                    <div className="link dropdown-toggle" onClick={toggleCategories} style={{
          color: palet?.[0]?.navbarTextColor || '#f9f9f9'
        }}>{t("categories")}<FaChevronDown className="chevron123" />
                    </div>
                    <div className={`dropdown-menu ${isCategoriesOpen ? 'show' : ''}`} style={{
          backgroundColor: palet?.[0]?.buttonBgColor || '#090909',
          borderColor: palet?.[0]?.buttonBorderColor || '#ffffff'
        }}>
                        {categories.length > 0 ? categories.map(category => <Link key={category.id} to={`/${params?.marketName}/category/${category.id}`} className="dropdown-item" style={{
            color: palet?.[0]?.buttonTextColor || '#ffffff'
          }} onClick={() => handleNavigate(`/${params?.marketName}/category/${category.id}`)}>
                                    {category.name}
                                </Link>) : <div className="dropdown-item" style={{
            color: palet?.[0]?.buttonTextColor || '#ffffff'
          }}>{t("no_categories")}</div>}
                    </div>
                </div>

                <div className="dropdown">
                    <div className="link dropdown-toggle" onClick={toggleCollections} style={{
          color: palet?.[0]?.navbarTextColor || '#f9f9f9'
        }}>{t("collections")}<FaChevronDown className="chevron123" style={{
            color: palet?.[0]?.buttonTextColor || '#ffffff',
            zIndex: 9
          }} />
                    </div>
                    <div className={`dropdown-menu ${isCollectionsOpen ? 'show' : ''}`} style={{
          backgroundColor: palet?.[0]?.buttonBgColor || '#090909',
          borderColor: palet?.[0]?.buttonBorderColor || '#ffffff'
        }}>
                        {collections.length > 0 ? collections.map(collection => <Link key={collection.id} to={`/${params?.marketName}/collection/${collection.id}`} className="dropdown-item" style={{
            color: palet?.[0]?.buttonTextColor || '#ffffff'
          }} onClick={() => handleNavigate(`/${params?.marketName}/collection/${collection.id}`)}>
                                    {collection.title}
                                </Link>) : <div className="dropdown-item" style={{
            color: palet?.[0]?.buttonTextColor || '#ffffff'
          }}>{t("no_collections")}</div>}
                    </div>
                </div>

                <Link to={`/${params?.marketName}/about`} className="link" style={{
        color: palet?.[0]?.navbarTextColor || '#f9f9f9'
      }} onClick={() => handleNavigate(`/${params?.marketName}/about`)}>{t("about_us")}</Link>
                <div className="line" style={{
        backgroundColor: palet?.[0]?.buttonBorderColor || '#ffcf00'
      }}></div>
                <Divider style={{
        backgroundColor: palet?.[0]?.buttonBorderColor || '#ffcf00'
      }} />
            </div>
            <div className="links1">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link1">
                    <FaInstagram style={{
          color: palet?.[0]?.buttonTextColor || '#000000'
        }} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="link1">
                    <FaFacebook style={{
          color: palet?.[0]?.buttonTextColor || '#000000'
        }} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="link1">
                    <FaLinkedin style={{
          color: palet?.[0]?.buttonTextColor || '#000000'
        }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="link1">
                    <FaTwitter style={{
          color: palet?.[0]?.buttonTextColor || '#000000'
        }} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="link1">
                    <FaYoutube style={{
          color: palet?.[0]?.buttonTextColor || '#000000'
        }} />
                </a>
            </div>
        </Box>;
  return <div>
            <FaBars onClick={toggleDrawer(true)} style={{
      color: palet?.[0]?.navbarTextColor || '#f9f9f9',
      marginTop: '10px'
    }} />
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>;
}