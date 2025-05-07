import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTop = () => {
  const {
    t
  } = useTranslation();
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
export default ScrollToTop;