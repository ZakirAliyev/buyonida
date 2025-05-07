import { useTranslation } from "react-i18next";
import './index.scss';
import image1 from "/src/assets/suc.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

function SuccessComponent() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const isCardPage = location.pathname === "/card-success";

    return (
        <section id="successComponent">
            <Helmet>
                <title>{isCardPage ? 'Card Registration Successful' : 'Payment Successful'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <img src={image1} alt="Success Image" />
            {isCardPage ? (
                <>
                    <h4>{t("card_registration_successful")}</h4>
                    <p>{t("your_card_has_been_successfully_registered_you_can_now_use_it_for_payments")}</p>
                    <button onClick={() => navigate('/cp/balance-payout')}>{t("continue_shopping")}</button>
                </>
            ) : (
                <>
                    <h4>{t("payment_successful")}</h4>
                    <p>{t("thank_you_for_your_purchase_we_ll_start_preparing_your_order_right_away")}</p>
                    <button onClick={() => navigate('/')}>{t("continue_shopping")}</button>
                </>
            )}
        </section>
    );
}

export default SuccessComponent;