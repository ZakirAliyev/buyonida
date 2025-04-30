import './index.scss';
import {useEffect, useState} from "react";

function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.content h2[id]');
            let currentSection = '';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 120) { // 120: offset ayarı
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

    return (
        <section id="privacyPolicy">
            <div className="privacyBanner">
                <div style={{
                    color: '#dcdcdc',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '15px'
                }}>Updated March 2, 2023</div>
                Privacy Policy
                <div style={{
                    color: '#999999',
                    fontSize: '18px',
                    fontWeight: '400',
                    marginTop: '15px'
                }}>How Shopify handles your data</div>
            </div>
            <div className="container5">
                <div className="row">
                    <div className="col-3">
                        <div className="sidebar">
                            <h3 className="sidebar-title">Table of Contents</h3>
                            <ul className="sidebar-nav">
                                <li><a href="#section1" className={activeSection === 'section1' ? 'active' : ''}>1.
                                    Personal Information We Collect</a></li>
                                <li><a href="#section2" className={activeSection === 'section2' ? 'active' : ''}>2. How
                                    We Use Personal Information</a></li>
                                <li><a href="#section3" className={activeSection === 'section3' ? 'active' : ''}>3. How
                                    We Share Personal Information</a></li>
                                <li><a href="#section4" className={activeSection === 'section4' ? 'active' : ''}>4. Your
                                    Privacy Rights and Choices</a></li>
                                <li><a href="#section5" className={activeSection === 'section5' ? 'active' : ''}>5.
                                    Retention of Personal Information</a></li>
                                <li><a href="#section6" className={activeSection === 'section6' ? 'active' : ''}>6.
                                    Children's Privacy</a></li>
                                <li><a href="#section7" className={activeSection === 'section7' ? 'active' : ''}>7.
                                    Security</a></li>
                                <li><a href="#section8" className={activeSection === 'section8' ? 'active' : ''}>8.
                                    International Data Transfers</a></li>
                                <li><a href="#section9" className={activeSection === 'section9' ? 'active' : ''}>9.
                                    Updates to This Privacy Policy</a></li>
                                <li><a href="#section10" className={activeSection === 'section10' ? 'active' : ''}>10.
                                    Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            <h2 id="section1">1. Personal Information We Collect</h2>
                            <p>We collect information about you in three primary ways: information you provide, data
                                collected automatically, and information from other sources.</p>
                            <h3>Information You Provide</h3>
                            <p>When you sign up for Shopify, use our services, or interact with us, you may provide
                                personal information such as:</p>
                            <ul>
                                <li><strong>Contact Information</strong>: Name, email address, phone number, billing and
                                    shipping addresses.
                                </li>
                                <li><strong>Account Information</strong>: Username, password, and other account-related
                                    details.
                                </li>
                                <li><strong>Payment Information</strong>: Credit card details, bank account information,
                                    or other payment methods used for transactions.
                                </li>
                                <li><strong>Business Information</strong>: Store name, business type, tax identification
                                    numbers, and other details about your business.
                                </li>
                                <li><strong>Content</strong>: Information you upload or provide, such as product
                                    descriptions, customer data, or communications with Shopify Support.
                                </li>
                            </ul>
                            <h3>Information Collected Automatically</h3>
                            <p>When you use our services, we collect certain information automatically, including:</p>
                            <ul>
                                <li><strong>Device and Usage Data</strong>: IP address, browser type, operating system,
                                    device identifiers, pages visited, links clicked, and time spent on our platform.
                                </li>
                                <li><strong>Location Data</strong>: Approximate location based on your IP address or
                                    other geolocation data.
                                </li>
                                <li><strong>Cookies and Tracking Technologies</strong>: Data collected via cookies, web
                                    beacons, and similar technologies to analyze usage and personalize your experience,
                                    as described in our <a href="https://www.shopify.com/legal/cookies">Cookie
                                        Policy</a>.
                                </li>
                            </ul>
                            <h3>Information from Other Sources</h3>
                            <p>We may receive information about you from third parties, such as:</p>
                            <ul>
                                <li><strong>Partners</strong>: Payment processors, app developers, or marketing partners
                                    who provide data to enhance our services.
                                </li>
                                <li><strong>Public Sources</strong>: Information available publicly, such as business
                                    details from government registries or social media.
                                </li>
                                <li><strong>Other Users</strong>: Data provided by customers or other users interacting
                                    with your store, such as customer reviews or inquiries.
                                </li>
                            </ul>

                            <h2 id="section2">2. How We Use Personal Information</h2>
                            <p>We use your personal information to provide, maintain, and improve our services, and to
                                comply with legal obligations. The primary purposes include:</p>
                            <ul>
                                <li><strong>Service Delivery</strong>: Process transactions, manage your account,
                                    provide customer support, and enable features like order fulfillment and store
                                    management.
                                </li>
                                <li><strong>Personalization</strong>: Tailor your experience by recommending products,
                                    features, or content based on your preferences and usage.
                                </li>
                                <li><strong>Communication</strong>: Send transactional emails (e.g., order
                                    confirmations), respond to inquiries, and provide updates about your account or our
                                    services.
                                </li>
                                <li><strong>Marketing</strong>: With your consent, send promotional emails, newsletters,
                                    or ads about Shopify products, services, or partner offerings.
                                </li>
                                <li><strong>Analytics and Improvement</strong>: Analyze usage trends, conduct research,
                                    and enhance our platform’s functionality, security, and performance.
                                </li>
                                <li><strong>Fraud Prevention and Security</strong>: Detect and prevent fraud, abuse, or
                                    security risks to protect you, other users, and Shopify.
                                </li>
                                <li><strong>Legal Compliance</strong>: Comply with applicable laws, regulations, or
                                    legal processes, such as tax reporting or responding to subpoenas.
                                </li>
                            </ul>
                            <p>We process your data based on the following legal grounds:</p>
                            <ul>
                                <li><strong>Contractual Necessity</strong>: To fulfill our contract with you (e.g.,
                                    providing services you’ve signed up for).
                                </li>
                                <li><strong>Legitimate Interests</strong>: To operate our business, improve services,
                                    prevent fraud, and maintain customer relationships.
                                </li>
                                <li><strong>Consent</strong>: For specific purposes like marketing, where you’ve given
                                    explicit permission.
                                </li>
                                <li><strong>Legal Obligation</strong>: To meet regulatory or legal requirements.</li>
                            </ul>
                            <p>We may use anonymized or aggregated data that does not identify you for purposes like
                                analytics, reporting, or improving our services.</p>

                            <h2 id="section3">3. How We Share Personal Information</h2>
                            <p>We share your personal information with third parties only as necessary to provide our
                                services, comply with legal obligations, or protect our rights. The main scenarios
                                include:</p>
                            <h3>Service Providers</h3>
                            <p>We share data with trusted vendors who help us operate our platform, such as:</p>
                            <ul>
                                <li><strong>Payment Processors</strong>: To process transactions securely.</li>
                                <li><strong>Hosting Providers</strong>: To store and manage data on secure servers.</li>
                                <li><strong>Analytics Providers</strong>: To analyze usage and improve our services.
                                </li>
                                <li><strong>Marketing Partners</strong>: To deliver targeted ads or promotional content,
                                    with your consent.
                                </li>
                                <li><strong>Logistics Partners</strong>: To facilitate shipping and order fulfillment.
                                </li>
                            </ul>
                            <h3>Legal and Compliance Purposes</h3>
                            <p>We may share data to:</p>
                            <ul>
                                <li>Comply with applicable laws, regulations, or valid legal processes (e.g., subpoenas,
                                    court orders).
                                </li>
                                <li>Enforce or investigate potential violations of our <a
                                    href="https://www.shopify.com/legal/terms">Terms of Service</a> or other policies.
                                </li>
                                <li>Detect, prevent, or address fraud, abuse, or security issues.</li>
                                <li>Meet corporate and social responsibility commitments.</li>
                                <li>Protect the rights, property, or safety of Shopify, our users, or the public.</li>
                                <li>Resolve disputes or enforce agreements.</li>
                            </ul>
                            <h3>Business Transfers</h3>
                            <p>We may share personal data during negotiations or completion of a merger, acquisition,
                                sale, restructuring, or change in control involving Shopify’s business or assets. Your
                                data may be transferred to prospective or actual acquirers under strict confidentiality
                                agreements.</p>
                            <h3>With Your Consent</h3>
                            <p>We may share your data with third parties when you explicitly consent, such as when you
                                install a third-party app from the Shopify App Store that requires access to your
                                store’s data.</p>

                            <h2 id="section4">4. Your Privacy Rights and Choices</h2>
                            <p>You have several rights and choices regarding your personal information, depending on
                                your location and applicable laws.</p>
                            <h3>Access and Correction</h3>
                            <p>You can access and update much of your personal information directly through your Shopify
                                admin dashboard. For data you cannot access or correct, submit a request via our <a
                                    href="https://www.shopify.com/legal/privacy/request">online portal</a>.</p>
                            <h3>Privacy Rights</h3>
                            <p>You may have the right to:</p>
                            <ul>
                                <li><strong>Access</strong>: Request a copy of the personal data we hold about you.</li>
                                <li><strong>Correction</strong>: Request corrections to inaccurate or incomplete data.
                                </li>
                                <li><strong>Deletion</strong>: Request deletion of your data, subject to legal retention
                                    requirements.
                                </li>
                                <li><strong>Portability</strong>: Receive your data in a structured, machine-readable
                                    format or have it transferred to another provider.
                                </li>
                                <li><strong>Restriction</strong>: Request that we limit the processing of your data in
                                    certain circumstances.
                                </li>
                                <li><strong>Objection</strong>: Object to processing based on legitimate interests,
                                    including for marketing purposes.
                                </li>
                            </ul>
                            <p>We will not charge you more or provide a different level of service for exercising these
                                rights. To submit a request, use our <a
                                    href="https://www.shopify.com/legal/privacy/request">online portal</a> or contact us
                                as described in Section 10.</p>
                            <h3>Communication Preferences</h3>
                            <p>You can opt out of marketing communications by clicking the “unsubscribe” link in emails,
                                updating your preferences in your Shopify account, or contacting us. You cannot opt out
                                of transactional emails (e.g., order confirmations) necessary for providing our
                                services.</p>
                            <h3>Cookies and Tracking</h3>
                            <p>You can manage cookies and tracking technologies through your browser settings or our
                                cookie consent tool, as described in our <a
                                    href="https://www.shopify.com/legal/cookies">Cookie Policy</a>.</p>

                            <h2 id="section5">5. Retention of Personal Information</h2>
                            <p>We retain personal data only as long as necessary to fulfill the purposes for which it
                                was collected, including:</p>
                            <ul>
                                <li>Providing and improving our services.</li>
                                <li>Complying with legal, tax, or accounting requirements.</li>
                                <li>Ensuring security and preventing fraud.</li>
                            </ul>
                            <p>If you close your Shopify store or stop using our services, we retain your data for two
                                years before deleting or anonymizing it, unless a longer retention period is required by
                                law (e.g., for tax or audit purposes).</p>
                            <p>Retention periods are determined based on:</p>
                            <ul>
                                <li>The amount, nature, and sensitivity of the data.</li>
                                <li>The potential risk of harm from unauthorized use or disclosure.</li>
                                <li>The purposes for which we process the data.</li>
                                <li>Applicable legal requirements.</li>
                            </ul>
                            <p>When data is no longer needed, we securely delete or anonymize it to prevent
                                identification.</p>

                            <h2 id="section6">6. Children's Privacy</h2>
                            <p>Our services are not intended for children under 13 years of age (or older, as required
                                by applicable law, such as 16 in some jurisdictions). We do not knowingly collect
                                personal information from children under 13.</p>
                            <p>If we learn that we have collected personal data from a child under 13 without parental
                                consent, we will promptly delete it. If you believe we have such data, please contact us
                                immediately as described in Section 10.</p>

                            <h2 id="section7">7. Security</h2>
                            <p>We implement industry-standard technical and organizational measures to protect your
                                personal information from unauthorized access, use, disclosure, alteration, or
                                destruction. These measures include:</p>
                            <ul>
                                <li><strong>Encryption</strong>: Securing data during transmission and storage.</li>
                                <li><strong>Access Controls</strong>: Limiting access to personal data to authorized
                                    personnel only.
                                </li>
                                <li><strong>Secure Infrastructure</strong>: Using trusted cloud providers with robust
                                    security protocols.
                                </li>
                                <li><strong>Regular Audits</strong>: Monitoring and testing our systems to identify and
                                    address vulnerabilities.
                                </li>
                            </ul>
                            <p>Despite our efforts, no system can be completely secure. We cannot guarantee absolute
                                security, but we are committed to protecting your data and responding promptly to any
                                incidents.</p>

                            <h2 id="section8">8. International Data Transfers</h2>
                            <p>As a global company, your personal information may be transferred to and processed in
                                countries other than your own, including Canada, the United States, the European
                                Economic Area (EEA), and other regions where Shopify or its service providers
                                operate.</p>
                            <p>Data protection laws vary by country, and some jurisdictions may offer different levels
                                of protection. We ensure appropriate safeguards are in place, such as:</p>
                            <ul>
                                <li><strong>Standard Contractual Clauses</strong>: Legally binding agreements approved
                                    by the European Commission to protect data transferred outside the EEA.
                                </li>
                                <li><strong>Data Protection Agreements</strong>: Contracts with service providers to
                                    ensure compliance with applicable laws.
                                </li>
                                <li><strong>Adequacy Decisions</strong>: Relying on jurisdictions recognized as
                                    providing adequate data protection by the EU or other authorities.
                                </li>
                            </ul>
                            <p>For more details on our data transfer practices, contact us as described in Section
                                10.</p>

                            <h2 id="section9">9. Updates to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time to reflect changes in our practices,
                                legal requirements, or industry standards. We will notify you of material changes
                                by:</p>
                            <ul>
                                <li>Posting the updated policy on our website with a revised “Last Updated” date.</li>
                                <li>Sending an email or in-platform notification, where required by law.</li>
                            </ul>
                            <p>Your continued use of our services after the updated policy takes effect constitutes your
                                acceptance of the changes. We encourage you to review this policy periodically.</p>

                            <h2 id="section10">10. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy or how we handle your personal
                                information, please contact us via:</p>
                            <ul>
                                <li><strong>Online</strong>: Shopify Support through our <a
                                    href="https://www.shopify.com/contact">contact page</a> or the <a
                                    href="https://www.shopify.com/legal/privacy/request">data request portal</a>.
                                </li>
                                <li><strong>Mail</strong>: Shopify Inc., 151 O'Connor Street, Ground Floor, Ottawa, ON
                                    K2P 2L8, Canada.
                                </li>
                            </ul>
                            <p>For users in the EEA, UK, or Switzerland, the data controller responsible for your
                                personal data is:</p>
                            <p><strong>Shopify International Ltd.</strong><br/>
                                2nd Floor, 1-2 Victoria Buildings, Haddington Road, Dublin 4, D04 XN32, Ireland.</p>
                            <p>You may also contact our Data Protection Officer at <a
                                href="mailto:privacy@shopify.com">privacy@shopify.com</a>.</p>
                            <p>If you are in the EEA or UK and have unresolved concerns, you have the right to lodge a
                                complaint with your local data protection authority. For example, in the EU, contact the
                                supervisory authority in your country of residence; in the UK, contact the Information
                                Commissioner’s Office (ICO).</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PrivacyPolicy;