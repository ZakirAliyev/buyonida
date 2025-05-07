import { useTranslation } from "react-i18next";
import './index.scss';
import AdminEmailVerificationForm from "../../../components/AdminComponents/AdminRegisterSections/AdminEmailVerificationForm/index.jsx";
import { Helmet } from "react-helmet-async";
function AdminEmailVerificationPage() {
  const {
    t
  } = useTranslation();
  return <section id={"adminEmailVerificationPage"}>
            <Helmet>
                <title>{'Email Verification Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminEmailVerificationForm />
        </section>;
}
export default AdminEmailVerificationPage;