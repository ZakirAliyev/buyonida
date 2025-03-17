import {useState, useEffect} from "react";
import "./index.scss";
import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import SectionsManager from "../SectionsManager/index.jsx";
import CustomizeStoreMarketHomePage from "../CustomizeStoreMarketHomePage/index.jsx";
import {RxCross2} from "react-icons/rx";
import {HiOutlinePlusSm} from "react-icons/hi";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {Upload, message} from "antd";
import ImgCrop from "antd-img-crop";
import "/src/assets/mohtesem.jpg";
import {
    useGetStoreWithSectionsQuery,
    usePostBannerItemMutation,
    usePutSectionsMutation,
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {BANNER_LOGO} from "../../../../constants.js";
import {MdOutlineFolderCopy} from "react-icons/md";

/** --- Add a simple Accordion component here --- **/
function AccordionItem({title, children}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={() => setOpen(!open)}>
                <span>{title}</span>
                <span className={`arrow ${open ? "up" : "down"}`}/>
            </div>
            {open && <div className="accordion-content">{children}</div>}
        </div>
    );
}

function CustomizeStoreScreens() {
    const {data: storeData, refetch} = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const sectionsData = storeData?.data;

    const [postBannerItem] = usePostBannerItemMutation();
    const marketId = Cookies.get("chooseMarket");
    const [putSections] = usePutSectionsMutation();

    // Banner sekmeleri için state'ler
    const [tabs, setTabs] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);

    // Ana sekme: "sections" veya "settings"
    const [activeMainTab, setActiveMainTab] = useState("sections");

    // SectionsManager'den alınan güncellenmiş bölümler (category ve collection)
    const [updatedSections, setUpdatedSections] = useState([]);
    // Silinen bölüm id'lerini tutan state
    const [deletedIds, setDeletedIds] = useState([]);

    // Dosya inputları için state’ler (Brending bölümünde logo ve favicon için)
    const [logoFileList, setLogoFileList] = useState([]);
    const [faviconFileList, setFaviconFileList] = useState([]);

    async function handleBannerSave() {
        try {
            await postBannerItem().unwrap();
            message.success("Banner saved successfully!");
        } catch (error) {
            message.error("Banner save failed!");
            console.error(error);
        }
    }

    // İlk yüklemede API'den gelen banner verilerini alıp tabData'ya aktarıyoruz.
    useEffect(() => {
        if (sectionsData && tabs.length === 0) {
            const bannerSection = sectionsData.sections?.find(
                (section) => section.sectionType === "Banner"
            );
            if (bannerSection) {
                const swipers =
                    bannerSection?.bannerItems?.map((item) => ({
                        id: item.id,
                        title: item.title,
                        subTitle: item.subtitle,
                        buttonLink: item.buttonLink,
                        displayOrderId: item.displayOrderId,
                        image: [
                            {
                                uid: item.id,
                                name: item.imageName,
                                status: "done",
                                url: `${BANNER_LOGO}${item.imageName}`,
                            },
                        ],
                    })) || [];

                const sortedSwipers = [...swipers].sort((a, b) => a.displayOrderId - b.displayOrderId);

                const initialTabData = sortedSwipers.map((item) => ({
                    id: item.id,
                    title: item.title,
                    subTitle: item.subTitle,
                    buttonLink: item.buttonLink,
                    displayOrderId: item.displayOrderId,
                    image: [
                        {
                            uid: item.image[0]?.uid || item.id,
                            name: item.image[0]?.name || `image-${item.id}.jpg`,
                            status: item.image[0]?.status || "done",
                            url: item.image[0]?.url || "",
                        },
                    ],
                }));

                setTabs(initialTabData);
                setTabData(initialTabData);
            }
        }
    }, [sectionsData, tabs.length]);

    // Final JSON oluşturulması (console log için)
    useEffect(() => {
        const bannerSectionFromAPI = sectionsData?.sections?.find(
            (section) => section.sectionType === "Banner"
        );
        const bannerSectionsJson = {
            bannerSections: [
                {
                    id: bannerSectionFromAPI ? bannerSectionFromAPI.id : null,
                    marketId: sectionsData ? sectionsData.id : null,
                    displayOrderId: bannerSectionFromAPI?.displayOrderId || 1,
                    sectionType: "Banner",
                },
            ],
        };

        const categorySections = updatedSections
            .filter((section) => section.type === "category")
            .map((section) => ({
                id: section.id || null,
                marketId: sectionsData ? sectionsData.id : null,
                displayOrderId: section.displayOrderId,
                sectionType: "Category",
                categoryId: section.categoryId,
                displayColumns: section.cardsInRow,
            }));

        const collectionSections = updatedSections
            .filter((section) => section.type === "collection")
            .map((section) => ({
                id: section.id || null,
                marketId: sectionsData ? sectionsData.id : null,
                displayOrderId: section.displayOrderId,
                sectionType: "Collection",
                collectionId: section.collectionId,
                displayColumns: section.cardsInRow,
            }));

        const finalJson = {
            ...bannerSectionsJson,
            categorySections,
            collectionSections,
            deleteSectionIds: deletedIds,
        };

        console.log("Updated JSON:", JSON.stringify(finalJson, null, 2));
    }, [tabData, updatedSections, sectionsData, deletedIds]);

    // Final JSON hesaplamak için yardımcı fonksiyon:
    function getFinalJson() {
        const bannerSectionFromAPI = sectionsData?.sections?.find(
            (section) => section.sectionType === "Banner"
        );
        const bannerSectionsJson = {
            bannerSections: [
                {
                    id: bannerSectionFromAPI ? bannerSectionFromAPI.id : null,
                    marketId: sectionsData ? sectionsData.id : null,
                    displayOrderId: bannerSectionFromAPI?.displayOrderId || 1,
                    sectionType: "Banner",
                    bannerItems: tabData.map((item) => ({
                        id: item.id,
                        title: item.title,
                        subTitle: item.subTitle,
                        buttonLink: item.buttonLink,
                        displayOrderId: item.displayOrderId,
                        image: item.image,
                    })),
                },
            ],
        };

        const categorySections = updatedSections
            .filter((section) => section.type === "category")
            .map((section) => ({
                id: section.id || null,
                marketId: sectionsData ? sectionsData.id : null,
                displayOrderId: section.displayOrderId,
                sectionType: "Category",
                categoryId: section.categoryId,
                displayColumns: section.cardsInRow,
            }));

        const collectionSections = updatedSections
            .filter((section) => section.type === "collection")
            .map((section) => ({
                id: section.id || null,
                marketId: sectionsData ? sectionsData.id : null,
                displayOrderId: section.displayOrderId,
                sectionType: "Collection",
                collectionId: section.collectionId,
                displayColumns: section.cardsInRow,
            }));

        return {
            ...bannerSectionsJson,
            categorySections,
            collectionSections,
            deleteSectionIds: deletedIds,
        };
    }

    async function handlePutSection(finalJson) {
        try {
            const response = await putSections({marketId, data: finalJson}).unwrap();
            if (response?.statusCode === 200) {
                message.success("Save successful!");
                refetch();
            } else {
                message.error("Save failed!");
            }
        } catch (error) {
            message.error("Save failed!");
            console.error(error);
        }
    }

    // finalSections: CustomizeStoreMarketHomePage'e geçmek için
    const finalSections = {
        categorySections: updatedSections.filter((section) => section.type === "category"),
        collectionSections: updatedSections.filter((section) => section.type === "collection"),
    };

    const updateTabData = (id, field, value) => {
        setTabData((prev) =>
            prev.map((item) => (item.id === id ? {...item, [field]: value} : item))
        );
    };

    const onImageChange = (tabId) => ({fileList: newFileList}) => {
        setTabData((prev) =>
            prev.map((item) =>
                item.id === tabId ? {...item, image: newFileList.slice(-1)} : item
            )
        );
    };

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

    // onPreview fonksiyonunu logo ve favicon için de kullanıyoruz
    const onPreviewFile = onPreview;

    const addTab = () => {
        if (tabs.length < 3) {
            const usedOrders = tabs.map((tab) => tab.displayOrderId);
            const available = [1, 2, 3].filter((n) => !usedOrders.includes(n));
            const newOrder = available.length ? Math.min(...available) : tabs.length + 1;
            const newTab = {
                id: null,
                label: `Pic ${newOrder}`,
                displayOrderId: newOrder,
            };
            setTabs([...tabs, newTab]);
            setTabData((prev) => [
                ...prev,
                {
                    id: null,
                    title: "",
                    subTitle: "",
                    buttonLink: "Winter collection",
                    displayOrderId: newOrder,
                    image: [],
                },
            ]);
            setActiveBannerIndex(tabs.length);
        }
    };

    const removeTab = (index) => {
        if (tabs.length === 1) return;
        const tabToRemove = tabs[index];
        const newTabs = tabs.filter((_, i) => i !== index);
        const updatedTabs = newTabs.map((tab, idx) => ({
            ...tab,
            displayOrderId: idx + 1,
            label: `Pic ${idx + 1}`,
        }));
        setTabs(updatedTabs);
        setTabData((prev) => {
            const newData = prev
                .filter((item) => item.id !== tabToRemove.id)
                .map((item, idx) => ({...item, displayOrderId: idx + 1}));
            return newData;
        });
        if (activeBannerIndex >= updatedTabs.length) {
            setActiveBannerIndex(updatedTabs.length - 1);
        }
    };

    const moveTabLeft = (index) => {
        if (index > 0) {
            const newTabs = [...tabs];
            [newTabs[index - 1], newTabs[index]] = [newTabs[index], newTabs[index - 1]];
            const updatedTabs = newTabs.map((tab, idx) => ({
                ...tab,
                displayOrderId: idx + 1,
                label: `Pic ${idx + 1}`,
            }));
            setTabs(updatedTabs);
            setTabData((prev) => {
                const newData = [...prev];
                updatedTabs.forEach((tab, idx) => {
                    const dataIndex = newData.findIndex((item) => item.id === tab.id);
                    if (dataIndex !== -1) {
                        newData[dataIndex].displayOrderId = idx + 1;
                    }
                });
                return newData;
            });
            if (activeBannerIndex === index) {
                setActiveBannerIndex(index - 1);
            } else if (activeBannerIndex === index - 1) {
                setActiveBannerIndex(index);
            }
        }
    };

    const moveTabRight = (index) => {
        if (index < tabs.length - 1) {
            const newTabs = [...tabs];
            [newTabs[index], newTabs[index + 1]] = [newTabs[index + 1], newTabs[index]];
            const updatedTabs = newTabs.map((tab, idx) => ({
                ...tab,
                displayOrderId: idx + 1,
                label: `Pic ${idx + 1}`,
            }));
            setTabs(updatedTabs);
            setTabData((prev) => {
                const newData = [...prev];
                updatedTabs.forEach((tab, idx) => {
                    const dataIndex = newData.findIndex((item) => item.id === tab.id);
                    if (dataIndex !== -1) {
                        newData[dataIndex].displayOrderId = idx + 1;
                    }
                });
                return newData;
            });
            if (activeBannerIndex === index) {
                setActiveBannerIndex(index + 1);
            } else if (activeBannerIndex === index + 1) {
                setActiveBannerIndex(index);
            }
        }
    };

    const getTabData = (id) => tabData.find((item) => item.id === id) || {};
    const [showAddColorForm, setShowAddColorForm] = useState(false);

    const toggleAddColorForm = () => {
        setShowAddColorForm((prev) => !prev);
    };
    return (
        <section id="customizeStoreScreens">
            <div className="row">
                <div className="firstScreen col-14-60 my-scrollable-element">
                    <div className="row main-tabs">
                        <div
                            className={`pd-8 col-6 clickable ${activeMainTab === "sections" ? "active" : ""}`}
                            onClick={() => setActiveMainTab("sections")}
                        >
                            Sections
                        </div>
                        <div
                            className={`pd-8 col-6 clickable ${activeMainTab === "settings" ? "active" : ""}`}
                            onClick={() => setActiveMainTab("settings")}
                        >
                            Settings
                        </div>
                    </div>

                    {/* SECTIONS TAB */}
                    <div style={{display: activeMainTab === "sections" ? "block" : "none"}}>
                        <div className="heroSettings">
                            <Tabs selectedIndex={activeBannerIndex} onSelect={(index) => setActiveBannerIndex(index)}>
                                <TabList>
                                    {tabs.map((tab, index) => (
                                        <Tab key={index}>
                                            {tab.label}
                                            {index > 0 && (
                                                <FiArrowLeft
                                                    className="csicon arrow-icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveTabLeft(index);
                                                    }}
                                                />
                                            )}
                                            {index < tabs.length - 1 && (
                                                <FiArrowRight
                                                    className="csicon arrow-icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveTabRight(index);
                                                    }}
                                                />
                                            )}
                                            {tabs.length > 1 && (
                                                <RxCross2
                                                    className="csicon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeTab(index);
                                                    }}
                                                />
                                            )}
                                        </Tab>
                                    ))}
                                    {tabs.length < 3 && <HiOutlinePlusSm onClick={addTab} className="csplus"/>}
                                </TabList>

                                {tabs.map((tab, index) => (
                                    <TabPanel key={index}>
                                        <div className="inputWrapper">
                                            <div className="label">Title</div>
                                            <input
                                                value={getTabData(tab.id)?.title || ""}
                                                onChange={(e) => updateTabData(tab.id, "title", e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Sub-title</div>
                                            <input
                                                value={getTabData(tab.id)?.subTitle || ""}
                                                onChange={(e) => updateTabData(tab.id, "subTitle", e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Button link</div>
                                            <select
                                                value={getTabData(tab.id)?.buttonLink || "Winter collection"}
                                                onChange={(e) =>
                                                    updateTabData(tab.id, "buttonLink", e.target.value)
                                                }
                                            >
                                                <option value="Winter collection">Winter collection</option>
                                                <option value="Spring collection">Spring collection</option>
                                                <option value="Summer collection">Summer collection</option>
                                            </select>
                                        </div>
                                        <div
                                            className="inputWrapper"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div className="label">Image</div>
                                            <ImgCrop rotationSlider>
                                                <Upload
                                                    customRequest={({file, onSuccess}) => {
                                                        setTimeout(() => {
                                                            onSuccess("ok");
                                                        }, 0);
                                                    }}
                                                    listType="picture-card"
                                                    fileList={getTabData(tab.id)?.image || []}
                                                    onChange={onImageChange(tab.id)}
                                                    onPreview={onPreview}
                                                    maxCount={1}
                                                >
                                                    {(getTabData(tab.id)?.image || []).length < 1 && "+ Upload"}
                                                </Upload>
                                            </ImgCrop>
                                        </div>
                                    </TabPanel>
                                ))}
                            </Tabs>
                            <button onClick={handleBannerSave}>Save Banner</button>
                        </div>

                        {/* Sections Manager */}
                        <SectionsManager
                            onSectionsChange={setUpdatedSections}
                            onDeletedIdsChange={setDeletedIds}
                        />

                        {/* Tüm veriyi putSections'a gönder */}
                        <button className="save-sections-btn" onClick={() => handlePutSection(getFinalJson())}>
                            Save Changes
                        </button>
                    </div>

                    {/* SETTINGS TAB */}
                    <div style={{display: activeMainTab === "settings" ? "block" : "none"}}>
                        <div className="settingsContent">
                            <AccordionItem title="Brending">
                                <div className="myWrapper">
                                    <div className="name">Logo</div>
                                    <ImgCrop rotationSlider>
                                        <Upload
                                            customRequest={({onSuccess}) => {
                                                setTimeout(() => {
                                                    onSuccess("ok");
                                                }, 0);
                                            }}
                                            listType="picture-card"
                                            fileList={logoFileList}
                                            onChange={({fileList}) => setLogoFileList(fileList)}
                                            onPreview={onPreviewFile}
                                            maxCount={1}
                                        >
                                            {logoFileList.length < 1 && (<>
                                                <span>Select</span>
                                                <MdOutlineFolderCopy/>
                                            </>)}
                                        </Upload>
                                    </ImgCrop>
                                </div>

                                <div className="myWrapper">
                                    <div className="name">Width</div>
                                    <input type="range" min="3" max="6" step="1"/>
                                </div>

                                <div className="myWrapper">
                                    <div className="name">Favicon</div>
                                    <ImgCrop rotationSlider>
                                        <Upload
                                            customRequest={({file, onSuccess}) => {
                                                setTimeout(() => {
                                                    onSuccess("ok");
                                                }, 0);
                                            }}
                                            listType="picture-card"
                                            fileList={faviconFileList}
                                            onChange={({fileList}) => setFaviconFileList(fileList)}
                                            onPreview={onPreviewFile}
                                            maxCount={1}
                                        >
                                            {logoFileList.length < 1 && (<>
                                                <span>Select</span> <MdOutlineFolderCopy/>
                                            </>)}
                                        </Upload>
                                    </ImgCrop>
                                </div>

                                <div className="myWrapper">
                                    <div className="name">About store</div>
                                    <textarea type="text" rows={3}/>
                                </div>
                            </AccordionItem>

                            <AccordionItem title="Color palette">
                                <div className={"row"}>
                                    {showAddColorForm ? (
                                        <div className="add-color-form-container">
                                            <h3>Add New Color</h3>
                                            <div className="form-group">
                                                <label>Navbar bg</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Navbar text</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Background</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Navbar bg</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Navbar text</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Background</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Navbar bg</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Navbar text</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Background</label>
                                                <input type="text" placeholder="#FFFFFF"/>
                                            </div>

                                            <button onClick={toggleAddColorForm}>Close</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className={"col-4"}>
                                                <div className={"wrapper2"}>
                                                    <div className={"box"}>Aa
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '5px'
                                                        }}>
                                                            <div className={"rengBoxu rengBoxu1"}></div>
                                                            <div className={"rengBoxu"}></div>
                                                        </div>
                                                    </div>
                                                    <div className={"myName"}>
                                                        Light
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"col-4"}>
                                                <div className={"wrapper2 wrapperBlack"}>
                                                    <div className={"box"}>Aa
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '5px'
                                                        }}>
                                                            <div className={"rengBoxu"}></div>
                                                            <div className={"rengBoxu rengBoxu2"}></div>
                                                        </div>
                                                    </div>
                                                    <div className={"myName"}>
                                                        Dark
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="wrapper2" onClick={toggleAddColorForm}
                                                     style={{cursor: 'pointer'}}>
                                                    <div className="box plus">+</div>
                                                    <div className="myName">Add color</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </AccordionItem>

                            <AccordionItem title="Font">
                                <div className={"myWrapper1"}>
                                    <div className="name">Choose font family</div>
                                    <select>
                                        <option>Poppins</option>
                                        <option>Inter</option>
                                        <option>Lato</option>
                                        <option>Montserrat</option>
                                    </select>
                                </div>
                            </AccordionItem>
                        </div>
                    </div>
                </div>

                <div className="lastScreen col-46-60">
                    <div className="pd-16">
                        <CustomizeStoreMarketHomePage swipers={tabData} sections={finalSections}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomizeStoreScreens;
