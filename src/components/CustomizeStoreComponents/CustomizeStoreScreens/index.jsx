import { useState, useEffect } from "react";
import "./index.scss";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SectionsManager from "../SectionsManager/index.jsx";
import CustomizeStoreMarketHomePage from "../CustomizeStoreMarketHomePage/index.jsx";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { message, Upload } from "antd";
import {
    useGetStoreWithSectionsQuery,
    usePostSectionBannerItemMutation,
    usePutSectionsMutation,
    useEditSectionBannerItemMutation,
    useDeleteSectionBannerItemMutation,
} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { BANNER_LOGO } from "../../../../constants.js";
import CustomizeStoreSettingTab from "../CustomizeStoreSettingTab/index.jsx";

function CustomizeStoreScreens() {
    const { data: storeData, refetch } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));
    const sectionsData = storeData?.data;

    const [postSectionBannerItem] = usePostSectionBannerItemMutation();
    const [editSectionBannerItem] = useEditSectionBannerItemMutation();
    const [deleteBannerItem] = useDeleteSectionBannerItemMutation();
    const [putSections] = usePutSectionsMutation();
    const marketId = Cookies.get("chooseMarket");

    const [tabs, setTabs] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [activeBannerIndex, setActiveBannerIndex] = useState(0);
    const [activeMainTab, setActiveMainTab] = useState("sections");
    const [updatedSections, setUpdatedSections] = useState([]);
    const [deletedIds, setDeletedIds] = useState([]);
    const [customLogo, setCustomLogo] = useState(null);
    const [customLogoWidth, setCustomLogoWidth] = useState(null);
    const [menuOpenTabIndex, setMenuOpenTabIndex] = useState(null);

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
                        isNew: false,
                    })) || [];

                const sortedSwipers = [...swipers].sort((a, b) => a.displayOrderId - b.displayOrderId);

                setTabs(sortedSwipers);
                setTabData(sortedSwipers);
            }
        }
    }, [sectionsData, tabs.length]);

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
            const bannerSectionFromAPI = sectionsData?.sections?.find(
                (section) => section.sectionType === "Banner"
            );
            const bannerSectionId = bannerSectionFromAPI?.id;

            if (!bannerSectionId) {
                message.error("Banner section ID not found!");
                return;
            }

            const fixedLabels = ["First", "Second", "Third"];

            // Process each banner tab
            for (let index = 0; index < tabData.length; index++) {
                const tab = tabData[index];
                const label = fixedLabels[index] || `Tab ${index + 1}`;

                // Validate required fields
                const isFullyFilled =
                    tab.title?.trim() &&
                    tab.subTitle?.trim() &&
                    tab.buttonLink?.trim() &&
                    tab.image?.length > 0;

                if (!isFullyFilled) {
                    message.error(`Please fill all fields and upload an image for ${label} tab!`);
                    continue;
                }

                // Prepare FormData
                const formData = new FormData();
                formData.append(tab.isNew ? "BannerSectionId" : "Id", tab.isNew ? bannerSectionId : tab.id);
                formData.append("Title", tab.title);
                formData.append("Subtitle", tab.subTitle);
                formData.append("ButtonLink", tab.buttonLink);
                formData.append("DisplayOrderId", tab.displayOrderId.toString());

                // Only append ImageName if a new image is uploaded
                if (tab.image[0]?.originFileObj) {
                    formData.append("ImageName", tab.image[0].originFileObj);
                }

                // Log FormData for debugging
                const formDataEntries = {};
                for (let [key, value] of formData.entries()) {
                    formDataEntries[key] = value instanceof File ? value.name : value;
                }

                if (tab.isNew) {
                    // Create new banner item
                    console.log(`CREATE Banner Item (${label}):`, formDataEntries);
                    try {
                        const response = await postSectionBannerItem(formData).unwrap();
                        console.log(`Create Response for ${label}:`, response);
                        if (response?.statusCode === 201) {
                            message.success(`${label} banner created successfully!`);
                        } else {
                            message.error(`Failed to create ${label} banner!`);
                        }
                    } catch (error) {
                        message.error(`Failed to create ${label} banner!`);
                        console.error(`Create Error for ${label}:`, error);
                        continue;
                    }
                } else {
                    // Update existing banner item
                    console.log(`UPDATE Banner Item (${label}):`, formDataEntries);
                    try {
                        const response = await editSectionBannerItem(formData).unwrap();
                        console.log(`Update Response for ${label}:`, response);
                        if (response?.statusCode === 200) {
                            message.success(`${label} banner updated successfully!`);
                        } else {
                            message.error(`Failed to update ${label} banner!`);
                        }
                    } catch (error) {
                        message.error(`Failed to update ${label} banner!`);
                        console.error(`Update Error for ${label}:`, error);
                        continue;
                    }
                }
            }

            // Save other sections
            const response = await putSections({ marketId, data: finalJson }).unwrap();
            if (response?.statusCode === 200) {
                message.success("Sections saved successfully!");
                refetch();
            } else {
                message.error("Save failed!");
            }
        } catch (error) {
            message.error("Save failed!");
            console.error("Error in handlePutSection:", error);
        }
    }

    async function handleDeleteBannerItem(tabId, label) {
        try {
            console.log(`DELETE Banner Item (${label}):`, { Id: tabId });
            const response = await deleteBannerItem(tabId).unwrap();
            console.log(`Delete Response for ${label}:`, response);
            if (response?.statusCode === 200) {
                message.success(`${label} banner deleted successfully!`);
                // Remove the tab from state
                const newTabs = tabs.filter((tab) => tab.id !== tabId);
                const updatedTabs = newTabs.map((tab, idx) => ({
                    ...tab,
                    displayOrderId: idx + 1,
                }));
                setTabs(updatedTabs);
                setTabData((prev) =>
                    prev
                        .filter((item) => item.id !== tabId)
                        .map((item, idx) => ({ ...item, displayOrderId: idx + 1 }))
                );
                if (activeBannerIndex >= updatedTabs.length) {
                    setActiveBannerIndex(updatedTabs.length - 1);
                }
                refetch();
            } else {
                message.error(`Failed to delete ${label} banner!`);
            }
        } catch (error) {
            message.error(`Failed to delete ${label} banner!`);
            console.error(`Delete Error for ${label}:`, error);
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
            const newId = `new-${Date.now()}-${Math.random()}`;
            const newTab = {
                id: newId,
                displayOrderId: newOrder,
                isNew: true,
            };
            setTabs([...tabs, newTab]);
            setTabData((prev) => [
                ...prev,
                {
                    id: newId,
                    title: "",
                    subTitle: "",
                    buttonLink: "",
                    displayOrderId: newOrder,
                    image: [],
                    isNew: true,
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
                                                required
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Sub-title</div>
                                            <input
                                                value={getTabData(tab.id)?.subTitle || ""}
                                                onChange={(e) => updateTabData(tab.id, "subTitle", e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Button link</div>
                                            <input
                                                value={getTabData(tab.id)?.buttonLink || ""}
                                                onChange={(e) => updateTabData(tab.id, "buttonLink", e.target.value)}
                                                placeholder="Enter link URL"
                                                required
                                            />
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
                                                required
                                            >
                                                {(getTabData(tab.id)?.image || []).length < 1 && "+ Upload"}
                                            </Upload>
                                        </div>
                                        {!tab.isNew && (
                                            <div className="inputWrapper">
                                                <button
                                                    className="delete-banner-btn"
                                                    style={{ background: "#ff4d4f", color: "white", padding: "8px 16px", border: "none", borderRadius: "10px", cursor: "pointer", marginTop: '20px' }}
                                                    onClick={() => handleDeleteBannerItem(tab.id, fixedLabels[index] || `Tab ${index + 1}`)}
                                                >
                                                    Delete Banner Item
                                                </button>
                                            </div>
                                        )}
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