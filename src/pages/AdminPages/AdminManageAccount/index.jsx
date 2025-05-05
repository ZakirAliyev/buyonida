import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import { LuCircleUserRound } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {useGetUserQuery, useUpdateUserMutation} from "../../../service/userApi.js";
import { USER_LOGO } from "../../../../constants.js";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import {PulseLoader} from "react-spinners";
import {Helmet} from "react-helmet-async";

function AdminManageAccount() {
    const navigate = useNavigate();
    const { data: getUser } = useGetUserQuery();
    const user = getUser?.data;

    const [errors, setErrors] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        if (user) {
            const defaultImage = "https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg";
            const imageUrl = user.profileImageName ? `${USER_LOGO}${user.profileImageName}` : defaultImage;
            setProfileImage(imageUrl);

            // Pre-fill the form with user data
            if (formRef.current) {
                formRef.current.querySelector('input[name="name"]').value = user.name || "";
                formRef.current.querySelector('input[name="surname"]').value = user.surname || "";
                formRef.current.querySelector('input[name="email"]').value = user.email || "";
                formRef.current.querySelector('input[name="mobilNumber"]').value = user.mobilNumber || "";
                formRef.current.querySelector('select[name="language"]').value = user.language || "";
                formRef.current.querySelector('select[name="timeZone"]').value = user.timeZone?.toString() || "";
            }
        }
    }, [user]);

    // Handle file input change for profile image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // Handle input changes and clear error for the field
    const handleChange = (e) => {
        const { name } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Validate individual field on blur
    const handleBlur = (e) => {
        const formData = new FormData(formRef.current);
        const { name } = e.target;
        const value = formData.get(name)?.toString().trim() || "";

        let newErrors = { ...errors };

        if (!value) {
            newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1").trim()} is required`;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const [loading, setLoading] = useState(false);
    const [updateUser] = useUpdateUserMutation()

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataRaw = new FormData(formRef.current);
        let newErrors = {};

        // Validate all fields
        const fields = ["name", "surname", "email", "mobilNumber", "language", "timeZone"];
        fields.forEach((field) => {
            const value = formDataRaw.get(field)?.toString().trim() || "";
            if (!value) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1").trim()} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // Create a new FormData and manually append fields
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formDataRaw.get("name")?.toString().trim() || "");
        formDataToSubmit.append("surname", formDataRaw.get("surname")?.toString().trim() || "");
        formDataToSubmit.append("email", formDataRaw.get("email")?.toString().trim() || "");
        formDataToSubmit.append("mobilNumber", formDataRaw.get("mobilNumber")?.toString().trim() || "");
        formDataToSubmit.append("language", formDataRaw.get("language")?.toString().trim() || "");
        formDataToSubmit.append("timeZone", formDataRaw.get("timeZone")?.toString().trim() || "");

        // Append profile image if uploaded
        const fileInput = formRef.current.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formDataToSubmit.append("profileImage", fileInput.files[0]);
        }

        try {
            setLoading(true);
            const response = await updateUser(formDataToSubmit).unwrap();
            if (response.statusCode === 200) {
                toast.success("Ugurla deyisdirildi!", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: "dark",
                });
            }
            setLoading(false);
        } catch (e) {
            toast.error("Error", {
                position: "bottom-right",
                autoClose: 2500,
                theme: "dark",
            });
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{'Manage Account Page'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <AdminNavbar />
            <section id="adminManageAccount">
                <div className="container">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="wrapper">
                            <div className="row">
                                <div className="nav-item nav-item-1 col-12">
                                    <LuCircleUserRound className="icon" />
                                    General settings
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="main row">
                                <div className="one col-4">Details</div>
                                <div className="two col-8">
                                    <div className="first">
                                        <img
                                            src={profileImage || "https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg"}
                                            alt="Profile"
                                        />
                                        <div className="textWrapper">
                                            <div className="text">Upload your profile picture</div>
                                            <label className="upload-btn">
                                                Upload photo
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>First name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && (
                                                <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="inputWrapper col-6">
                                            <label>Last name</label>
                                            <input
                                                type="text"
                                                name="surname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.surname && (
                                                <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.surname}
                                                </span>
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
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && (
                                                <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.email}
                                                </span>
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
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.mobilNumber && (
                                                <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.mobilNumber}
                                                </span>
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">Select language</option>
                                        <option value="az">Azərbaycan</option>
                                        <option value="en">English</option>
                                        <option value="ru">Russian</option>
                                    </select>
                                    {errors.language && (
                                        <span className="error">
                                            <AiOutlineExclamationCircle className="error-icon" />
                                            {errors.language}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Time Zone Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">
                                    Time zone
                                </div>
                                <div className="two asd1 col-8">
                                    <label>Timezone</label>
                                    <select
                                        name="timeZone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <option value="">Select time zone</option>
                                        <option value="-12">(GMT-12:00) International Date Line West</option>
                                        <option value="-11">(GMT-11:00) Midway Island</option>
                                        <option value="-10">(GMT-10:00) Hawaii</option>
                                        <option value="-9">(GMT-09:00) Alaska</option>
                                        <option value="-8">(GMT-08:00) Pacific Time (US & Canada)</option>
                                        <option value="-7">(GMT-07:00) Mountain Time (US & Canada)</option>
                                        <option value="-6">(GMT-06:00) Central Time (US & Canada)</option>
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
                                        <span className="error">
                                            <AiOutlineExclamationCircle className="error-icon" />
                                            {errors.timeZone}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="lineUzun"></div>
                            <div className="main row">
                                <button type="submit" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 47
                                }}>
                                    {!loading ? 'Save Changes' : <PulseLoader color={"white"} size={10}/>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default AdminManageAccount;