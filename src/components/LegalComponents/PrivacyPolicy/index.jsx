import { useTranslation } from "react-i18next";
import './index.scss';
import { useEffect, useState } from "react";
function PrivacyPolicy() {
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
  return <section id="privacyPolicy">
            <div className="privacyBanner">
                <div style={{
        color: '#dcdcdc',
        fontSize: '18px',
        fontWeight: '700',
        marginBottom: '15px'
      }}>{t("updated_may_1_2025")}</div>{t("privacy_policy")}<div style={{
        color: '#999999',
        fontSize: '18px',
        fontWeight: '400',
        marginTop: '15px'
      }}>{t("how_buyonida_handles_your_data")}</div>
            </div>
            <div className="container5">
                <div className="row" style={{
        marginBottom: '50px'
      }}>
                    <div className="col-3">
                        <div className="sidebar">
                            <h3 className="sidebar-title">{t("table_of_contents")}</h3>
                            <ul className="sidebar-nav">
                                <li><a href="#section1" className={activeSection === 'section1' ? 'active' : ''}>{t("1_personal_data_we_collect")}</a></li>
                                <li><a href="#section2" className={activeSection === 'section2' ? 'active' : ''}>{t("2_how_we_use_personal_data")}</a></li>
                                <li><a href="#section3" className={activeSection === 'section3' ? 'active' : ''}>{t("3_sharing_of_personal_data")}</a></li>
                                <li><a href="#section4" className={activeSection === 'section4' ? 'active' : ''}>{t("4_your_privacy_rights_and_choices")}</a></li>
                                <li><a href="#section5" className={activeSection === 'section5' ? 'active' : ''}>{t("5_data_retention")}</a></li>
                                <li><a href="#section6" className={activeSection === 'section6' ? 'active' : ''}>{t("6_children_s_privacy")}</a></li>
                                <li><a href="#section7" className={activeSection === 'section7' ? 'active' : ''}>{t("7_security")}</a></li>
                                <li><a href="#section9" className={activeSection === 'section9' ? 'active' : ''}>{t("8_updates_to_this_privacy_policy")}</a></li>
                                <li><a href="#section10" className={activeSection === 'section10' ? 'active' : ''}>{t("9_contact_us")}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            <h2 id="section1">{t("1_personal_data_we_collect")}</h2>
                            <p>{t("we_collect_information_about_you_in_three_main_ways_information_you_provide_information_collected_automatically_and_information_obtained_from_other_sources")}</p>
                            <h3>{t("information_you_provide")}</h3>
                            <p>{t("when_you_register_with_buyonida_use_our_services_or_contact_us_you_may_provide_the_following_personal_data")}</p>
                            <ul>
                                <li><strong>{t("contact_information")}</strong>{t("name_email_address_phone_number_shipping_and_billing_addresses")}</li>
                                <li><strong>{t("account_information")}</strong>{t("username_password_and_other_account_related_details")}</li>
                                <li><strong>{t("payment_information")}</strong>{t("credit_card_details_bank_account_information_or_other_payment_methods_used_for_transactions")}</li>
                                <li><strong>{t("business_information")}</strong>{t("store_name_business_type_tax_identification_numbers_and_other_details_about_your_business")}</li>
                                <li><strong>{t("content")}</strong>{t("information_you_upload_or_provide_such_as_product_descriptions_customer_data_and_communications_with_buyonida_support")}</li>
                            </ul>
                            <h3>{t("automatically_collected_information")}</h3>
                            <p>{t("when_you_use_our_services_we_automatically_collect_certain_data_including")}</p>
                            <ul>
                                <li><strong>{t("device_and_usage_data")}</strong>{t("ip_address_browser_type_operating_system_device_identifiers_pages_visited_links_clicked_and_time_spent_on_our_platform")}</li>
                                <li><strong>{t("location_data")}</strong>{t("approximate_location_based_on_ip_address_or_other_geographic_data")}</li>
                            </ul>
                            <h3>{t("information_from_other_sources")}</h3>
                            <p>{t("we_may_receive_information_about_you_from_third_parties_such_as")}</p>
                            <ul>
                                <li><strong>{t("partners")}</strong>{t("payment_processors_app_developers_or_marketing_partners_providing_data_to_improve_our_services")}</li>
                                <li><strong>{t("public_sources")}</strong>{t("publicly_available_data_such_as_government_records_or_social_media")}</li>
                                <li><strong>{t("other_users")}</strong>{t("information_submitted_by_other_users_interacting_with_your_store_such_as_customer_reviews_or_inquiries")}</li>
                            </ul>

                            <h2 id="section2">{t("2_how_we_use_personal_data")}</h2>
                            <p>{t("we_use_your_personal_data_to_provide_maintain_and_improve_our_services_and_to_comply_with_legal_obligations_main_purposes_include")}</p>
                            <ul>
                                <li><strong>{t("service_delivery")}</strong>{t("to_process_transactions_manage_your_account_provide_customer_support_fulfill_orders_and_enable_store_management")}</li>
                                <li><strong>{t("personalization")}</strong>{t("to_recommend_products_features_or_content_based_on_your_preferences_and_behavior")}</li>
                                <li><strong>{t("communication")}</strong>{t("to_send_transactional_emails_e_g_order_confirmations_respond_to_inquiries_and_send_updates_about_your_account_or_services")}</li>
                                <li><strong>{t("marketing")}</strong>{t("with_your_consent_to_send_promotional_emails_newsletters_and_partner_offers_related_to_buyonida_products_and_services")}</li>
                                <li><strong>{t("analytics_and_improvement")}</strong>{t("to_analyze_usage_trends_conduct_research_and_enhance_platform_functionality_security_and_performance")}</li>
                                <li><strong>{t("fraud_prevention_and_security")}</strong>{t("to_detect_and_prevent_fraud_abuse_and_security_risks_for_you_other_users_and_buyonida")}</li>
                                <li><strong>{t("legal_compliance")}</strong>{t("to_comply_with_relevant_laws_and_regulations_such_as_tax_reporting_or_responding_to_legal_requests")}</li>
                            </ul>
                            <p>{t("we_process_your_data_based_on_the_following_legal_grounds")}</p>
                            <ul>
                                <li><strong>{t("contractual_necessity")}</strong>{t("to_fulfill_our_agreement_with_you_for_registered_services")}</li>
                                <li><strong>{t("legitimate_interests")}</strong>{t("to_operate_our_business_improve_services_prevent_fraud_and_maintain_customer_relations")}</li>
                                <li><strong>{t("consent")}</strong>{t("for_specific_purposes_such_as_marketing_based_on_your_explicit_consent")}</li>
                                <li><strong>{t("legal_obligation")}</strong>{t("to_meet_regulatory_or_legal_requirements")}</li>
                            </ul>
                            <p>{t("we_may_also_use_anonymized_or_aggregated_data_for_analytics_reporting_and_service_improvement")}</p>

                            <h2 id="section3">{t("3_sharing_of_personal_data")}</h2>
                            <p>{t("we_share_personal_data_only_with_third_parties_when_necessary_to_provide_services_comply_with_legal_obligations_or_protect_our_rights_common_scenarios_include")}</p>
                            <h3>{t("service_providers")}</h3>
                            <p>{t("we_share_data_with_trusted_partners_that_help_operate_our_platform_such_as")}</p>
                            <ul>
                                <li><strong>{t("payment_processors")}</strong>{t("for_secure_transaction_processing")}</li>
                                <li><strong>{t("hosting_providers")}</strong>{t("for_storing_and_managing_data_on_secure_servers")}</li>
                                <li><strong>{t("analytics_providers")}</strong>{t("to_analyze_usage_and_improve_services")}</li>
                                <li><strong>{t("marketing_partners")}</strong>{t("to_deliver_targeted_ads_and_promotional_content_with_your_consent")}</li>
                                <li><strong>{t("logistics_partners")}</strong>{t("to_facilitate_shipping_and_order_fulfillment")}</li>
                            </ul>
                            <h3>{t("legal_and_compliance_purposes")}</h3>
                            <p>{t("we_may_share_data_to")}</p>
                            <ul>
                                <li>{t("comply_with_laws_regulations_or_valid_legal_processes_e_g_subpoenas")}</li>
                                <li>{t("investigate_or_enforce_violations_of_our_terms_of_service_or_policies")}</li>
                                <li>{t("detect_prevent_or_address_fraud_abuse_or_security_issues")}</li>
                                <li>{t("fulfill_corporate_and_social_responsibility_obligations")}</li>
                                <li>{t("protect_the_rights_property_and_safety_of_buyonida_users_or_the_public")}</li>
                                <li>{t("resolve_disputes_and_enforce_agreements")}</li>
                            </ul>
                            <h3>{t("business_transfers")}</h3>
                            <p>{t("in_cases_of_mergers_acquisitions_restructuring_or_business_transitions_personal_data_may_be_shared_during_discussions_or_after_completion_data_may_be_transferred_under_confidentiality_agreements_to_potential_or_actual_acquirers")}</p>
                            <h3>{t("with_your_consent")}</h3>
                            <p>{t("for_example_when_you_install_a_third_party_app_via_the_buyonida_app_store_that_accesses_your_store_data_we_may_share_data_with_your_explicit_consent")}</p>

                            <h2 id="section4">{t("4_your_privacy_rights_and_choices")}</h2>
                            <p>{t("depending_on_your_location_and_applicable_laws_you_may_have_certain_rights_and_choices_regarding_your_personal_data")}</p>
                            <h3>{t("access_and_correction")}</h3>
                            <p>{t("most_of_your_personal_data_can_be_accessed_and_updated_directly_from_your_buyonida_admin_panel_for_data_you_cannot_access_or_edit_submit_a_request_via_our_online_portal")}</p>
                            <h3>{t("privacy_rights")}</h3>
                            <p>{t("you_may_have_the_following_rights")}</p>
                            <ul>
                                <li><strong>{t("access")}</strong>{t("request_a_copy_of_your_stored_personal_data")}</li>
                                <li><strong>{t("correction")}</strong>{t("request_correction_of_inaccurate_or_incomplete_data")}</li>
                                <li><strong>{t("deletion")}</strong>{t("request_deletion_of_your_data_subject_to_legal_retention_requirements")}</li>
                                <li><strong>{t("portability")}</strong>{t("request_your_data_in_a_structured_machine_readable_format_or_transfer_it_to_another_provider")}</li>
                                <li><strong>{t("restriction")}</strong>{t("request_to_restrict_certain_data_processing_under_specific_circumstances")}</li>
                                <li><strong>{t("objection")}</strong>{t("object_to_processing_based_on_legitimate_interests_including_for_marketing_purposes")}</li>
                            </ul>
                            <p>{t("exercising_these_rights_will_not_result_in_different_service_levels_or_additional_charges_use_our_online_portal_or_contact_us_as_detailed_in_section_9")}</p>
                            <h3>{t("communication_preferences")}</h3>
                            <p>{t("to_opt_out_of_marketing_messages_click_the_unsubscribe_link_in_emails_update_preferences_in_your_buyonida_account_or_contact_us_transactional_emails_e_g_order_confirmations_essential_to_service_delivery_cannot_be_opted_out_of")}</p>

                            <h2 id="section5">{t("5_data_retention")}</h2>
                            <p>{t("we_retain_your_personal_data_only_as_long_as_necessary_for_the_purposes_for_which_it_was_collected_including")}</p>
                            <ul>
                                <li>{t("providing_and_improving_services")}</li>
                                <li>{t("meeting_legal_tax_and_accounting_obligations")}</li>
                                <li>{t("ensuring_security_and_preventing_fraud")}</li>
                            </ul>
                            <p>{t("if_you_close_your_buyonida_store_or_stop_using_our_services_we_retain_your_data_for_up_to_two_years_after_which_it_is_deleted_or_anonymized_unless_longer_retention_is_required_by_law_e_g_for_tax_or_audit_purposes")}</p>
                            <p>{t("retention_periods_are_based_on")}</p>
                            <ul>
                                <li>{t("the_amount_nature_and_sensitivity_of_the_data")}</li>
                                <li>{t("the_potential_risk_of_unauthorized_use_or_disclosure")}</li>
                                <li>{t("the_purposes_for_which_data_is_processed")}</li>
                                <li>{t("applicable_legal_requirements")}</li>
                            </ul>
                            <p>{t("once_no_longer_needed_we_securely_delete_or_anonymize_your_data")}</p>

                            <h2 id="section6">{t("6_children_s_privacy")}</h2>
                            <p>{t("our_services_are_not_intended_for_children_under_13_or_under_16_in_some_jurisdictions_we_do_not_knowingly_collect_data_from_children_under_13_without_parental_consent")}</p>
                            <p>{t("if_we_learn_that_such_data_has_been_collected_we_will_delete_it_immediately_if_you_believe_we_have_such_data_please_contact_us_as_described_in_section_9")}</p>

                            <h2 id="section7">{t("7_security")}</h2>
                            <p>{t("we_implement_industry_standard_technical_and_organizational_measures_to_protect_personal_data_from_unauthorized_access_use_disclosure_alteration_or_destruction_these_include")}</p>
                            <ul>
                                <li><strong>{t("encryption")}</strong>{t("protection_of_data_during_transmission_and_storage")}</li>
                                <li><strong>{t("access_controls")}</strong>{t("limiting_access_to_personal_data_to_authorized_personnel_only")}</li>
                                <li><strong>{t("secure_infrastructure")}</strong>{t("using_reliable_cloud_providers_with_robust_security_protocols")}</li>
                                <li><strong>{t("ongoing_audits")}</strong>{t("monitoring_systems_and_addressing_vulnerabilities_through_testing")}</li>
                            </ul>
                            <p>{t("despite_our_efforts_no_system_is_completely_secure_we_are_committed_to_protecting_your_data_and_responding_promptly_to_any_incidents")}</p>

                            <h2 id="section9">{t("8_updates_to_this_privacy_policy")}</h2>
                            <p>{t("we_may_update_this_privacy_policy_to_reflect_changes_in_our_practices_legal_requirements_or_industry_standards_for_significant_changes_we_will_notify_you_via")}</p>
                            <ul>
                                <li>{t("posting_the_updated_policy_on_our_website_with_a_last_updated_date")}</li>
                                <li>{t("sending_notices_via_email_or_through_the_platform_if_required_by_law")}</li>
                            </ul>
                            <p>{t("continued_use_of_our_services_means_you_accept_the_changes_we_recommend_reviewing_this_policy_periodically")}</p>

                            <h2 id="section10">{t("9_contact_us")}</h2>
                            <p>{t("if_you_have_questions_about_this_privacy_policy_or_how_we_process_your_personal_data_please_contact_us_via")}</p>
                            <ul>
                                <li><strong>{t("online")}</strong>{t("buyonida_support_via_our_contact_page_or_data_request_portal")}</li>
                                <li><strong>{t("mail")}</strong>{t("buyonida_international_ltd_ashiq_molla_juma_street_60_baku_azerbaijan")}</li>
                                <li><strong>{t("data_protection_officer")}</strong>{t("")}<a href="mailto:privacy@buyonida.com">{t("privacy_buyonida_com")}</a>{t("")}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
}
export default PrivacyPolicy;