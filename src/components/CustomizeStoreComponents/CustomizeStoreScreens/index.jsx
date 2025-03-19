import { useState, useEffect } from "react";
import "./index.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SectionsManager from "../SectionsManager/index.jsx";
import CustomizeStoreMarketHomePage from "../CustomizeStoreMarketHomePage/index.jsx";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { HiOutlinePlusSm } from "react-icons/hi";
import {message, Upload} from "antd";
import {
    useGetStoreWithSectionsQuery,
    usePostBannerItemMutation,
    usePutSectionsMutation,
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { BANNER_LOGO } from "../../../../constants.js";
import CustomizeStoreSettingTab from "../CustomizeStoreSettingTab/index.jsx";
import ImgCrop from "antd-img-crop";

function CustomizeStoreScreens() {
    const { data: storeData, refetch } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const sectionsData = storeData?.data;

    const [postBannerItem] = usePostBannerItemMutation();
    const marketId = Cookies.get("chooseMarket");
    const [putSections] = usePutSectionsMutation();

    const [tabs, setTabs] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);
    const [activeMainTab, setActiveMainTab] = useState("sections");
    const [updatedSections, setUpdatedSections] = useState([]);
    const [deletedIds, setDeletedIds] = useState([]);

    // Yeni: Seçilen logo ve genişlik state’leri (başlangıçta backend’den alınan değeri kullanabiliriz)
    const [customLogo, setCustomLogo] = useState(null);
    const [customLogoWidth, setCustomLogoWidth] = useState(null);

    // Menü için state: Hangi tabda menü açık
    const [menuOpenTabIndex, setMenuOpenTabIndex] = useState(null);

    async function handleBannerSave() {
        try {
            await postBannerItem().unwrap();
            message.success("Banner saved successfully!");
        } catch (error) {
            message.error("Banner save failed!");
            console.error(error);
        }
    }

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

                // Tab içeriği için orijinal veriler saklanıyor
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

    // Final JSON oluşturulması (debug amaçlı)
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

        // finalJson kullanılabilir...
    }, [tabData, updatedSections, sectionsData, deletedIds]);

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
            const response = await putSections({ marketId, data: finalJson }).unwrap();
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

    const finalSections = {
        categorySections: updatedSections.filter((section) => section.type === "category"),
        collectionSections: updatedSections.filter((section) => section.type === "collection"),
    };

    const updateTabData = (id, field, value) => {
        setTabData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const onImageChange = (tabId) => ({ fileList: newFileList }) => {
        setTabData((prev) =>
            prev.map((item) =>
                item.id === tabId ? { ...item, image: newFileList.slice(-1) } : item
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

    const fixedLabels = ["First", "Second", "Third"];

    const addTab = () => {
        if (tabs.length < 3) {
            const usedOrders = tabs.map((tab) => tab.displayOrderId);
            const available = [1, 2, 3].filter((n) => !usedOrders.includes(n));
            const newOrder = available.length ? Math.min(...available) : tabs.length + 1;
            const newTab = {
                id: null,
                // label burada fixedLabels üzerinden verilecek, tab verisi içindeki label artık kullanılmayacak
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
        }));
        setTabs(updatedTabs);
        setTabData((prev) => {
            const newData = prev
                .filter((item) => item.id !== tabToRemove.id)
                .map((item, idx) => ({ ...item, displayOrderId: idx + 1 }));
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

    return (
        <section id="customizeStoreScreens">
            <div className="row">
                <div className="firstScreen col-14-60 my-scrollable-element">
                    <div className="choose row main-tabs">
                        <div
                            className={`sections pd-8 col-6 clickable ${activeMainTab === "sections" ? "selected" : ""}`}
                            onClick={() => setActiveMainTab("sections")}
                        >
                            Sections
                        </div>
                        <div
                            className={`settings pd-8 col-6 clickable ${activeMainTab === "settings" ? "selected" : ""}`}
                            onClick={() => setActiveMainTab("settings")}
                        >
                            Settings
                        </div>
                    </div>

                    <div style={{ display: activeMainTab === "sections" ? "block" : "none" }}>
                        <div className="heroSettings">
                            <Tabs selectedIndex={activeBannerIndex} onSelect={(index) => setActiveBannerIndex(index)}>
                                <TabList>
                                    {tabs.map((tab, index) => (
                                        <Tab key={index}>
                                            {index > 0 && (
                                                <FiArrowLeft
                                                    className="csicon arrow-icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveTabLeft(index);
                                                    }}
                                                />
                                            )}
                                            <div className="tab-header">
                                                <span className="tab-label">{fixedLabels[index] || `Tab ${index + 1}`}</span>
                                            </div>
                                            {index < tabs.length - 1 && (
                                                <FiArrowRight
                                                    className="csicon arrow-icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        moveTabRight(index);
                                                    }}
                                                />
                                            )}
                                            {menuOpenTabIndex === index && (
                                                <div className="tab-menu">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeTab(index);
                                                            setMenuOpenTabIndex(null);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setMenuOpenTabIndex(null);
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}
                                        </Tab>
                                    ))}
                                    {tabs.length < 3 && <HiOutlinePlusSm onClick={addTab} className="csplus" />}
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
                                                onChange={(e) => updateTabData(tab.id, "buttonLink", e.target.value)}
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
                                                    customRequest={({ file, onSuccess }) => {
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
                        </div>

                        <SectionsManager onSectionsChange={setUpdatedSections} onDeletedIdsChange={setDeletedIds} />
                        <button className="save-sections-btn" onClick={() => handlePutSection(getFinalJson())}>
                            Save Changes
                        </button>
                    </div>
                    <CustomizeStoreSettingTab
                        activeMainTab={activeMainTab}
                        setCustomLogo={setCustomLogo}
                        setCustomLogoWidth={setCustomLogoWidth}
                    />
                </div>
                <div className="lastScreen col-46-60">
                    <div className="pd-16">
                        <CustomizeStoreMarketHomePage
                            swipers={tabData}
                            sections={finalSections}
                            customLogo={customLogo}
                            customLogoWidth={customLogoWidth}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomizeStoreScreens;
