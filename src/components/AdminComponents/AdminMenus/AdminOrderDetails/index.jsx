import './index.scss'
import image1 from "/src/assets/success.png"
import image2 from "/src/assets/miniPhoto.png"
import image3 from "/src/assets/location.png"
import image4 from "/src/assets/unfilfulled.png"
import {cloneElement, useState} from "react";
import {Modal} from "antd";
import AdminAreYouSure from "../../AdminAreYouSure/index.jsx";


function AdminOrderDetails() {

    const [isBigBoxModalOpen, setIsBigBoxModalOpen] = useState(false);
    const handleBigBoxClick = () => {
        setIsBigBoxModalOpen(!isBigBoxModalOpen);
    };

    const handleRefund = () => {
        alert("Refund completed");
        setIsBigBoxModalOpen(false);
    };

    return (
        <section id={"adminOrderDetails"}>
            <div className={"row"}>
                <div className={"box1 col-8"}>
                    <div className="wrapper">
                        <h3>Customer</h3>
                        <div className={"link link1"}>
                            Elvar Aghamaliyev
                        </div>
                        <h3 className={"mgrn"}>Contanct information</h3>
                        <div className={"link"}>
                            elvar.agamaliyev.official@gmail.com
                        </div>
                        <div className={"link"}>
                            +994 10 265 59 90
                        </div>
                    </div>
                </div>
                <div className={"box2 col-4"}>
                    <div className="wrapper" style={{
                        height: 'calc(100% - 20px)'
                    }}>
                        <h3 className={"h3"}>Shipping adress</h3>
                        <p>Azerbaijan</p>
                        <p>Baku</p>
                        <p>Nəriman Nərimanov rayonu</p>
                        <p>Aşıq Molla Cümə Küçəsi 47b.</p>
                        <p>AZ1012</p>
                    </div>
                </div>
            </div>
            <div className={"wrapper"}>
                <div className={"statusWrapper"}>
                    <img src={image1} alt={"Image"} className={"img"}/>
                    <h3>Paid</h3>
                </div>
                <div className={"info"}>
                    <div className={"infoWrapper"}>
                        <div>Subtotal</div>
                        <div>1 item</div>
                    </div>
                    <div>$90.00</div>
                </div>
                <div className={"info info1"}>
                    <div className={"infoWrapper"}>
                        <div>Shipping</div>
                        <div>Standard</div>
                    </div>
                    <div>$19.57</div>
                </div>
                <div className={"info info1 info2"}>
                    <div className={"infoWrapper"}>
                        <div>Total</div>
                    </div>
                    <div>$109.57</div>
                </div>
            </div>
            <div className={"wrapper box3"}>
                <div className={"info info1"}>
                    <div>
                        <img src={image4} alt={"Image"} className={"img1"}/>
                    </div>
                    <div className={"infoWrapper"}>
                        <div style={{
                            fontWeight: '600'
                        }}>Order #1031
                        </div>
                    </div>
                </div>
                <div className={"line"}></div>
                <div className={"info info1"}>
                    <div className={"infoWrapper infoWrapper1"}>
                        <img src={image2} alt={"Image"}/>
                        <div>Clothes</div>
                    </div>
                    <div className={"infoWrapper"}>
                        <div>$45.00 x 2</div>
                        <div>$90.00</div>
                    </div>
                </div>
                <div className={"line"}></div>
                <div className={"info info1"}>
                    <div className={"infoWrapper infoWrapper1"}>
                        <img src={image2} alt={"Image"}/>
                        <div>Clothes</div>
                    </div>
                    <div className={"infoWrapper"}>
                        <div>$45.00 x 2</div>
                        <div>$90.00</div>
                    </div>
                </div>
                <div className={"line"}></div>
                <div className={"info finish1"}>
                    <div className={"zakir"}>
                        <img src={image3} alt={"Image"}/>
                        <div className={"textWrapper2"}>
                            <h4>Location</h4>
                            <h5>Baku, Azerbaijan</h5>
                        </div>
                    </div>
                    <div>
                        <button className={"fulfillButton"} onClick={handleBigBoxClick}>Refund</button>
                        <button>Fulfill item</button>
                    </div>
                </div>
            </div>
            <Modal
                visible={isBigBoxModalOpen}
                onCancel={handleBigBoxClick}
                footer={null}
                width={500}
                modalRender={(modal) => {
                    return cloneElement(modal, {
                        style: { ...modal.props.style, padding: 0, borderRadius: '20px' },
                    });
                }}
            >
                <AdminAreYouSure onCancel={handleBigBoxClick} onRefund={handleRefund} />
            </Modal>
        </section>
    );
}

export default AdminOrderDetails;