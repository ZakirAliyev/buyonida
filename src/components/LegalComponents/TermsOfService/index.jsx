import './index.scss';
import { useEffect, useState } from "react";

function TermsOfService() {
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
        <section id="termsOfService">
            <div className="privacyBanner">
                <div style={{
                    color: '#dcdcdc',
                    fontSize: '18px',
                    fontWeight: '700',
                    marginBottom: '15px'
                }}>Updated May 1, 2025</div>
                Terms of Service
                <div style={{
                    color: '#999999',
                    fontSize: '18px',
                    fontWeight: '400',
                    marginTop: '15px'
                }}>Buyonida Terms of Service</div>
            </div>
            <div className="container5">
                <div className="row">
                    <div className="col-3">
                        <div className="sidebar">
                            <h3 className="sidebar-title">Table of Contents</h3>
                            <ul className="sidebar-nav">
                                <li><a href="#section1" className={activeSection === 'section1' ? 'active' : ''}>1. Account Terms</a></li>
                                <li><a href="#section2" className={activeSection === 'section2' ? 'active' : ''}>2. Account Activation</a></li>
                                <li><a href="#section3" className={activeSection === 'section3' ? 'active' : ''}>3. Buyonida Rights</a></li>
                                <li><a href="#section4" className={activeSection === 'section4' ? 'active' : ''}>4. Your Responsibilities</a></li>
                                <li><a href="#section5" className={activeSection === 'section5' ? 'active' : ''}>5. Payment Terms</a></li>
                                <li><a href="#section6" className={activeSection === 'section6' ? 'active' : ''}>6. Intellectual Property</a></li>
                                <li><a href="#section7" className={activeSection === 'section7' ? 'active' : ''}>7. Termination of Service</a></li>
                                <li><a href="#section8" className={activeSection === 'section8' ? 'active' : ''}>8. Liability & Indemnification</a></li>
                                <li><a href="#section9" className={activeSection === 'section9' ? 'active' : ''}>9. General Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            <h2 id="section1">1. Account Terms</h2>
                            <p>To use Buyonida services, you must create a user account (“Account”). You must provide your full legal name, business address, phone number, valid email address, and other required information to complete registration. Buyonida may reject your registration or cancel an existing Account at its sole discretion.</p>
                            <p>You must meet one of the following to use the services:</p>
                            <ul>
                                <li>Be at least 18 years old;</li>
                                <li>If between 13–18, you may only use the services under parental or legal guardian supervision and acceptance of terms;</li>
                                <li>If your country’s age of majority is higher than 18, you must meet that age.</li>
                            </ul>
                            <p>You confirm that you use Buyonida services solely for commercial purposes, not personal or household use.</p>
                            <p>Buyonida will use your registered email for primary communication. You must keep it up-to-date and functional.</p>
                            <p>You are responsible for keeping your password secure. Buyonida is not liable for any loss from your negligence in this area. You are solely responsible for all activity and content shared through your Account.</p>
                            <p>Violation of the Terms or Acceptable Use Policy may result in immediate suspension of services.</p>

                            <h2 id="section2">2. Account Activation</h2>
                            <h3>2.1 Store Owner</h3>
                            <p>The individual registering for the services (“Store Owner”) is the party to this Agreement. If you register on behalf of your employer, that legal entity is considered the store owner.</p>
                            <p>You confirm you have the authority to bind the employer to these terms. If enrolled in Buyonida Payments, a Google Pay account may be created on your behalf.</p>
                            <h3>2.2 Employee Accounts</h3>
                            <p>Depending on your plan, you may create employee accounts with restricted access. The Store Owner defines access levels and is responsible for all actions of such users.</p>
                            <h3>2.3 Domain Names</h3>
                            <p>Domains registered through Buyonida will auto-renew annually. You are responsible for disabling auto-renewal if desired.</p>

                            <h2 id="section3">3. Buyonida Rights</h2>
                            <p>Buyonida may offer services to competitors and provides no exclusivity in any market segment. Employees and contractors may also be users or sellers and may compete without using your confidential data.</p>
                            <p>In case of ownership disputes, Buyonida may request:</p>
                            <ul>
                                <li>Business license,</li>
                                <li>Identity document,</li>
                                <li>Last 4 digits of a credit card,</li>
                                <li>Proof of employment status.</li>
                            </ul>
                            <p>Buyonida reserves the right to determine and assign account ownership. Accounts may be suspended during disputes.</p>
                            <p>Buyonida may modify, suspend, or refuse service at any time.</p>

                            <h2 id="section4">4. Your Responsibilities</h2>
                            <p>You must comply with Buyonida’s Acceptable Use Policy and all applicable laws.</p>
                            <p>Commercial use of any service part without written permission is prohibited.</p>
                            <p>You may not advertise using Buyonida trademarks or similar domains/keywords.</p>
                            <p>Your materials (excluding credit card data) may be transmitted unencrypted and adapted technically. Credit card data is always encrypted.</p>

                            <h2 id="section5">5. Payment Terms</h2>
                            <p>You agree to pay all subscription, transaction, and additional fees (apps, domains, third-party services, etc.).</p>
                            <p>You must provide and maintain a valid payment method. Charges will continue until services are cancelled.</p>
                            <p>If payment fails, Buyonida will try 3 times, every 3 days. After failed attempts, your account may be suspended.</p>

                            <h2 id="section6">6. Intellectual Property</h2>
                            <h3>6.1 Your Materials</h3>
                            <p>Buyonida claims no ownership over your materials. However, you grant a non-exclusive, royalty-free, global license for service operation and improvement.</p>
                            <h3>6.2 Buyonida IP</h3>
                            <p>Buyonida’s software, designs, and content are protected by intellectual property rights. Use of brand elements requires written permission.</p>

                            <h2 id="section7">7. Termination of Service</h2>
                            <p>You may cancel your account at any time. Buyonida may suspend or terminate without notice in the following cases:</p>
                            <ul>
                                <li>Terms or policy violations,</li>
                                <li>Non-payment,</li>
                                <li>Legal risks,</li>
                                <li>Legal requests.</li>
                            </ul>
                            <p>All dues become payable immediately after termination. Account data is retained for 2 years.</p>

                            <h2 id="section8">8. Liability & Indemnification</h2>
                            <p>Buyonida is not liable for indirect, incidental, or special damages. You agree to indemnify Buyonida for:</p>
                            <ul>
                                <li>Use of services,</li>
                                <li>Breach of terms,</li>
                                <li>Use of materials,</li>
                                <li>Violation of third-party rights.</li>
                            </ul>

                            <h2 id="section9">9. General Terms</h2>
                            <p>In case of conflict between versions, the English version prevails.</p>
                            <p>Buyonida may transfer these terms without notice. You may do so only with written consent.</p>
                            <p>Legal notices:</p>
                            <ul>
                                <li><strong>Email</strong>: <a href="mailto:info@buyonida.com">info@buyonida.com</a></li>
                                <li><strong>Mailing address</strong>: Buyonida MMC, 60 Ashiq Molla Juma St., Baku, Azerbaijan.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TermsOfService;