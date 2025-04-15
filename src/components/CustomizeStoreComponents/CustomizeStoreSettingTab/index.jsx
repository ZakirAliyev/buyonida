import "./index.scss";
import { Form, Upload, Button, message } from "antd";
import { MdOutlineFolderCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import {
    useGetPaletteByMarketIdQuery,
    useGetStoreByIdQuery,
    useGetStoreWithSectionsQuery,
    usePostPaletteMutation,
    usePostSettingBrandingMutation,
    useUpdatePaletteMutation,
    useDeletePaletteMutation,
    useSelectPaletteMutation,
    useSelectFontNameMutation,
} from "../../../service/userApi.js";
import CustomColorPicker from "../../CustomColorPicker/index.jsx";

function AccordionItem({ title, children, isOpen, onToggle }) {
    return (
        <div
            className="accordion-item"
            style={{
                borderBottomRightRadius: title === "Font" && "8px",
                borderBottomLeftRadius: title === "Font" && "8px",
                borderTopRightRadius: title === "Brending" && "8px",
                borderTopLeftRadius: title === "Brending" && "8px",
            }}
        >
            <div className="accordion-header" onClick={onToggle}>
                <span>{title}</span>
                <span className={`arrow ${isOpen ? "up" : "down"}`} />
            </div>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
}

function CustomizeStoreSettingTab({ activeMainTab, setCustomLogo, setCustomLogoWidth }) {
    const chosenMarket = parseInt(Cookies.get("chooseMarket"), 10);
    const { data: getPaletteByMarketId, refetch: refetchPalettes } = useGetPaletteByMarketIdQuery(chosenMarket);
    const palette = getPaletteByMarketId?.data || [];

    const { data: getStoreById, refetch: refetchStore } = useGetStoreByIdQuery(Cookies.get("chooseMarket"));
    const store = getStoreById?.data;

    const { data: getStoreWithSectionsByMarketId, refetch: refetchStoreWithSections } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const storeWithSections = getStoreWithSectionsByMarketId?.data;

    const [postPalette] = usePostPaletteMutation();
    const [updatePalette] = useUpdatePaletteMutation();
    const [deletePalette] = useDeletePaletteMutation();
    const [selectPalette] = useSelectPaletteMutation();
    const [postSettingFontName] = useSelectFontNameMutation();
    const [postBranding] = usePostSettingBrandingMutation();

    const [showAddColorForm, setShowAddColorForm] = useState(false);
    const [editingSchemeId, setEditingSchemeId] = useState(null);
    const [selectedPaletteId, setSelectedPaletteId] = useState(null);
    const [openAccordions, setOpenAccordions] = useState({
        Brending: false,
        "Color palette": false,
        Font: false,
    });
    const [logoFileList, setLogoFileList] = useState([]);
    const [faviconFileList, setFaviconFileList] = useState([]);

    const [formData, setFormData] = useState({
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
        buttonTextColor: "",
    });

    const [selectedFont, setSelectedFont] = useState("Poppins");

    const editingPalette = palette?.find((p) => p.id === editingSchemeId);

    const formRef = useRef(null);

    useEffect(() => {
        if (storeWithSections?.selectedPaletId) {
            setSelectedPaletteId(storeWithSections.selectedPaletId);
        } else if (palette && palette.length > 0) {
            setSelectedPaletteId(palette[0].id);
        } else {
            setSelectedPaletteId(null);
        }
    }, [storeWithSections, palette]);

    useEffect(() => {
        if (editingPalette) {
            setFormData({
                id: editingPalette.id,
                marketId: chosenMarket,
                name: editingPalette.name || "",
                textColor: editingPalette.textColor || "",
                backgroundColor: editingPalette.backgroundColor || "",
                cardBgColor: editingPalette.cardBgColor || "",
                cardTextColor: editingPalette.cardTextColor || "",
                footerBgColor: editingPalette.footerBgColor || "",
                footerTextColor: editingPalette.footerTextColor || "",
                navbarBgColor: editingPalette.navbarBgColor || "",
                navbarTextColor: editingPalette.navbarTextColor || "",
                buttonBorderColor: editingPalette.buttonBorderColor || "",
                buttonBgColor: editingPalette.buttonBgColor || "",
                buttonTextColor: editingPalette.buttonTextColor || "",
            });
            if (formRef.current) {
                formRef.current.setFieldsValue({
                    textColor: editingPalette.textColor || "",
                    backgroundColor: editingPalette.backgroundColor || "",
                    cardBgColor: editingPalette.cardBgColor || "",
                    cardTextColor: editingPalette.cardTextColor || "",
                    footerBgColor: editingPalette.footerBgColor || "",
                    footerTextColor: editingPalette.footerTextColor || "",
                    navbarBgColor: editingPalette.navbarBgColor || "",
                    navbarTextColor: editingPalette.navbarTextColor || "",
                    buttonBorderColor: editingPalette.buttonBorderColor || "",
                    buttonBgColor: editingPalette.buttonBgColor || "",
                    buttonTextColor: editingPalette.buttonTextColor || "",
                });
            }
        }
    }, [editingPalette, chosenMarket]);

    // Set the selected font based on the storeWithSections data
    useEffect(() => {
        if (storeWithSections?.fontName) {
            setSelectedFont(storeWithSections.fontName);
        }
    }, [storeWithSections]);

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
            buttonTextColor: "",
        });
        if (formRef.current) {
            formRef.current.resetFields();
        }
    };

    const handleCreate = async () => {
        try {
            const colorValues = await formRef.current.validateFields();
            const paletteData = {
                ...formData,
                ...colorValues,
            };

            const allFilled = Object.values(paletteData).every((value) => value !== "");
            if (!allFilled) {
                message.error("Lütfen tüm alanları doldurun.");
                return;
            }

            const response = await postPalette(paletteData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Palet başarıyla oluşturuldu.");
                refetchPalettes();
                handleClose();
            } else {
                message.error("Palet oluşturulamadı.");
            }
        } catch (error) {
            console.error("Palet oluşturulurken hata oluştu:", error);
            message.error("Palet oluşturulurken hata oluştu.");
        }
    };

    const handleUpdate = async () => {
        try {
            const colorValues = await formRef.current.validateFields();
            const paletteData = {
                ...formData,
                ...colorValues,
            };

            const allFilled = Object.values(paletteData).every((value) => value !== "");
            if (!allFilled) {
                message.error("Lütfen tüm alanları doldurun.");
                return;
            }

            const response = await updatePalette({
                id: editingSchemeId,
                data: paletteData,
            }).unwrap();
            if (response?.statusCode === 201) {
                message.success("Palet başarıyla güncellendi.");
                refetchPalettes();
                if (editingSchemeId === selectedPaletteId) {
                    refetchStoreWithSections();
                }
                handleClose();
            } else {
                message.error("Palet güncellenemedi.");
            }
        } catch (error) {
            console.error("Palet güncellenirken hata oluştu:", error);
            message.error("Palet güncellenirken hata oluştu.");
        }
    };

    const handleSelectPalette = async (id) => {
        setSelectedPaletteId(id);
        console.log(`Palette ${id} selected`);

        try {
            const marketId = Cookies.get("chooseMarket");
            const response = await selectPalette({ marketId, paletId: id }).unwrap();
            if (response?.statusCode === 200) {
                message.success("Palet başarıyla seçildi.");
                refetchStoreWithSections();
            } else {
                message.error("Palet seçilemedi.");
            }
        } catch (error) {
            console.error("Palet seçilirken hata oluştu:", error);
            message.error("Palet seçilirken hata oluştu.");
        }

        handleClose();
    };

    const handleDeletePalette = async (id) => {
        try {
            const response = await deletePalette(id).unwrap();
            if (response?.statusCode === 200) {
                message.success("Palet başarıyla silindi.");
                refetchPalettes();
                refetchStoreWithSections();
                handleClose();
            } else {
                message.error("Palet silinemedi.");
            }
        } catch (error) {
            console.error("Palet silinirken hata oluştu:", error);
            message.error("Palet silinirken hata oluştu.");
        }
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
            buttonTextColor: "",
        });
        if (formRef.current) {
            formRef.current.resetFields();
        }
        setEditingSchemeId(null);
        setShowAddColorForm(true);
    };

    const handleSaveFont = async () => {
        try {
            const marketId = Cookies.get("chooseMarket");
            const fontName = selectedFont;
            const response = await postSettingFontName({ marketId, fontName }).unwrap();
            if (response?.statusCode === 200) {
                message.success("Font başarıyla güncellendi.");
                refetchStore();
            } else {
                message.error("Font güncellenemedi.");
            }
        } catch (error) {
            console.error("Font güncellenirken hata oluştu:", error);
            message.error("Font güncellenirken hata oluştu.");
        }
    };

    useEffect(() => {
        const element = document.getElementById("customizeStoreMarketHomePage");
        if (element) {
            element.style.setProperty("font-family", selectedFont, "important");
        }
    }, [selectedFont]);

    const [aboutStore, setAboutStore] = useState(store?.aboutMarket || "");
    useEffect(() => {
        if (store?.aboutMarket) {
            setAboutStore(store.aboutMarket);
        }
    }, [store]);

    const handleLogoChange = ({ fileList }) => {
        setLogoFileList(fileList);
        if (fileList && fileList.length > 0) {
            const file = fileList[fileList.length - 1];
            if (file.originFileObj) {
                const preview = URL.createObjectURL(file.originFileObj);
                setCustomLogo(preview);
            }
        } else {
            setCustomLogo(null);
        }
    };

    const [localLogoWidth, setLocalLogoWidth] = useState(store?.logoWidth || 100);
    const handleWidthChange = (e) => {
        const newWidth = parseInt(e.target.value, 10);
        setLocalLogoWidth(newWidth);
        setCustomLogoWidth(newWidth);
    };

    useEffect(() => {
        if (store?.logoWidth) {
            setLocalLogoWidth(store.logoWidth);
            setCustomLogoWidth(store.logoWidth);
        }
    }, [store, setCustomLogoWidth]);

    const handleSaveBranding = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("marketId", chosenMarket);
            formDataToSend.append("aboutMarket", aboutStore);
            formDataToSend.append("logoWidth", localLogoWidth);
            if (logoFileList && logoFileList.length > 0 && logoFileList[logoFileList.length - 1].originFileObj) {
                formDataToSend.append("logo", logoFileList[logoFileList.length - 1].originFileObj);
            }
            if (faviconFileList && faviconFileList.length > 0 && faviconFileList[faviconFileList.length - 1].originFileObj) {
                formDataToSend.append("favicon", faviconFileList[faviconFileList.length - 1].originFileObj);
            }
            const response = await postBranding(formDataToSend).unwrap();
            if (response?.statusCode === 200) {
                message.success("Branding başarıyla kaydedildi.");
                refetchStore();
            } else {
                message.error("Branding kaydedilemedi.");
            }
        } catch (error) {
            console.error("Branding gönderilirken hata oluştu:", error);
            message.error("Branding gönderilirken hata oluştu.");
        }
    };

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
                            <Upload
                                customRequest={({ onSuccess }) => {
                                    setTimeout(() => {
                                        onSuccess("ok");
                                    }, 0);
                                }}
                                listType="picture-card"
                                fileList={logoFileList}
                                onChange={handleLogoChange}
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
                        </div>
                        <div className="myWrapper">
                            <div className="name">
                                Width - <span>{localLogoWidth}px</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="300"
                                value={localLogoWidth}
                                onChange={handleWidthChange}
                            />
                        </div>
                        <div className="myWrapper">
                            <div className="name">Favicon</div>
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
                        </div>
                        <div className="myWrapper">
                            <div className="name">About store</div>
                            <textarea
                                type="text"
                                rows={6}
                                value={aboutStore}
                                onChange={(e) => setAboutStore(e.target.value)}
                            />
                        </div>
                        <div className="myWrapper">
                            <Button onClick={handleSaveBranding}>Save Branding</Button>
                        </div>
                    </AccordionItem>

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
                                        <div className="form-group">
                                            <label>Palette Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                                }
                                                required
                                            />
                                        </div>
                                        <Form ref={formRef} initialValues={formData}>
                                            <Form.Item name="textColor" label="Text Color">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, textColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="backgroundColor" label="Background">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, backgroundColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="cardBgColor" label="Card bg">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, cardBgColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="cardTextColor" label="Card text">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, cardTextColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="footerBgColor" label="Footer bg">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, footerBgColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="footerTextColor" label="Footer text">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, footerTextColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="navbarBgColor" label="Navbar bg">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, navbarBgColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="navbarTextColor" label="Navbar text">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, navbarTextColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="buttonBorderColor" label="Button Border">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, buttonBorderColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="buttonBgColor" label="Button bg">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, buttonBgColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item name="buttonTextColor" label="Button text">
                                                <CustomColorPicker
                                                    onChange={(color) =>
                                                        setFormData((prev) => ({ ...prev, buttonTextColor: color }))
                                                    }
                                                />
                                            </Form.Item>
                                        </Form>
                                        <div className="edit-buttons">
                                            <Button onClick={editingSchemeId ? handleUpdate : handleCreate}>
                                                Save
                                            </Button>
                                            {editingSchemeId && (
                                                <Button onClick={() => handleSelectPalette(editingSchemeId)}>
                                                    Select
                                                </Button>
                                            )}
                                            {editingSchemeId && palette.length > 1 && (
                                                <Button onClick={() => handleDeletePalette(editingSchemeId)}>
                                                    Delete
                                                </Button>
                                            )}
                                            <Button onClick={handleClose}>Close</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
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
                                                        {selectedPaletteId === item.id && (
                                                            <FaCheck className="selected-icon" />
                                                        )}
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
                            </>
                        )}
                    </AccordionItem>

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
                                onChange={(e) => {
                                    setSelectedFont(e.target.value);
                                    console.log(selectedFont);
                                }}
                            >
                                <option value="Poppins">Poppins</option>
                                <option value="Space Grotesk">Space Grotesk</option>
                            </select>
                        </div>
                        <div className="myWrapper1">
                            <Button onClick={handleSaveFont}>Save Font</Button>
                        </div>
                    </AccordionItem>
                </div>
            </div>
        </section>
    );
}

export default CustomizeStoreSettingTab;