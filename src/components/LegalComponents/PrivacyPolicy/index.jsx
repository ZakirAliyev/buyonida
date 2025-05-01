import './index.scss';
import { useEffect, useState } from "react";

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
                }}>Updated May 1, 2025</div>
                Privacy Policy
                <div style={{
                    color: '#999999',
                    fontSize: '18px',
                    fontWeight: '400',
                    marginTop: '15px'
                }}>How Buyonida handles your data</div>
            </div>
            <div className="container5">
                <div className="row" style={{
                    marginBottom: '50px'
                }}>
                    <div className="col-3">
                        <div className="sidebar">
                            <h3 className="sidebar-title">Table of Contents</h3>
                            <ul className="sidebar-nav">
                                <li><a href="#section1" className={activeSection === 'section1' ? 'active' : ''}>1.
                                    Personal Data We Collect</a></li>
                                <li><a href="#section2" className={activeSection === 'section2' ? 'active' : ''}>2. How
                                    We Use Personal Data</a></li>
                                <li><a href="#section3" className={activeSection === 'section3' ? 'active' : ''}>3.
                                    Sharing of Personal Data</a></li>
                                <li><a href="#section4" className={activeSection === 'section4' ? 'active' : ''}>4. Your
                                    Privacy Rights and Choices</a></li>
                                <li><a href="#section5" className={activeSection === 'section5' ? 'active' : ''}>5. Data
                                    Retention</a></li>
                                <li><a href="#section6" className={activeSection === 'section6' ? 'active' : ''}>6.
                                    Children's Privacy</a></li>
                                <li><a href="#section7" className={activeSection === 'section7' ? 'active' : ''}>7.
                                    Security</a></li>
                                <li><a href="#section9" className={activeSection === 'section9' ? 'active' : ''}>8.
                                    Updates to This Privacy Policy</a></li>
                                <li><a href="#section10" className={activeSection === 'section10' ? 'active' : ''}>9.
                                    Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            <h2 id="section1">1. Personal Data We Collect</h2>
                            <p>We collect information about you in three main ways: information you provide, information
                                collected automatically, and information obtained from other sources.</p>
                            <h3>Information You Provide</h3>
                            <p>When you register with Buyonida, use our services, or contact us, you may provide the
                                following personal data:</p>
                            <ul>
                                <li><strong>Contact Information</strong>: Name, email address, phone number, shipping and
                                    billing addresses.</li>
                                <li><strong>Account Information</strong>: Username, password, and other account-related
                                    details.</li>
                                <li><strong>Payment Information</strong>: Credit card details, bank account information, or
                                    other payment methods used for transactions.</li>
                                <li><strong>Business Information</strong>: Store name, business type, tax identification
                                    numbers, and other details about your business.</li>
                                <li><strong>Content</strong>: Information you upload or provide, such as product
                                    descriptions, customer data, and communications with Buyonida Support.</li>
                            </ul>
                            <h3>Automatically Collected Information</h3>
                            <p>When you use our services, we automatically collect certain data, including:</p>
                            <ul>
                                <li><strong>Device and Usage Data</strong>: IP address, browser type, operating system,
                                    device identifiers, pages visited, links clicked, and time spent on our platform.</li>
                                <li><strong>Location Data</strong>: Approximate location based on IP address or other
                                    geographic data.</li>
                            </ul>
                            <h3>Information from Other Sources</h3>
                            <p>We may receive information about you from third parties, such as:</p>
                            <ul>
                                <li><strong>Partners</strong>: Payment processors, app developers, or marketing partners
                                    providing data to improve our services.</li>
                                <li><strong>Public Sources</strong>: Publicly available data such as government records or
                                    social media.</li>
                                <li><strong>Other Users</strong>: Information submitted by other users interacting with your
                                    store, such as customer reviews or inquiries.</li>
                            </ul>

                            <h2 id="section2">2. How We Use Personal Data</h2>
                            <p>We use your personal data to provide, maintain, and improve our services, and to comply with
                                legal obligations. Main purposes include:</p>
                            <ul>
                                <li><strong>Service Delivery</strong>: To process transactions, manage your account, provide
                                    customer support, fulfill orders, and enable store management.</li>
                                <li><strong>Personalization</strong>: To recommend products, features, or content based on
                                    your preferences and behavior.</li>
                                <li><strong>Communication</strong>: To send transactional emails (e.g., order
                                    confirmations), respond to inquiries, and send updates about your account or
                                    services.</li>
                                <li><strong>Marketing</strong>: With your consent, to send promotional emails, newsletters,
                                    and partner offers related to Buyonida products and services.</li>
                                <li><strong>Analytics and Improvement</strong>: To analyze usage trends, conduct research,
                                    and enhance platform functionality, security, and performance.</li>
                                <li><strong>Fraud Prevention and Security</strong>: To detect and prevent fraud, abuse, and
                                    security risks for you, other users, and Buyonida.</li>
                                <li><strong>Legal Compliance</strong>: To comply with relevant laws and regulations, such
                                    as tax reporting or responding to legal requests.</li>
                            </ul>
                            <p>We process your data based on the following legal grounds:</p>
                            <ul>
                                <li><strong>Contractual Necessity</strong>: To fulfill our agreement with you for
                                    registered services.</li>
                                <li><strong>Legitimate Interests</strong>: To operate our business, improve services,
                                    prevent fraud, and maintain customer relations.</li>
                                <li><strong>Consent</strong>: For specific purposes such as marketing, based on your
                                    explicit consent.</li>
                                <li><strong>Legal Obligation</strong>: To meet regulatory or legal requirements.</li>
                            </ul>
                            <p>We may also use anonymized or aggregated data for analytics, reporting, and service
                                improvement.</p>

                            <h2 id="section3">3. Sharing of Personal Data</h2>
                            <p>We share personal data only with third parties when necessary to provide services, comply
                                with legal obligations, or protect our rights. Common scenarios include:</p>
                            <h3>Service Providers</h3>
                            <p>We share data with trusted partners that help operate our platform, such as:</p>
                            <ul>
                                <li><strong>Payment Processors</strong>: For secure transaction processing.</li>
                                <li><strong>Hosting Providers</strong>: For storing and managing data on secure
                                    servers.</li>
                                <li><strong>Analytics Providers</strong>: To analyze usage and improve services.</li>
                                <li><strong>Marketing Partners</strong>: To deliver targeted ads and promotional content
                                    with your consent.</li>
                                <li><strong>Logistics Partners</strong>: To facilitate shipping and order fulfillment.</li>
                            </ul>
                            <h3>Legal and Compliance Purposes</h3>
                            <p>We may share data to:</p>
                            <ul>
                                <li>Comply with laws, regulations, or valid legal processes (e.g., subpoenas).</li>
                                <li>Investigate or enforce violations of our Terms of Service or policies.</li>
                                <li>Detect, prevent, or address fraud, abuse, or security issues.</li>
                                <li>Fulfill corporate and social responsibility obligations.</li>
                                <li>Protect the rights, property, and safety of Buyonida, users, or the public.</li>
                                <li>Resolve disputes and enforce agreements.</li>
                            </ul>
                            <h3>Business Transfers</h3>
                            <p>In cases of mergers, acquisitions, restructuring, or business transitions, personal data may
                                be shared during discussions or after completion. Data may be transferred under
                                confidentiality agreements to potential or actual acquirers.</p>
                            <h3>With Your Consent</h3>
                            <p>For example, when you install a third-party app via the Buyonida App Store that accesses your
                                store data, we may share data with your explicit consent.</p>

                            <h2 id="section4">4. Your Privacy Rights and Choices</h2>
                            <p>Depending on your location and applicable laws, you may have certain rights and choices
                                regarding your personal data.</p>
                            <h3>Access and Correction</h3>
                            <p>Most of your personal data can be accessed and updated directly from your Buyonida admin
                                panel. For data you cannot access or edit, submit a request via our online portal.</p>
                            <h3>Privacy Rights</h3>
                            <p>You may have the following rights:</p>
                            <ul>
                                <li><strong>Access</strong>: Request a copy of your stored personal data.</li>
                                <li><strong>Correction</strong>: Request correction of inaccurate or incomplete data.</li>
                                <li><strong>Deletion</strong>: Request deletion of your data, subject to legal retention
                                    requirements.</li>
                                <li><strong>Portability</strong>: Request your data in a structured, machine-readable
                                    format, or transfer it to another provider.</li>
                                <li><strong>Restriction</strong>: Request to restrict certain data processing under specific
                                    circumstances.</li>
                                <li><strong>Objection</strong>: Object to processing based on legitimate interests,
                                    including for marketing purposes.</li>
                            </ul>
                            <p>Exercising these rights will not result in different service levels or additional charges. Use
                                our online portal or contact us as detailed in Section 9.</p>
                            <h3>Communication Preferences</h3>
                            <p>To opt out of marketing messages, click the “unsubscribe” link in emails, update preferences
                                in your Buyonida account, or contact us. Transactional emails (e.g., order confirmations)
                                essential to service delivery cannot be opted out of.</p>

                            <h2 id="section5">5. Data Retention</h2>
                            <p>We retain your personal data only as long as necessary for the purposes for which it was
                                collected, including:</p>
                            <ul>
                                <li>Providing and improving services.</li>
                                <li>Meeting legal, tax, and accounting obligations.</li>
                                <li>Ensuring security and preventing fraud.</li>
                            </ul>
                            <p>If you close your Buyonida store or stop using our services, we retain your data for up to
                                two years, after which it is deleted or anonymized unless longer retention is required by
                                law (e.g., for tax or audit purposes).</p>
                            <p>Retention periods are based on:</p>
                            <ul>
                                <li>The amount, nature, and sensitivity of the data.</li>
                                <li>The potential risk of unauthorized use or disclosure.</li>
                                <li>The purposes for which data is processed.</li>
                                <li>Applicable legal requirements.</li>
                            </ul>
                            <p>Once no longer needed, we securely delete or anonymize your data.</p>

                            <h2 id="section6">6. Children's Privacy</h2>
                            <p>Our services are not intended for children under 13 (or under 16 in some jurisdictions). We
                                do not knowingly collect data from children under 13 without parental consent.</p>
                            <p>If we learn that such data has been collected, we will delete it immediately. If you believe
                                we have such data, please contact us as described in Section 9.</p>

                            <h2 id="section7">7. Security</h2>
                            <p>We implement industry-standard technical and organizational measures to protect personal data
                                from unauthorized access, use, disclosure, alteration, or destruction. These include:</p>
                            <ul>
                                <li><strong>Encryption</strong>: Protection of data during transmission and storage.</li>
                                <li><strong>Access Controls</strong>: Limiting access to personal data to authorized
                                    personnel only.</li>
                                <li><strong>Secure Infrastructure</strong>: Using reliable cloud providers with robust
                                    security protocols.</li>
                                <li><strong>Ongoing Audits</strong>: Monitoring systems and addressing vulnerabilities
                                    through testing.</li>
                            </ul>
                            <p>Despite our efforts, no system is completely secure. We are committed to protecting your data
                                and responding promptly to any incidents.</p>

                            <h2 id="section9">8. Updates to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy to reflect changes in our practices, legal requirements, or
                                industry standards. For significant changes, we will notify you via:</p>
                            <ul>
                                <li>Posting the updated policy on our website with a "Last Updated" date.</li>
                                <li>Sending notices via email or through the platform if required by law.</li>
                            </ul>
                            <p>Continued use of our services means you accept the changes. We recommend reviewing this
                                policy periodically.</p>

                            <h2 id="section10">9. Contact Us</h2>
                            <p>If you have questions about this Privacy Policy or how we process your personal data, please
                                contact us via:</p>
                            <ul>
                                <li><strong>Online</strong>: Buyonida Support via our contact page or data request
                                    portal.</li>
                                <li><strong>Mail</strong>: Buyonida International Ltd., Ashiq Molla Juma Street 60, Baku,
                                    Azerbaijan.</li>
                                <li><strong>Data Protection Officer</strong>: <a
                                    href="mailto:privacy@buyonida.com">privacy@buyonida.com</a>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PrivacyPolicy;