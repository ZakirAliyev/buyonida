import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import ScrollToTop from "../../components/ScrollToTop/index.jsx";
function AdminMain() {
  const {
    t
  } = useTranslation();
  return <>
            <ScrollToTop />
            <Outlet />
        </>;
}
export default AdminMain;