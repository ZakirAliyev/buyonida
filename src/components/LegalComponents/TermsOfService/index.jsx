import { useTranslation } from "react-i18next";
import './index.scss';
import { useEffect, useState } from "react";
function TermsOfService() {
  const {
    t
  } = useTranslation();
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content h2[id]');
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
          // 120: offset ayarı
          currentSection = section.getAttribute('id');
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <section id="termsOfService">
            <div className="privacyBanner">
                <div style={{
        color: '#dcdcdc',
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '15px'
      }}>{t("updated_may_1_2025")}</div>{t("terms_of_service")}<div style={{
        color: '#999999',
        fontSize: '18px',
        fontWeight: '400',
        marginTop: '15px'
      }}>{t("buyonida_terms_of_service")}</div>
            </div>
            <div className="container5">
                <div className="row">
                    <div className="col-3">
                        <div className="sidebar">
                            <h3 className="sidebar-title">{t("table_of_contents")}</h3>
                            <ul className="sidebar-nav">
                                <li><a href="#section1" className={activeSection === 'section1' ? 'active' : ''}>{t("1_account_terms")}</a></li>
                                <li><a href="#section2" className={activeSection === 'section2' ? 'active' : ''}>{t("2_account_activation")}</a></li>
                                <li><a href="#section3" className={activeSection === 'section3' ? 'active' : ''}>{t("3_buyonida_rights")}</a></li>
                                <li><a href="#section4" className={activeSection === 'section4' ? 'active' : ''}>{t("4_your_responsibilities")}</a></li>
                                <li><a href="#section5" className={activeSection === 'section5' ? 'active' : ''}>{t("5_payment_terms")}</a></li>
                                <li><a href="#section6" className={activeSection === 'section6' ? 'active' : ''}>{t("6_intellectual_property")}</a></li>
                                <li><a href="#section7" className={activeSection === 'section7' ? 'active' : ''}>{t("7_termination_of_service")}</a></li>
                                <li><a href="#section8" className={activeSection === 'section8' ? 'active' : ''}>{t("8_liability_indemnification")}</a></li>
                                <li><a href="#section9" className={activeSection === 'section9' ? 'active' : ''}>{t("9_general_terms")}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            <h2 id="section1">{t("1_account_terms")}</h2>
                            <p>{t("to_use_buyonida_services_you_must_create_a_user_account_account_you_must_provide_your_full_legal_name_business_address_phone_number_valid_email_address_and_other_required_information_to_complete_registration_buyonida_may_reject_your_registration_or_cancel_an_existing_account_at_its_sole_discretion")}</p>
                            <p>{t("you_must_meet_one_of_the_following_to_use_the_services")}</p>
                            <ul>
                                <li>{t("be_at_least_18_years_old")}</li>
                                <li>{t("if_between_13_18_you_may_only_use_the_services_under_parental_or_legal_guardian_supervision_and_acceptance_of_terms")}</li>
                                <li>{t("if_your_country_s_age_of_majority_is_higher_than_18_you_must_meet_that_age")}</li>
                            </ul>
                            <p>{t("you_confirm_that_you_use_buyonida_services_solely_for_commercial_purposes_not_personal_or_household_use")}</p>
                            <p>{t("buyonida_will_use_your_registered_email_for_primary_communication_you_must_keep_it_up_to_date_and_functional")}</p>
                            <p>{t("you_are_responsible_for_keeping_your_password_secure_buyonida_is_not_liable_for_any_loss_from_your_negligence_in_this_area_you_are_solely_responsible_for_all_activity_and_content_shared_through_your_account")}</p>
                            <p>{t("violation_of_the_terms_or_acceptable_use_policy_may_result_in_immediate_suspension_of_services")}</p>

                            <h2 id="section2">{t("2_account_activation")}</h2>
                            <h3>{t("2_1_store_owner")}</h3>
                            <p>{t("the_individual_registering_for_the_services_store_owner_is_the_party_to_this_agreement_if_you_register_on_behalf_of_your_employer_that_legal_entity_is_considered_the_store_owner")}</p>
                            <p>{t("you_confirm_you_have_the_authority_to_bind_the_employer_to_these_terms_if_enrolled_in_buyonida_payments_a_google_pay_account_may_be_created_on_your_behalf")}</p>
                            <h3>{t("2_2_employee_accounts")}</h3>
                            <p>{t("depending_on_your_plan_you_may_create_employee_accounts_with_restricted_access_the_store_owner_defines_access_levels_and_is_responsible_for_all_actions_of_such_users")}</p>
                            <h3>{t("2_3_domain_names")}</h3>
                            <p>{t("domains_registered_through_buyonida_will_auto_renew_annually_you_are_responsible_for_disabling_auto_renewal_if_desired")}</p>

                            <h2 id="section3">{t("3_buyonida_rights")}</h2>
                            <p>{t("buyonida_may_offer_services_to_competitors_and_provides_no_exclusivity_in_any_market_segment_employees_and_contractors_may_also_be_users_or_sellers_and_may_compete_without_using_your_confidential_data")}</p>
                            <p>{t("in_case_of_ownership_disputes_buyonida_may_request")}</p>
                            <ul>
                                <li>{t("business_license")}</li>
                                <li>{t("identity_document")}</li>
                                <li>{t("last_4_digits_of_a_credit_card")}</li>
                                <li>{t("proof_of_employment_status")}</li>
                            </ul>
                            <p>{t("buyonida_reserves_the_right_to_determine_and_assign_account_ownership_accounts_may_be_suspended_during_disputes")}</p>
                            <p>{t("buyonida_may_modify_suspend_or_refuse_service_at_any_time")}</p>

                            <h2 id="section4">{t("4_your_responsibilities")}</h2>
                            <p>{t("you_must_comply_with_buyonida_s_acceptable_use_policy_and_all_applicable_laws")}</p>
                            <p>{t("commercial_use_of_any_service_part_without_written_permission_is_prohibited")}</p>
                            <p>{t("you_may_not_advertise_using_buyonida_trademarks_or_similar_domains_keywords")}</p>
                            <p>{t("your_materials_excluding_credit_card_data_may_be_transmitted_unencrypted_and_adapted_technically_credit_card_data_is_always_encrypted")}</p>

                            <h2 id="section5">{t("5_payment_terms")}</h2>
                            <p>{t("you_agree_to_pay_all_subscription_transaction_and_additional_fees_apps_domains_third_party_services_etc")}</p>
                            <p>{t("you_must_provide_and_maintain_a_valid_payment_method_charges_will_continue_until_services_are_cancelled")}</p>
                            <p>{t("if_payment_fails_buyonida_will_try_3_times_every_3_days_after_failed_attempts_your_account_may_be_suspended")}</p>

                            <h2 id="section6">{t("6_intellectual_property")}</h2>
                            <h3>{t("6_1_your_materials")}</h3>
                            <p>{t("buyonida_claims_no_ownership_over_your_materials_however_you_grant_a_non_exclusive_royalty_free_global_license_for_service_operation_and_improvement")}</p>
                            <h3>{t("6_2_buyonida_ip")}</h3>
                            <p>{t("buyonida_s_software_designs_and_content_are_protected_by_intellectual_property_rights_use_of_brand_elements_requires_written_permission")}</p>

                            <h2 id="section7">{t("7_termination_of_service")}</h2>
                            <p>{t("you_may_cancel_your_account_at_any_time_buyonida_may_suspend_or_terminate_without_notice_in_the_following_cases")}</p>
                            <ul>
                                <li>{t("terms_or_policy_violations")}</li>
                                <li>{t("non_payment")}</li>
                                <li>{t("legal_risks")}</li>
                                <li>{t("legal_requests")}</li>
                            </ul>
                            <p>{t("all_dues_become_payable_immediately_after_termination_account_data_is_retained_for_2_years")}</p>

                            <h2 id="section8">{t("8_liability_indemnification")}</h2>
                            <p>{t("buyonida_is_not_liable_for_indirect_incidental_or_special_damages_you_agree_to_indemnify_buyonida_for")}</p>
                            <ul>
                                <li>{t("use_of_services")}</li>
                                <li>{t("breach_of_terms")}</li>
                                <li>{t("use_of_materials")}</li>
                                <li>{t("violation_of_third_party_rights")}</li>
                            </ul>

                            <h2 id="section9">{t("9_general_terms")}</h2>
                            <p>{t("in_case_of_conflict_between_versions_the_english_version_prevails")}</p>
                            <p>{t("buyonida_may_transfer_these_terms_without_notice_you_may_do_so_only_with_written_consent")}</p>
                            <p>{t("legal_notices")}</p>
                            <ul>
                                <li><strong>{t("email")}</strong>{t("")}<a href="mailto:info@buyonida.com">{t("info_buyonida_com")}</a></li>
                                <li><strong>{t("mailing_address")}</strong>{t("buyonida_mmc_60_ashiq_molla_juma_st_baku_azerbaijan")}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
}
export default TermsOfService;