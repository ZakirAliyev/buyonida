import './index.scss'
import AdminRegisterViaEmailForm from "../../../components/AdminComponents/AdminRegisterSections/AdminRegisterViaEmailForm/index.jsx";
import {Helmet} from "react-helmet-async";

function AdminRegisterViaEmailPage() {
    return (
        <section id={"adminRegisterViaEmailPage"}>
            <Helmet>
                <title>{'Admin Register Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminRegisterViaEmailForm/>
        </section>
    );
}

export default AdminRegisterViaEmailPage;