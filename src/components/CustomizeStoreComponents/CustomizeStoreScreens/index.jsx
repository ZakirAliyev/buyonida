import {useState, useEffect} from 'react';
import './index.scss';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import SectionsManager from "../SectionsManager/index.jsx";
import CustomizeStoreMarketHomePage from "../CustomizeStoreMarketHomePage/index.jsx";
import {RxCross2} from 'react-icons/rx';
import {HiOutlinePlusSm} from 'react-icons/hi';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';
import {Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import '/src/assets/mohtesem.jpg';
import {useGetStoreWithSectionsQuery, usePostBannerItemMutation} from "../../../service/userApi.js";
import Cookies from "js-cookie";
import {BANNER_LOGO} from "../../../../constants.js";

function CustomizeStoreScreens() {
    const {data: getStoreWithSections} = useGetStoreWithSectionsQuery(Cookies.get('chooseMarket'));
    const sections = getStoreWithSections?.data;

    const [postBannerItem] = usePostBannerItemMutation()

    const [tabs, setTabs] = useState([]);
    const [tabData, setTabData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabsVisible, setTabsVisible] = useState(true);

    async function handleBannerSave() {
        const response = await postBannerItem().unwrap()
    }

    useEffect(() => {
        if (sections) {
            // "Banner" bölməsini sections array-dən seçirik
            const bannerSection = sections.sections?.find(section => section.sectionType === "Banner");

            // bannerItems array-indəki hər bir elementi swipers formatına çeviririk
            const swipers = bannerSection?.bannerItems?.map(item => ({
                id: item.id,
                title: item.title,
                subTitle: item.subtitle, // JSON-da "subtitle" kimi gəlir, kodda subTitle istifadə olunur
                buttonLink: item.buttonLink,
                displayOrderId: item.displayOrderId,
                image: [
                    {
                        uid: item.id,
                        name: item.imageName,
                        status: 'done',
                        url: `${BANNER_LOGO}${item.imageName}`
                    }
                ]
            })) || [];

            const sortedSwipers = [...swipers].sort((a, b) => a.displayOrderId - b.displayOrderId);

            const initialTabData = sortedSwipers.map(item => ({
                id: item.id,
                title: item.title,
                subTitle: item.subTitle,
                buttonLink: item.buttonLink,
                displayOrderId: item.displayOrderId,
                image: [
                    {
                        uid: item.image[0]?.uid || item.id,
                        name: item.image[0]?.name || `image-${item.id}.jpg`,
                        status: item.image[0]?.status || 'done',
                        url: item.image[0]?.url || '',
                    }
                ]
            }));

            // Hem tabs, hem de tabData state-lərini güncəlləyirik
            setTabs(initialTabData);
            setTabData(initialTabData);
        }
    }, [sections]);

    console.log("initialTabData:", tabData);

    // Məsələn, konkret bir tabın sahəsini yeniləmək üçün funksiya
    const updateTabData = (id, field, value) => {
        setTabData(prev => prev.map(item => item.id === id ? {...item, [field]: value} : item));
    };

    // Şəkil dəyişiklikləri üçün funksiya (yalnız ən son faylı saxlayır)
    const onImageChange = (tabId) => ({fileList: newFileList}) => {
        setTabData(prev => prev.map(item => item.id === tabId ? {...item, image: newFileList.slice(-1)} : item));
    };

    // Şəkil preview funksiyası
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

    const addTab = () => {
        if (tabs.length < 3) {
            const usedOrders = tabs.map(tab => tab.displayOrderId);
            const available = [1, 2, 3].filter(n => !usedOrders.includes(n));
            const newOrder = Math.min(...available);
            const newId = tabs.reduce((max, tab) => Math.max(max, tab.id), 0) + 1;
            const newTab = {
                id: newId,
                label: `Pic ${newOrder}`,
                displayOrderId: newOrder,
            };
            const newTabs = [...tabs, newTab];
            setTabs(newTabs);
            setTabData(prev => ([
                ...prev,
                {
                    id: newId,
                    title: '',
                    subTitle: '',
                    buttonLink: 'Winter collection',
                    displayOrderId: newOrder,
                    image: []
                }
            ]));
            setActiveIndex(newTabs.length - 1);
        }
    };

    // Verilmiş index-ə görə tab silir və qalanların displayOrderId və label-lərini yeniləyir
    const removeTab = (index) => {
        if (tabs.length === 1) return;
        const tabToRemove = tabs[index];
        const newTabs = tabs.filter((_, i) => i !== index);
        const updatedTabs = newTabs.map((tab, idx) => ({
            ...tab,
            displayOrderId: idx + 1,
            label: `Pic ${idx + 1}`
        }));
        setTabs(updatedTabs);
        setTabData(prev => {
            const newData = prev.filter(item => item.id !== tabToRemove.id)
                .map((item, idx) => ({...item, displayOrderId: idx + 1}));
            return newData;
        });
        if (activeIndex >= updatedTabs.length) {
            setActiveIndex(updatedTabs.length - 1);
        }
    };

    const moveTabLeft = (index) => {
        if (index > 0) {
            const newTabs = [...tabs];
            [newTabs[index - 1], newTabs[index]] = [newTabs[index], newTabs[index - 1]];
            const updatedTabs = newTabs.map((tab, idx) => ({
                ...tab,
                displayOrderId: idx + 1,
                label: `Pic ${idx + 1}`
            }));
            setTabs(updatedTabs);
            setTabData(prev => {
                const newData = [...prev];
                updatedTabs.forEach((tab, idx) => {
                    const dataIndex = newData.findIndex(item => item.id === tab.id);
                    if (dataIndex !== -1) {
                        newData[dataIndex].displayOrderId = idx + 1;
                    }
                });
                return newData;
            });
            if (activeIndex === index) {
                setActiveIndex(index - 1);
            } else if (activeIndex === index - 1) {
                setActiveIndex(index);
            }
        }
    };

    // Tab-ı sağa hərəkət etdirir
    const moveTabRight = (index) => {
        if (index < tabs.length - 1) {
            const newTabs = [...tabs];
            [newTabs[index], newTabs[index + 1]] = [newTabs[index + 1], newTabs[index]];
            const updatedTabs = newTabs.map((tab, idx) => ({
                ...tab,
                displayOrderId: idx + 1,
                label: `Pic ${idx + 1}`
            }));
            setTabs(updatedTabs);
            setTabData(prev => {
                const newData = [...prev];
                updatedTabs.forEach((tab, idx) => {
                    const dataIndex = newData.findIndex(item => item.id === tab.id);
                    if (dataIndex !== -1) {
                        newData[dataIndex].displayOrderId = idx + 1;
                    }
                });
                return newData;
            });
            if (activeIndex === index) {
                setActiveIndex(index + 1);
            } else if (activeIndex === index + 1) {
                setActiveIndex(index);
            }
        }
    };

    const getTabData = (id) => tabData.find(item => item.id === id) || {};

    return (
        <section id="customizeStoreScreens">
            <div className="row">
                <div className="firstScreen col-14-60 my-scrollable-element">
                    <div className="row choose">
                        <div className="pd-8 col-6">
                            <div className="sections">Sections</div>
                        </div>
                        <div className="pd-8 col-6">
                            <div className="settings">Settings</div>
                        </div>
                    </div>
                    {tabsVisible && (
                        <div className="heroSettings">
                            <Tabs selectedIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
                                <TabList>
                                    {tabs.map((tab, index) => (
                                        <Tab key={tab.id}>
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
                                    {tabs.length < 3 && (
                                        <HiOutlinePlusSm onClick={addTab} className="csplus"/>
                                    )}
                                </TabList>
                                {tabs.map((tab) => (
                                    <TabPanel key={tab.id}>
                                        <div className="inputWrapper">
                                            <div className="label">Title</div>
                                            <input
                                                value={getTabData(tab.id).title || ''}
                                                onChange={(e) => updateTabData(tab.id, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Sub-title</div>
                                            <input
                                                value={getTabData(tab.id).subTitle || ''}
                                                onChange={(e) => updateTabData(tab.id, 'subTitle', e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Button link</div>
                                            <select
                                                value={getTabData(tab.id).buttonLink || 'Winter collection'}
                                                onChange={(e) => updateTabData(tab.id, 'buttonLink', e.target.value)}
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
                                                    fileList={getTabData(tab.id).image || []}
                                                    onChange={onImageChange(tab.id)}
                                                    onPreview={onPreview}
                                                    maxCount={1}
                                                >
                                                    {(getTabData(tab.id).image || []).length < 1 && '+ Upload'}
                                                </Upload>
                                            </ImgCrop>
                                        </div>
                                    </TabPanel>
                                ))}
                            </Tabs>
                            <button onClick={() => handleBannerSave()}>Save</button>
                        </div>
                    )}
                    <SectionsManager/>
                </div>
                <div className="lastScreen col-46-60">
                    <div className="pd-16">
                        {/* CustomizeStoreMarketHomePage komponentinə tabData swipers olaraq ötürülür */}
                        <CustomizeStoreMarketHomePage swipers={tabData}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomizeStoreScreens;
