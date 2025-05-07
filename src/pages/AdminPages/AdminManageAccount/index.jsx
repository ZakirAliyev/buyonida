import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import AdminNavbar from "../../../components/AdminComponents/AdminNavbar/index.jsx";
import { LuCircleUserRound } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../../service/userApi.js";
import { USER_LOGO } from "../../../../constants.js";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
function AdminManageAccount() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    data: getUser
  } = useGetUserQuery();
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
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Handle input changes and clear error for the field
  const handleChange = e => {
    const {
      name
    } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validate individual field on blur
  const handleBlur = e => {
    const formData = new FormData(formRef.current);
    const {
      name
    } = e.target;
    const value = formData.get(name)?.toString().trim() || "";
    let newErrors = {
      ...errors
    };
    if (!value) {
      newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1").trim()} is required`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };
  const [loading, setLoading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  // Form submission
  const handleSubmit = async e => {
    e.preventDefault();
    const formDataRaw = new FormData(formRef.current);
    let newErrors = {};

    // Validate all fields
    const fields = ["name", "surname", "email", "mobilNumber", "language", "timeZone"];
    fields.forEach(field => {
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
          theme: "dark"
        });
      }
      setLoading(false);
    } catch (e) {
      toast.error("Error", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark"
      });
      setLoading(false);
    }
  };
  return <>
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
                                    <LuCircleUserRound className="icon" />{t("general_settings")}</div>
                            </div>

                            {/* Details Section */}
                            <div className="main row">
                                <div className="one col-4">{t("details")}</div>
                                <div className="two col-8">
                                    <div className="first">
                                        <img src={profileImage || "https://i.pinimg.com/736x/15/2d/4b/152d4b093faa2ea3af8e098516fbf037.jpg"} alt="Profile" />
                                        <div className="textWrapper">
                                            <div className="text">{t("upload_your_profile_picture")}</div>
                                            <label className="upload-btn">{t("upload_photo")}<input type="file" accept="image/*" onChange={handleImageChange} style={{
                        display: "none"
                      }} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>{t("first_name")}</label>
                                            <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.name && <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.name}
                                                </span>}
                                        </div>
                                        <div className="inputWrapper col-6">
                                            <label>{t("last_name")}</label>
                                            <input type="text" name="surname" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.surname && <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.surname}
                                                </span>}
                                        </div>
                                        <p>{t("use_your_first_and_last_name_as_they_appear_on_your_government_issued_id")}</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>{t("email")}</label>
                                            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.email && <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.email}
                                                </span>}
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                    <div className="row row1">
                                        <div className="inputWrapper col-6">
                                            <label>{t("phone_number")}</label>
                                            <input type="tel" name="mobilNumber" onChange={handleChange} onBlur={handleBlur} />
                                            {errors.mobilNumber && <span className="error">
                                                    <AiOutlineExclamationCircle className="error-icon" />
                                                    {errors.mobilNumber}
                                                </span>}
                                        </div>
                                        <div className="inputWrapper col-6 inputWrapper2">
                                            <div className="updateText">{t("update")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">{t("password")}<h3>{t("if_you_forget_your_password_you_can_reset_it_from_here")}</h3>
                                </div>
                                <div className="two asd col-8">
                                    <h4 onClick={() => navigate("/reset-password")}>{t("reset_password")}</h4>
                                </div>
                            </div>

                            {/* Stores Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">{t("stores")}<h3>{t("view_and_access_stores_connected_to_your_shopify_account")}</h3>
                                </div>
                                <div className="two asd col-8">
                                    <h4 onClick={() => navigate("/choose-market")}>{t("view_all_stores")}</h4>
                                </div>
                            </div>

                            {/* Language Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">{t("preferred_language")}<h3>{t("when_you_re_logged_in_to_buyonida_this_is_the_language_you_will_see_it_doesn_t_affect_the_language_your_customers_see_on_your_online_store")}</h3>
                                </div>
                                <div className="two asd1 col-8">
                                    <label>{t("language")}</label>
                                    <select name="language" onChange={handleChange} onBlur={handleBlur}>
                                        <option value="">{t("select_language")}</option>
                                        <option value="az">{t("az_rbaycan")}</option>
                                        <option value="en">{t("english")}</option>
                                        <option value="ru">{t("russian")}</option>
                                    </select>
                                    {errors.language && <span className="error">
                                            <AiOutlineExclamationCircle className="error-icon" />
                                            {errors.language}
                                        </span>}
                                </div>
                            </div>

                            {/* Time Zone Section */}
                            <div className="lineUzun"></div>
                            <div className="main row">
                                <div className="one col-4">{t("time_zone")}</div>
                                <div className="two asd1 col-8">
                                    <label>{t("timezone")}</label>
                                    <select name="timeZone" onChange={handleChange} onBlur={handleBlur}>
                                        <option value="">{t("select_time_zone")}</option>
                                        <option value="-12">{t("gmt_12_00_international_date_line_west")}</option>
                                        <option value="-11">{t("gmt_11_00_midway_island")}</option>
                                        <option value="-10">{t("gmt_10_00_hawaii")}</option>
                                        <option value="-9">{t("gmt_09_00_alaska")}</option>
                                        <option value="-8">{t("gmt_08_00_pacific_time_us_canada")}</option>
                                        <option value="-7">{t("gmt_07_00_mountain_time_us_canada")}</option>
                                        <option value="-6">{t("gmt_06_00_central_time_us_canada")}</option>
                                        <option value="-5">{t("gmt_05_00_lima_quito")}</option>
                                        <option value="-4">{t("gmt_04_00_santiago")}</option>
                                        <option value="-3">{t("gmt_03_00_montevideo")}</option>
                                        <option value="-2">{t("gmt_02_00_mid_atlantic")}</option>
                                        <option value="-1">{t("gmt_01_00_azores")}</option>
                                        <option value="0">{t("gmt_00_00_edinburgh_london")}</option>
                                        <option value="1">{t("gmt_01_00_copenhagen")}</option>
                                        <option value="2">{t("gmt_02_00_athens")}</option>
                                        <option value="3">{t("gmt_03_00_baghdad")}</option>
                                        <option value="4">{t("gmt_04_00_baku")}</option>
                                        <option value="5">{t("gmt_05_00_ekaterinburg")}</option>
                                        <option value="6">{t("gmt_06_00_astana_dhaka")}</option>
                                        <option value="7">{t("gmt_07_00_bangkok_hanoi")}</option>
                                        <option value="8">{t("gmt_08_00_beijing")}</option>
                                        <option value="9">{t("gmt_09_00_osaka_sapporo_tokyo")}</option>
                                        <option value="10">{t("gmt_10_00_brisbane")}</option>
                                        <option value="11">{t("gmt_11_00_magadan")}</option>
                                        <option value="12">{t("gmt_12_00_auckland_wellington")}</option>
                                        <option value="13">{t("gmt_13_00_nuku_alofa")}</option>
                                    </select>
                                    {errors.timeZone && <span className="error">
                                            <AiOutlineExclamationCircle className="error-icon" />
                                            {errors.timeZone}
                                        </span>}
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
                                    {!loading ? 'Save Changes' : <PulseLoader color={"white"} size={10} />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </>;
}
export default AdminManageAccount;