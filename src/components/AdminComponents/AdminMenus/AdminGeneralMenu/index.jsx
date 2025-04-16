import './index.scss'
import {IoStorefront} from "react-icons/io5";
import {AiOutlineExclamationCircle} from "react-icons/ai";

function AdminGeneralMenu() {
    return (
        <section id={"adminGeneralMenu"}>
            <h2>General</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>Store Details</div>
                <div className={"wrapper10"}>
                    <div className={"choose"}>
                        <IoStorefront/>
                        My Store
                    </div>
                    <div className={"line"}></div>
                    <div className={"choose choose1"}>
                            <IoStorefront/>
                        <div>
                            <div>Billing address</div>
                            <div className={"asd"}>Azerbaijan</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>Order ID</div>
                <div className={"boz"}>Shown on the order page , customer pages, and customer order notifications to identify order</div>
                <div className={"row"}>
                    <div className={"col-6"} style={{
                        padding: "16px 16px 16px 0"
                    }}>
                        <div>Prefix</div>
                        <input placeholder={"#"} style={{
                            width:"100%",
                        }}/>
                    </div>
                    <div className={"col-6"} style={{
                        padding: "16px 0 16px 16px"
                    }}>
                        <div>Suffix</div>
                        <input placeholder={"#"} style={{
                            width:"100%",
                        }}/>
                    </div>
                </div>
                <div className={"boy"}>Your order ID will appear as #1001, #1002, #1003 ...</div>
            </div>
            <div className={"box wrapper wrapper4"}>
                <div className={"storeDetails"}>Order processing <AiOutlineExclamationCircle/></div>
                <div className={"boy"}>After an order has been paid</div>
                <div className={"form"}>
                    <div className={"flexx"}>
                        <input type={"radio"}/>
                        <div>Automatically fulfill the order‘s line items</div>
                    </div>
                    <div className={"flexx"}>
                        <input type={"radio"}/>
                        <div>Don’t fulfill any of the order’s line items automatically</div>
                    </div>
                </div>
                <div className={"boy"}>After an order has been fulfilled and paid, or when all items have been refunded</div>
                <div className={"form"}>
                    <div className={"flexx"}>
                        <input type={"checkbox"}/>
                        <div>Automatically fulfill the order‘s line items</div>
                    </div>
                </div>
            </div>
            <button className={"saveButton"}>
                Save changes
            </button>
        </section>
    );
}

export default AdminGeneralMenu;
