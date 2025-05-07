import { useTranslation } from "react-i18next";
import './index.scss';
import AdminRegisterOptions from "../../../components/AdminComponents/AdminRegisterSections/AdminRegisterOptions/index.jsx";
import { Helmet } from "react-helmet-async";
function AdminRegisterPage() {
  const {
    t
  } = useTranslation();
  return <section id={"adminRegisterPage"}>
            <Helmet>
                <title>{'Admin Register Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminRegisterOptions />
        </section>;
}
export default AdminRegisterPage;