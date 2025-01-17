import './index.scss'
import {IoMdSettings} from "react-icons/io";
import {FaStoreAlt} from "react-icons/fa";
import {AiFillProduct} from "react-icons/ai";

function AdminHomeMenu() {
    return (
        <section id={"adminHomeMenu"}>
            <h1>Lets start to setup!</h1>
            <div className={"wrapper"}>
                <div>
                    <div className={"storeLogo"}>Store Logo</div>
                    <img src={"/src/assets/bg.jpg"} alt={"Image"}/>
                </div>
                <div className={"inputWrapper"}>
                    <div className={"storeNameWrapper"}>
                        <input/>
                        <div className={"storeName"}>Store name</div>
                    </div>
                    <div className={"storeNameWrapper1"}>
                        <div className={"storeName1"}>Store description</div>
                        <textarea rows={3}/>
                    </div>
                </div>
            </div>
            <div className={"wrapper wrapper1"}>
                <div className={"textWrapper1"}>
                    <div className={"blackDot"}></div>
                    <span>Add your first product</span>
                </div>
                <div className={"rightBar"}><AiFillProduct/>Product</div>
            </div>
            <div className={"wrapper wrapper1"}>
                <div className={"textWrapper1"}>
                    <div className={"blackDot"}></div>
                    <span>Customise your store</span>
                </div>
                <div className={"rightBar"}><FaStoreAlt/>Customize Store</div>
            </div>
            <div className={"wrapper wrapper1"}>
                <div className={"textWrapper1"}>
                    <div className={"blackDot"}></div>
                    <span>Add your bank details and personal information</span>
                </div>
                <div className={"rightBar"}><IoMdSettings/>Settings</div>
            </div>
            <div className={"row"}>
                <div className={"col-4"}>
                    <img src={"/src/assets/miniPhoto.png"} alt={"Image"}/>
                    <p>How to customise your store in 10 steps</p>
                    <p className={"p"}>
                        In this tutorial you can customise your store
                        from easy way.
                    </p>
                </div>
                <div className={"col-4"}>
                    <img src={"/src/assets/miniPhoto.png"} alt={"Image"}/>
                    <p>How to customise your store in 10 steps</p>
                    <p className={"p"}>
                        In this tutorial you can customise your store
                        from easy way.
                    </p>
                </div>
                <div className={"col-4"}>
                    <img src={"/src/assets/miniPhoto.png"} alt={"Image"}/>
                    <p>How to customise your store in 10 steps</p>
                    <p className={"p"}>
                        In this tutorial you can customise your store
                        from easy way.
                    </p>
                </div>
                <button>Find more...</button>
            </div>
        </section>
    );
}

export default AdminHomeMenu;