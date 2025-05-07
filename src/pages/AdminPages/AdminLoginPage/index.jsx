import { useTranslation } from "react-i18next";
import "./index.scss";
import AdminLoginForm from "../../../components/AdminComponents/AdminLoginSections/AdminLoginForm/index.jsx";
import { Helmet } from "react-helmet-async";
function AdminLoginPage() {
  const {
    t
  } = useTranslation();
  return <section id={"adminLoginPage"}>
            <Helmet>
                <title>{'Admin Login Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminLoginForm />
        </section>;
}
export default AdminLoginPage;