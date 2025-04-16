import './index.scss'
import kapital from "../../../../assets/kapital.png";

function AdminPaymentsMenu() {
    return (
        <section id={"adminPaymentsMenu"}>
            <h2>Payments</h2>
            <div className={"box wrapper"}>
                <div className={"storeDetails"}>Payment providers</div>
                <div className={"boz"}>Providers that enable you to accept payment methods at a rate set by the third-party. An additional fee will apply to new orders once you select a plan.</div>
                <div className={"kapu"}>
                    <img src={kapital} alt={"Image"}/>
                    <div style={{
                        color: '#706c6c',
                        fontWeight: '500',
                    }}>1.5% (min 3.50 AZN/USD/EUR)</div>
                </div>
            </div>
        </section>
    );
}

export default AdminPaymentsMenu;
