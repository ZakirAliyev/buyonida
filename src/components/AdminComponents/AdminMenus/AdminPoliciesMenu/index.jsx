import './index.scss'
import {TbCreditCardRefund} from "react-icons/tb";
import {IoLockOpenOutline} from "react-icons/io5";
import {FiFileText} from "react-icons/fi";
import {MdOutlineLocalShipping} from "react-icons/md";
import {HiOutlineClipboardDocumentList} from "react-icons/hi2";
import {BiChevronRight} from "react-icons/bi";

function AdminPoliciesMenu() {
    return (
        <section id={"adminPoliciesMenu"}>
            <h2>Policies</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>Written policies</div>
                <div className={"boz"}>Policies are linked in the footer of checkout and can be added to your online store menu</div>
                <div className={"box wrapper"} style={{
                    padding: "16px",
                }}>
                    <div className={"padding"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <TbCreditCardRefund />
                            Return and refund policy
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div className={"policy"}>No policy yet</div>
                            <BiChevronRight/>
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <IoLockOpenOutline />
                            Privacy policy
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div className={"policy"}>No policy yet</div>
                            <BiChevronRight/>
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <FiFileText />
                            Terms of service
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div className={"policy"}>No policy yet</div>
                            <BiChevronRight/>
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <MdOutlineLocalShipping />
                            Shipping policy
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div className={"policy"}>No policy yet</div>
                            <BiChevronRight/>
                        </div>
                    </div>
                    <div className={"line"}></div>
                    <div className={"padding"}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <HiOutlineClipboardDocumentList />
                            Contact information
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}>
                            <div className={"policy"}>No policy yet</div>
                            <BiChevronRight/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminPoliciesMenu;
