import { useTranslation } from "react-i18next";
import './index.scss';
import { Helmet } from "react-helmet-async";
function NotFoundPage() {
  const {
    t
  } = useTranslation();
  return <>
            <Helmet>
                <title>{'Not Found 404!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>{t("not_found")}</>;
}
export default NotFoundPage;