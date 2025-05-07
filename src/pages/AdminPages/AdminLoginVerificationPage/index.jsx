import { useTranslation } from "react-i18next";
import './index.scss';
import AdminLoginVerificationForm from "../../../components/AdminComponents/AdminLoginSections/AdminLoginVerificationForm/index.jsx";
import { Helmet } from "react-helmet-async";
function AdminLoginVerificationPage() {
  const {
    t
  } = useTranslation();
  return <section id={"adminLoginVerificationPage"}>
            <Helmet>
                <title>{'Email Verification Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminLoginVerificationForm />
        </section>;
}
export default AdminLoginVerificationPage;