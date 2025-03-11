import { useState } from 'react';
import './index.scss';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import SectionsManager from "../SectionsManager/index.jsx";
import CustomizeStoreMarketHomePage from "../CustomizeStoreMarketHomePage/index.jsx";
import { RxCross2 } from 'react-icons/rx';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import image1 from "../../../assets/mohtesem.jpg";

const swipers = [
    {
        id: 1,
        title: "Salam 1",
        subTitle: "Aleykum",
        imageName: image1,
        displayOrderId: 2,
    },
    {
        id: 2,
        title: "Salam 2",
        subTitle: "Aleykumasda",
        imageName: image1,
        displayOrderId: 1,
    },
    {
        id: 3,
        title: "Salam 3",
        subTitle: "Aleykum",
        imageName: image1,
        displayOrderId: 3,
    },
];

// displayOrderId'ye göre sıralayarak kullanıyoruz
const sortedSwipers = [...swipers].sort((a, b) => a.displayOrderId - b.displayOrderId);

function CustomizeStoreScreens() {
    // JSON içerisindeki displayOrderId'yi kullanarak sekme (tab) oluşturuluyor.
    const initialTabs = sortedSwipers.map(item => ({
        id: item.id,
        label: `Pic ${item.displayOrderId}`,
        displayOrderId: item.displayOrderId,
    }));

    // JSON içerisindeki verilerden ilgili inputların başlangıç verileri oluşturuluyor.
    const initialTabData = sortedSwipers.reduce((acc, item) => {
        acc[item.id] = {
            title: item.title,
            subTitle: item.subTitle,
            buttonLink: 'Winter collection', // varsayılan değer
            displayOrderId: item.displayOrderId,
            image: [
                {
                    uid: item.id,
                    name: `image-${item.id}.jpg`,
                    status: 'done',
                    url: item.imageName,
                }
            ]
        };
        return acc;
    }, {});

    const [tabs, setTabs] = useState(initialTabs);
    const [tabData, setTabData] = useState(initialTabData);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabsVisible, setTabsVisible] = useState(true);

    // Inputlardaki değişiklikleri ilgili sekme verisine yansıtma
    const updateTabData = (id, field, value) => {
        setTabData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    // Her sekme için image dosyalarını güncelleyen fonksiyon
    const onImageChange = (tabId) => ({ fileList: newFileList }) => {
        setTabData(prev => ({
            ...prev,
            [tabId]: {
                ...prev[tabId],
                image: newFileList.slice(-1)
            }
        }));
    };

    // Resim önizleme işlemi
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
            setTabData(prev => ({
                ...prev,
                [newId]: {
                    title: '',
                    subTitle: '',
                    buttonLink: 'Winter collection',
                    displayOrderId: newOrder,
                    image: []
                }
            }));
            setActiveIndex(newTabs.length - 1);
        }
    };

    // Sekme silme işlemi
    const removeTab = (index) => {
        if (tabs.length === 1) return;
        const tabToRemove = tabs[index];
        const newTabs = tabs.filter((_, i) => i !== index);
        // Kalan sekmelerin displayOrderId'lerini yeniden 1,2,3 olarak güncelle
        const updatedTabs = newTabs.map((tab, idx) => ({
            ...tab,
            displayOrderId: idx + 1,
            label: `Pic ${idx + 1}`
        }));
        setTabs(updatedTabs);
        setTabData(prev => {
            const newData = { ...prev };
            delete newData[tabToRemove.id];
            updatedTabs.forEach((tab, idx) => {
                if (newData[tab.id]) {
                    newData[tab.id].displayOrderId = idx + 1;
                }
            });
            return newData;
        });
        if (activeIndex >= updatedTabs.length) {
            setActiveIndex(updatedTabs.length - 1);
        }
    };

    // Sekmeleri sola kaydırma
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
                const newData = { ...prev };
                updatedTabs.forEach((tab, idx) => {
                    if (newData[tab.id]) {
                        newData[tab.id].displayOrderId = idx + 1;
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

    // Sekmeleri sağa kaydırma
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
                const newData = { ...prev };
                updatedTabs.forEach((tab, idx) => {
                    if (newData[tab.id]) {
                        newData[tab.id].displayOrderId = idx + 1;
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
                                        <HiOutlinePlusSm onClick={addTab} className="csplus" />
                                    )}
                                </TabList>
                                {tabs.map((tab) => (
                                    <TabPanel key={tab.id}>
                                        <div className="inputWrapper">
                                            <div className="label">Title</div>
                                            <input
                                                value={tabData[tab.id]?.title || ''}
                                                onChange={(e) => updateTabData(tab.id, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Sub-title</div>
                                            <input
                                                value={tabData[tab.id]?.subTitle || ''}
                                                onChange={(e) => updateTabData(tab.id, 'subTitle', e.target.value)}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <div className="label">Button link</div>
                                            <select
                                                value={tabData[tab.id]?.buttonLink || 'Winter collection'}
                                                onChange={(e) => updateTabData(tab.id, 'buttonLink', e.target.value)}
                                            >
                                                <option value="Winter collection">Winter collection</option>
                                                <option value="Spring collection">Spring collection</option>
                                                <option value="Summer collection">Summer collection</option>
                                            </select>
                                        </div>
                                        <div className="inputWrapper" style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                            <div className="label">Image</div>
                                            <ImgCrop rotationSlider>
                                                <Upload
                                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                    listType="picture-card"
                                                    fileList={tabData[tab.id]?.image || []}
                                                    onChange={onImageChange(tab.id)}
                                                    onPreview={onPreview}
                                                    maxCount={1}
                                                >
                                                    {(tabData[tab.id]?.image || []).length < 1 && '+ Upload'}
                                                </Upload>
                                            </ImgCrop>
                                        </div>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </div>
                    )}
                    <SectionsManager />
                </div>
                <div className="lastScreen col-46-60">
                    <div className="pd-16">
                        <CustomizeStoreMarketHomePage swipers={swipers} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomizeStoreScreens;
