import './index.scss'
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import {LuCircleUserRound} from "react-icons/lu";
import image1 from "/src/assets/bg.jpg"
import {useNavigate} from "react-router-dom";

function AdminManageAccount() {

    const navigate = useNavigate()

    return (
        <>
            <AdminNavbar/>
            <section id={"adminManageAccount"}>
                <div className={"container"}>
                    <div className={"wrapper"}>
                        <div className={"row"}>
                            <div className={"nav-item nav-item-1 col-12"}>
                                <LuCircleUserRound className={"icon"}/>
                                General settings
                            </div>
                        </div>
                        <div className={"main row"}>
                            <div className={"one col-4"}>
                                Details
                            </div>
                            <div className={"two col-8"}>
                                <div className={"first"}>
                                    <img src={image1} alt={"Image"}/>
                                    <div className={"textWrapper"}>
                                        <div className={"text"}>Upload your profile picture</div>
                                        <button>Upload photo</button>
                                    </div>
                                </div>
                                <div className={"line"}></div>
                                <div className={"row row1"}>
                                    <div className={"inputWrapper col-6"}>
                                        <label>First name</label>
                                        <input/>
                                    </div>
                                    <div className={"inputWrapper col-6"}>
                                        <label>Last name</label>
                                        <input/>
                                    </div>
                                    <p>Use your first and last name as they appear on your goverment-issued İD.</p>
                                </div>
                                <div className={"line"}></div>
                                <div className={"row row1"}>
                                    <div className={"inputWrapper col-6"}>
                                        <label>Email</label>
                                        <input/>
                                    </div>
                                </div>
                                <div className={"line"}></div>
                                <div className={"row row1"}>
                                    <div className={"inputWrapper col-6"}>
                                        <label>Phone number</label>
                                        <input/>
                                    </div>
                                    <div className={"inputWrapper col-6 inputWrapper2"}>
                                        <div className={"updateText"}>Update</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"lineUzun"}></div>
                        <div className={"main row"}>
                            <div className={"one col-4"}>
                                Password
                                <h3>If you forget your password you can
                                    reset from here</h3>
                            </div>
                            <div className={"two asd col-8"}>
                                <h4 onClick={() => {
                                    navigate('/reset-password')
                                }}>Reset password</h4>
                            </div>
                        </div>
                        <div className={"lineUzun"}></div>
                        <div className={"main row"}>
                            <div className={"one col-4"}>
                                Stores
                                <h3>View and access stores connected to your
                                    Shopify account.</h3>
                            </div>
                            <div className={"two asd col-8"}>
                                <h4 onClick={() => {
                                    navigate('/choose-market')
                                }}>Wiew all stores</h4>
                            </div>
                        </div>
                        <div className={"lineUzun"}></div>
                        <div className={"main row"}>
                            <div className={"one col-4"}>
                                Prefered language
                                <h3>When you're logged in to Buyonida, this is the language you
                                    will see. It doesn't affect the language your
                                    customers see on your online store.</h3>
                            </div>
                            <div className={"two asd1 col-8"}>
                                <lebel>Language</lebel>
                                <select>
                                    <option>Select language</option>
                                    <option>Azərbaycan</option>
                                    <option>English</option>
                                    <option>Russian</option>
                                </select>
                            </div>
                        </div>
                        <div className={"lineUzun"}></div>
                        <div className={"main row"}>
                            <div className={"one col-4"}>
                                Time zone
                            </div>
                            <div className={"two asd1 col-8"}>
                                <lebel>Timezone</lebel>
                                <select>
                                    <option>Select time</option>
                                    <option>Azərbaycan</option>
                                    <option>English</option>
                                    <option>Russian</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminManageAccount;