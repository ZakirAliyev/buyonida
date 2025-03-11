import './index.scss';
import {FaRegBell, FaUser} from "react-icons/fa";
import image1 from "/src/assets/sariLogo.png";
import image2 from "/src/assets/miniPhoto.png";
import {IoStorefrontOutline} from "react-icons/io5";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {FiLogOut} from "react-icons/fi";
import {useGetStoreByIdQuery, useGetUserQuery} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {MARKET_LOGO} from "../../../../constants.js";

function AdminNavbar() {
    const [layerOpen, setLayerOpen] = useState(false);
    const layerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (layerRef.current && !layerRef.current.contains(event.target)) {
            setLayerOpen(false);
        }
    };

    const location = useLocation();

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const navigate = useNavigate();
    const {data: getStoreById} = useGetStoreByIdQuery(Cookies.get('chooseMarket'))
    const store = getStoreById?.data

    const {data: getStore} = useGetUserQuery()
    const user = getStore?.data

    return (
        <section id={"adminNavbar"}>
            <div className={"imageWrapper"}>
                <img
                    src={image1}
                    alt={"Image"} className={"first"} onClick={() => {
                    navigate('/cp')
                }}/>
            </div>
            <div className={"inputWrapper"}>
                <input placeholder={"Search"}/>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <FaRegBell className={"icon"}/>
                <div className={"wrapper"} onClick={() => setLayerOpen(!layerOpen)} style={{
                    backgroundColor: layerOpen && '#FFBB00'
                }}>
                    <div className={"profilePhoto"}>
                        <img src={MARKET_LOGO + store?.logoImageName} alt={"Image"}/>
                    </div>
                    <p>{store?.name}</p>
                </div>
            </div>
            <div
                className={`layer ${layerOpen ? 'open' : ''}`}
                ref={layerRef}
                aria-hidden={!layerOpen}
            >
                {location?.pathname !== '/cp/manage-account' ? (
                    <>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <img src={MARKET_LOGO + store?.logoImageName} alt={"Image"}/>
                                <span>{store?.name}</span>
                            </div>
                            <div className={"box"} onClick={() => {
                                navigate('/choose-market')
                            }}>
                                <IoStorefrontOutline className={"icon"}/>
                                <span>All Stores</span>
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <span>Help Center</span>
                            </div>
                            <div className={"box"}>
                                <span>Tutorials</span>
                            </div>
                            <div className={"box"}>
                                <span>Get help to build</span>
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box box1"}>
                                <span>{user?.name} {user?.surname}</span>
                                <div className={"mail"}>{user?.email}</div>
                            </div>
                            <div className={"box"} onClick={() => {
                                navigate('/cp/manage-account')
                            }}>
                                <span>Manage account</span>
                            </div>
                            <div className={"box logOut"}>
                                <span>Log out</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={"wrapper"}>
                            <div className={"box logOut"} style={{
                                justifyContent: 'space-between'
                            }}>
                                <span style={{
                                    fontWeight: '500'
                                }}>Log out</span>
                                <FiLogOut style={{
                                    rotate: '180deg',
                                    fontWeight: '500'
                                }}/>
                            </div>
                        </div>
                        <div className={"line"}></div>
                        <div className={"wrapper"}>
                            <div className={"box"}>
                                <span>Help Center</span>
                            </div>
                            <div className={"box"}>
                                <span>Tutorials</span>
                            </div>
                            <div className={"box"}>
                                <span>Get help to build</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default AdminNavbar;