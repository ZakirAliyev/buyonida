import './index.scss';
import {FaRegBell, FaUser} from "react-icons/fa";
import image1 from "/src/assets/sariLogo.png";
import image2 from "/src/assets/miniPhoto.png";
import {IoStorefrontOutline} from "react-icons/io5";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

function AdminNavbar() {
    const [layerOpen, setLayerOpen] = useState(false);
    const layerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (layerRef.current && !layerRef.current.contains(event.target)) {
            setLayerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navigate = useNavigate();

    return (
        <section id={"adminNavbar"}>
            <div className={"imageWrapper"}>
                <img
                    src={image1}
                    alt={"Image"} className={"first"}/>
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
                    <div className={"profilePhoto"}><FaUser className={"icon"}/></div>
                    <p>Elvar Aghamaliyev</p>
                </div>
            </div>
            <div
                className={`layer ${layerOpen ? 'open' : ''}`}
                ref={layerRef}
                aria-hidden={!layerOpen}
            >
                <div className={"wrapper"}>
                    <div className={"box"}>
                        <img src={image2} alt={"Image"}/>
                        <span>Store Name</span>
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
                        <span>Name Surname</span>
                        <div className={"mail"}>mailadress@gmail.com</div>
                    </div>
                    <div className={"box"}>
                        <span>Manage account</span>
                    </div>
                    <div className={"box logOut"}>
                        <span>Log out</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminNavbar;