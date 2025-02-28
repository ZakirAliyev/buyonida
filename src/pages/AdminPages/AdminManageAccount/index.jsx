import React, {useState, useEffect} from "react";
import "./index.scss";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import {LuCircleUserRound} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useGetUserQuery} from "../../../service/userApi.js";
import {USER_LOGO} from "../../../../constants.js";

function AdminManageAccount() {
    const navigate = useNavigate();
    const {data: getUser} = useGetUserQuery();
    const user = getUser?.data;

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        mobilNumber: "",
        language: "az",
        timeZone: "4",
    });

    const [errors, setErrors] = useState({});

    // Update form data once user verileri yüklendiğinde
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                surname: user.surname || "",
                email: user.email || "",
                mobilNumber: user.mobilNumber || "",
                language: user.language || "az",
                timeZone: user.timeZone?.toString() || "4",
            });
        }
    }, [user]);

    // Input değişimlerini yönet
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form validasyonu
    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "First name is required";
        }
        if (!formData.surname.trim()) {
            newErrors.surname = "Last name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!formData.mobilNumber.trim()) {
            newErrors.mobilNumber = "Phone number is required";
        }
        if (!formData.language) {
            newErrors.language = "Language is required";
        }
        if (!formData.timeZone) {
            newErrors.timeZone = "Time zone is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Burada güncelleme API çağrısını gerçekleştirebilirsiniz
        console.log("Updated form data:", formData);
        // Hata mesajlarını temizle
        setErrors({});
    };

    return (
        <>
            <AdminNavbar/>
            <section id="adminManageAccount">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="wrapper">
                            <div className="row">
                                <div className="nav-item nav-item-1 col-12">
                                    <LuCircleUserRound className="icon"/>
                                    General settings
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="main row">
                                <div className="one col-4">Details</div>
                                <div className="two col-8">
                                    <div className="first">
                                        <img
                                            src={USER_LOGO + user?.profileImageName}
                                            alt="Profile"
                                        />
                                        <div className="textWrapper">
                                            <div className="text">Upload your profile picture</div>
                                            <button type="button">Upload photo</button>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>First name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.name && (
                                                <span className="error">{errors.name}</span>
                                            )}
                                        </div>
                                        <div className="inputWrapper col-6">
                                            <label>Last name</label>
                                            <input
                                                type="text"
                                                name="surname"
                                                value={formData.surname}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.surname && (
                                                <span className="error">{errors.surname}</span>
                                            )}
                                        </div>
                                        <p>
                                            Use your first and last name as they appear on your government-issued ID.
                                        </p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.email && (
                                                <span className="error">{errors.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>Phone number</label>
                                            <input
                                                type="tel"
                                                name="mobilNumber"
                                                value={formData.mobilNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.mobilNumber && (
                                                <span className="error">{errors.mobilNumber}</span>
                                            )}
                                        </div>
                                        <div className="inputWrapper col-6 inputWrapper2">
                                            <div className="updateText">Update</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">
                                    Password
                                    <h3>
                                        If you forget your password, you can reset it from here.
                                    </h3>
                                </div>
                                <div className="two asd col-8">
                                    <h4 onClick={() => navigate("/reset-password")}>
                                        Reset password
                                    </h4>
                                </div>
                            </div>

                            {/* Stores Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">
                                    Stores
                                    <h3>
                                        View and access stores connected to your Shopify account.
                                    </h3>
                                </div>
                                <div className="two asd col-8">
                                    <h4 onClick={() => navigate("/choose-market")}>
                                        View all stores
                                    </h4>
                                </div>
                            </div>

                            {/* Language Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">
                                    Preferred language
                                    <h3>
                                        When you're logged in to Buyonida, this is the language you will see.
                                        It doesn't affect the language your customers see on your online store.
                                    </h3>
                                </div>
                                <div className="two asd1 col-8">
                                    <label>Language</label>
                                    <select
                                        name="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select language</option>
                                        <option value="az">Azərbaycan</option>
                                        <option value="en">English</option>
                                        <option value="ru">Russian</option>
                                    </select>
                                    {errors.language && (
                                        <span className="error">{errors.language}</span>
                                    )}
                                </div>
                            </div>

                            {/* Time Zone Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">Time zone</div>
                                <div className="two asd1 col-8">
                                    <label>Timezone</label>
                                    <select
                                        name="timeZone"
                                        value={formData.timeZone}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="-12">(GMT-12:00) International Date Line West</option>
                                        <option value="-11">(GMT-11:00) Midway Island</option>
                                        <option value="-10">(GMT-10:00) Hawaii</option>
                                        <option value="-9">(GMT-09:00) Alaska</option>
                                        <option value="-8">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                        <option value="-7">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                        <option value="-6">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                        <option value="-5">(GMT-05:00) Lima, Quito</option>
                                        <option value="-4">(GMT-04:00) Santiago</option>
                                        <option value="-3">(GMT-03:00) Montevideo</option>
                                        <option value="-2">(GMT-02:00) Mid-Atlantic</option>
                                        <option value="-1">(GMT-01:00) Azores</option>
                                        <option value="0">(GMT+00:00) Edinburgh, London</option>
                                        <option value="1">(GMT+01:00) Copenhagen</option>
                                        <option value="2">(GMT+02:00) Athens</option>
                                        <option value="3">(GMT+03:00) Baghdad</option>
                                        <option value="4">(GMT+04:00) Baku</option>
                                        <option value="5">(GMT+05:00) Ekaterinburg</option>
                                        <option value="6">(GMT+06:00) Astana, Dhaka</option>
                                        <option value="7">(GMT+07:00) Bangkok, Hanoi</option>
                                        <option value="8">(GMT+08:00) Beijing</option>
                                        <option value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
                                        <option value="10">(GMT+10:00) Brisbane</option>
                                        <option value="11">(GMT+11:00) Magadan</option>
                                        <option value="12">(GMT+12:00) Auckland, Wellington</option>
                                        <option value="13">(GMT+13:00) Nuku'alofa</option>
                                    </select>
                                    {errors.timeZone && (
                                        <span className="error">{errors.timeZone}</span>
                                    )}
                                </div>
                            </div>

                            <div className="lineUzun"></div>
                            <div className="main row">
                                <button type="submit">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default AdminManageAccount;
