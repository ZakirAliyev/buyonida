import "./index.scss";
import ImgCrop from "antd-img-crop";
import { Form, Upload, Button } from "antd";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import {
    useGetPaletteByMarketIdQuery,
    usePostPaletteMutation,
    usePostSettingFontNameMutation,
} from "../../../service/userApi.js";
import CustomColorPicker from "../../CustomColorPicker/index.jsx";

function CustomizeStoreSettingTab({ activeMainTab }) {
    const chosenMarket = parseInt(Cookies.get("chooseMarket"), 10);
    const { data: getPaletteByMarketId } = useGetPaletteByMarketIdQuery(chosenMarket);
    const palette = getPaletteByMarketId?.data;

    const [postPalette] = usePostPaletteMutation();
    const [postSettingPalette] = usePostSettingFontNameMutation();

    const [showAddColorForm, setShowAddColorForm] = useState(false);
    const [editingSchemeId, setEditingSchemeId] = useState(null);
    const [openAccordions, setOpenAccordions] = useState({
        Brending: false,
        "Color palette": false,
        Font: false,
    });
    const [logoFileList, setLogoFileList] = useState([]);
    const [faviconFileList, setFaviconFileList] = useState([]);

    // Form verileri (palette adı vb.)
    const [formData, setFormData] = useState({
        marketId: chosenMarket,
        name: "",
        // Renk değerleri (hex kod formatında olmalı)
        textColor: "",
        backgroundColor: "",
        cardBgColor: "",
        cardTextColor: "",
        footerBgColor: "",
        footerTextColor: "",
        navbarBgColor: "",
        navbarTextColor: "",
        buttonBorderColor: "",
        buttonBgColor: "",
        buttonTextColor: ""
    });

    const [selectedFont, setSelectedFont] = useState("Poppins");

    const editingPalette = palette?.find((p) => p.id === editingSchemeId);

    const formRef = useRef(null);

    useEffect(() => {
        if (editingPalette) {
            setFormData({
                name: editingPalette.name || "",
                marketId: chosenMarket,
                textColor: editingPalette.textColor,
                backgroundColor: editingPalette.backgroundColor,
                cardBgColor: editingPalette.cardBgColor,
                cardTextColor: editingPalette.cardTextColor,
                footerBgColor: editingPalette.footerBgColor,
                footerTextColor: editingPalette.footerTextColor,
                navbarBgColor: editingPalette.navbarBgColor,
                navbarTextColor: editingPalette.navbarTextColor,
                buttonBorderColor: editingPalette.buttonBorderColor,
                buttonBgColor: editingPalette.buttonBgColor,
                buttonTextColor: editingPalette.buttonTextColor
            });
            // Düzenleme modunda form alanlarını da güncellemek için:
            formRef.current.setFieldsValue({
                textColor: editingPalette.textColor,
                backgroundColor: editingPalette.backgroundColor,
                cardBgColor: editingPalette.cardBgColor,
                cardTextColor: editingPalette.cardTextColor,
                footerBgColor: editingPalette.footerBgColor,
                footerTextColor: editingPalette.footerTextColor,
                navbarBgColor: editingPalette.navbarBgColor,
                navbarTextColor: editingPalette.navbarTextColor,
                buttonBorderColor: editingPalette.buttonBorderColor,
                buttonBgColor: editingPalette.buttonBgColor,
                buttonTextColor: editingPalette.buttonTextColor,
            });
        }
    }, [editingPalette, chosenMarket]);

    useEffect(() => {
        console.log(formData);
    }, []);

    function AccordionItem({ title, children, isOpen, onToggle }) {
        return (
            <div className="accordion-item">
                <div className="accordion-header" onClick={onToggle}>
                    <span>{title}</span>
                    <span className={`arrow ${isOpen ? "up" : "down"}`} />
                </div>
                {isOpen && <div className="accordion-content">{children}</div>}
            </div>
        );
    }

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onPreviewFile = onPreview;

    const handleClose = () => {
        setEditingSchemeId(null);
        setShowAddColorForm(false);
    };

    const handleSave = async () => {
        try {
            // Form içindeki renk değerlerini alıyoruz. Bu değerlerin hex kod formatında olduğunu varsayıyoruz.
            const colorValues = await formRef.current.validateFields();
            // paletteData nesnesini formData ve formdaki renk değerlerinden oluşturuyoruz.
            const paletteData = {
                ...formData,
                ...colorValues,
            };

            // JSON'u kontrol amaçlı ekrana bastırıyoruz
            console.log(JSON.stringify(paletteData, null, 2));

            // Tüm alanların dolu olup olmadığını kontrol ediyoruz
            const allFilled = Object.values(paletteData).every((value) => value !== "");
            if (!allFilled) {
                alert("Lütfen tüm alanları doldurun.");
                console.log(paletteData);
                return;
            }
            const response = await postPalette(paletteData).unwrap();
            if (response?.statusCode === 200) {
                alert("Palet başarıyla kaydedildi.");
            } else {
                alert("Bir hata oluştu.");
            }
        } catch (error) {
            console.error("Palet gönderilirken hata oluştu:", error);
            alert("Palet gönderilirken hata oluştu.");
        }
        setEditingSchemeId(null);
        setShowAddColorForm(false);
    };

    const toggleAddColorForm = () => {
        setFormData({
            marketId: chosenMarket,
            name: "",
            textColor: "",
            backgroundColor: "",
            cardBgColor: "",
            cardTextColor: "",
            footerBgColor: "",
            footerTextColor: "",
            navbarBgColor: "",
            navbarTextColor: "",
            buttonBorderColor: "",
            buttonBgColor: "",
            buttonTextColor: ""
        });
        if (formRef.current) {
            formRef.current.resetFields();
        }
        setShowAddColorForm((prev) => !prev);
    };

    const handleUpdatePalette = async () => {
        try {
            const marketId = Cookies.get("chooseMarket");
            const response = await postSettingPalette({ marketId, selectedFont }).unwrap();
            if (response?.statusCode === 200) {
                alert("Palet başarıyla güncellendi.");
            } else {
                alert("Bir hata oluştu.");
            }
        } catch (error) {
            console.error("Palet güncellenirken hata oluştu:", error);
            alert("Palet güncellenirken hata oluştu.");
        }
        setEditingSchemeId(null);
        setShowAddColorForm(false);
    };

    useEffect(() => {
        const element = document.getElementById("customizeStoreMarketHomePage");
        if (element) {
            element.style.setProperty("font-family", selectedFont, "important");
        }
    }, [selectedFont]);

    useEffect(() => {
        console.log("CustomizeStoreSettingTab çalışıyor...");
    }, []);

    return (
        <section id="customizeStoreSettingTab">
            <div style={{ display: activeMainTab === "settings" ? "block" : "none" }}>
                <div className="settingsContent">
                    <AccordionItem
                        title="Brending"
                        isOpen={openAccordions["Brending"]}
                        onToggle={() =>
                            setOpenAccordions((prev) => ({
                                ...prev,
                                Brending: !prev["Brending"],
                            }))
                        }
                    >
                        <div className="myWrapper">
                            <div className="name">Logo</div>
                            <ImgCrop rotationSlider>
                                <Upload
                                    customRequest={({ onSuccess }) => {
                                        setTimeout(() => {
                                            onSuccess("ok");
                                        }, 0);
                                    }}
                                    listType="picture-card"
                                    fileList={logoFileList}
                                    onChange={({ fileList }) => setLogoFileList(fileList)}
                                    onPreview={onPreviewFile}
                                    maxCount={1}
                                >
                                    {logoFileList.length < 1 && (
                                        <>
                                            <span>Select</span>
                                            <MdOutlineFolderCopy />
                                        </>
                                    )}
                                </Upload>
                            </ImgCrop>
                        </div>

                        <div className="myWrapper">
                            <div className="name">Width</div>
                            <input type="range" min="3" max="6" step="1" />
                        </div>

                        <div className="myWrapper">
                            <div className="name">Favicon</div>
                            <ImgCrop rotationSlider>
                                <Upload
                                    customRequest={({ onSuccess }) => {
                                        setTimeout(() => {
                                            onSuccess("ok");
                                        }, 0);
                                    }}
                                    listType="picture-card"
                                    fileList={faviconFileList}
                                    onChange={({ fileList }) => setFaviconFileList(fileList)}
                                    onPreview={onPreviewFile}
                                    maxCount={1}
                                >
                                    {faviconFileList.length < 1 && (
                                        <>
                                            <span>Select</span>
                                            <MdOutlineFolderCopy />
                                        </>
                                    )}
                                </Upload>
                            </ImgCrop>
                        </div>

                        <div className="myWrapper">
                            <div className="name">About store</div>
                            <textarea type="text" rows={3} />
                        </div>
                    </AccordionItem>

                    {/* Color Palette Accordion */}
                    <AccordionItem
                        title="Color palette"
                        isOpen={openAccordions["Color palette"]}
                        onToggle={() =>
                            setOpenAccordions((prev) => ({
                                ...prev,
                                "Color palette": !prev["Color palette"],
                            }))
                        }
                    >
                        {(editingSchemeId || showAddColorForm) ? (
                            <div className="row">
                                <div className="col-12">
                                    <div className="edit-form">
                                        <h3>
                                            {editingSchemeId
                                                ? `Edit Palette - ${editingPalette?.name}`
                                                : "Add New Palette"}
                                        </h3>
                                        {/* Palette Name */}
                                        <div className="form-group">
                                            <label>Palette Name</label>
                                            <input
                                                type="text"
                                                defaultValue={formData.name}
                                                onBlur={(e) =>
                                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                                }
                                                required
                                            />
                                        </div>
                                        {/* Renk seçiciler için tek form */}
                                        <Form ref={formRef} initialValues={formData}>
                                            <Form.Item name="textColor" label="Text Color">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="backgroundColor" label="Navbar bg">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="cardBgColor" label="Navbar text">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="cardTextColor" label="Background">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="footerBgColor" label="Card bg">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="footerTextColor" label="Card text">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="navbarBgColor" label="Footer bg">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="navbarTextColor" label="Footer text">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="buttonBorderColor" label="Button Border">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="buttonBgColor" label="Button bg">
                                                <CustomColorPicker />
                                            </Form.Item>
                                            <Form.Item name="buttonTextColor" label="Button text">
                                                <CustomColorPicker />
                                            </Form.Item>
                                        </Form>
                                        <div className="edit-buttons">
                                            <Button onClick={handleSave}>Save</Button>
                                            <Button onClick={handleClose}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Normal modda mevcut paletlerin ve ekleme butonunun gösterimi
                            <div className="row">
                                {palette &&
                                    palette.length > 0 &&
                                    palette.map((item) => (
                                        <div key={item.id} className="col-4">
                                            <div
                                                className="wrapper2"
                                                onClick={() => setEditingSchemeId(item.id)}
                                            >
                                                <div
                                                    className="box"
                                                    style={{
                                                        backgroundColor: item.backgroundColor,
                                                        color: item.textColor,
                                                    }}
                                                >
                                                    Aa
                                                    <div style={{ display: "flex", gap: "5px" }}>
                                                        <div
                                                            className="rengBoxu"
                                                            style={{ backgroundColor: item.navbarBgColor }}
                                                        ></div>
                                                        <div
                                                            className="rengBoxu"
                                                            style={{ backgroundColor: item.navbarTextColor }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="myName">{item.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                {!showAddColorForm && editingSchemeId === null && (
                                    <div className="col-4">
                                        <div
                                            className="wrapper2"
                                            onClick={toggleAddColorForm}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="box box1 plus">+</div>
                                            <div className="myName">Add color</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </AccordionItem>

                    {/* Font Accordion */}
                    <AccordionItem
                        title="Font"
                        isOpen={openAccordions["Font"]}
                        onToggle={() =>
                            setOpenAccordions((prev) => ({
                                ...prev,
                                Font: !prev["Font"],
                            }))
                        }
                    >
                        <div className="myWrapper1">
                            <div className="name">Choose font family</div>
                            <select
                                value={selectedFont}
                                onChange={(e) => setSelectedFont(e.target.value)}
                            >
                                <option value="Poppins">Poppins</option>
                                <option value="Space Grotesk">Space Grotesk</option>
                            </select>
                        </div>
                    </AccordionItem>
                </div>
                <Button onClick={handleUpdatePalette}>save palet</Button>
            </div>
        </section>
    );
}

export default CustomizeStoreSettingTab;
