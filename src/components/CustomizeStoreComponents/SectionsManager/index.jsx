import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Modal, Select } from "antd";
import "./index.scss";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import {
    useGetAllCategoriesByMarketIdQuery,
    useGetAllCollectionsByMarketIdQuery,
    useGetStoreWithSectionsQuery,
} from "../../../service/userApi.js";
import Cookies from "js-cookie";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

function SectionsManager({ onSectionsChange, onDeletedIdsChange }) {
    const [sections, setSections] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newSectionType, setNewSectionType] = useState("collection");
    const [localIdCounter, setLocalIdCounter] = useState(0);
    // Silinen bölümlerin id'lerini tutan state (null ise eklenmeyecek)
    const [deletedIds, setDeletedIds] = useState([]);

    const { data: getAllCategoriesByMarketId } = useGetAllCategoriesByMarketIdQuery(
        Cookies.get("chooseMarket")
    );
    const categories = getAllCategoriesByMarketId?.data || [];

    const { data: getAllCollectionsByMarketId } = useGetAllCollectionsByMarketIdQuery(
        Cookies.get("chooseMarket")
    );
    const collections = getAllCollectionsByMarketId?.data || [];

    const { data: storeData } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));

    useEffect(() => {
        if (storeData?.data?.sections) {
            // Sadece category ve collection tipindeki bölümleri filtreliyoruz
            const filtered = storeData.data.sections.filter(
                (s) =>
                    s.$type &&
                    (s.$type.toLowerCase() === "category" || s.$type.toLowerCase() === "collection")
            );
            const mapped = filtered.map((s) => {
                const cardsInRow = s.displayColumns || 3;
                // Eğer API'den gelen sectionda id varsa onu localId olarak kullanıyoruz
                const localId = s.id ? s.id.toString() : `temp-${Math.random()}`;
                if (s.$type.toLowerCase() === "collection") {
                    return {
                        localId,
                        id: s.id,
                        type: "collection",
                        collection: s.collection?.title || (collections[0]?.title || "Default Collection"),
                        collectionId: s.collection?.id,
                        cardsInRow,
                        products: s.collection?.products || [],
                        displayOrderId: s.displayOrderId || 2, // Banner 1 olduğundan varsayılan 2
                    };
                } else if (s.$type.toLowerCase() === "category") {
                    return {
                        localId,
                        id: s.id,
                        type: "category",
                        category: s.category?.name || (categories[0]?.name || "Default Category"),
                        categoryId: s.category?.id,
                        cardsInRow,
                        products: s.category?.products || [],
                        displayOrderId: s.displayOrderId || 2,
                    };
                }
                return s;
            });

            // Bölümleri displayOrderId değerine göre sıralıyoruz
            const sorted = mapped.sort((a, b) => a.displayOrderId - b.displayOrderId);

            setSections(sorted);
            if (onSectionsChange) onSectionsChange(sorted);
        }
    }, [storeData, onSectionsChange, categories, collections]);

    // Silinen bölümlerin id listesini her değiştiğinde konsola logluyoruz
    useEffect(() => {
        if (onDeletedIdsChange) onDeletedIdsChange(deletedIds);
    }, [deletedIds, onDeletedIdsChange]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        // Reorder işlemi yapıp, yeni sıraya göre displayOrderId'leri yeniden hesaplıyoruz (banner 1 olduğundan 2'den başlıyor)
        const newSections = reorder(sections, result.source.index, result.destination.index);
        const updatedSections = newSections.map((section, index) => ({
            ...section,
            displayOrderId: index + 2,
        }));
        setSections(updatedSections);
        if (onSectionsChange) onSectionsChange(updatedSections);
    };

    const handleCategoryChange = (index, value) => {
        const selectedCategory = categories.find((cat) => cat.name === value);
        setSections((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                category: selectedCategory?.name || value,
                categoryId: selectedCategory?.id,
                products: selectedCategory?.products || [],
            };
            if (onSectionsChange) onSectionsChange(updated);
            return updated;
        });
    };

    const handleCollectionChange = (index, value) => {
        const selectedCollection = collections.find((col) => col.title === value);
        setSections((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                collection: selectedCollection?.title || value,
                collectionId: selectedCollection?.id,
                products: selectedCollection?.products || [],
            };
            if (onSectionsChange) onSectionsChange(updated);
            return updated;
        });
    };

    const handleSelectChange = (index, field, value) => {
        if (field === "category") {
            handleCategoryChange(index, value);
            return;
        }
        if (field === "collection") {
            handleCollectionChange(index, value);
            return;
        }
        setSections((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            if (onSectionsChange) onSectionsChange(updated);
            return updated;
        });
    };

    const handleCardsInRowChange = (index, value) => {
        setSections((prev) => {
            const updated = [...prev];
            updated[index].cardsInRow = Number(value);
            if (onSectionsChange) onSectionsChange(updated);
            return updated;
        });
    };

    // Yeni section oluşturulurken displayOrderId, mevcut bölümlerin sayısına göre hesaplanır (banner sabit 1 olduğundan 2'den başlar)
    const handleCreateNewSection = () => {
        const newSection = {
            id: null,
            localId: `temp-${localIdCounter}`,
            type: newSectionType,
            cardsInRow: 5,
            products: [],
            displayOrderId: sections.length + 2,
        };
        setLocalIdCounter((prev) => prev + 1);
        if (newSectionType === "collection") {
            if (collections.length > 0) {
                newSection.collection = collections[0].title;
                newSection.collectionId = collections[0].id;
                newSection.products = collections[0].products || [];
            } else {
                newSection.collection = "Default Collection";
            }
        } else {
            if (categories.length > 0) {
                newSection.category = categories[0].name;
                newSection.categoryId = categories[0].id;
                newSection.products = categories[0].products || [];
            } else {
                newSection.category = "Default Category";
            }
        }
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
        if (onSectionsChange) onSectionsChange(updatedSections);
        setIsModalVisible(false);
    };

    const handleRemoveSection = (index) => {
        const removedSection = sections[index];
        // Eğer id null değilse, silinen id'leri tutan listeye ekliyoruz.
        if (removedSection.id !== null && removedSection.id !== undefined) {
            setDeletedIds((prev) => [...prev, removedSection.id]);
        }
        const updatedSections = sections.filter((_, i) => i !== index);
        // Kaldırma sonrası displayOrderId'leri yeniden düzenliyoruz
        const reOrderedSections = updatedSections.map((section, index) => ({
            ...section,
            displayOrderId: index + 2,
        }));
        setSections(reOrderedSections);
        if (onSectionsChange) onSectionsChange(reOrderedSections);
    };

    return (
        <div id="sectionsManager">
            <div className="sections-manager-container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-sections">
                        {(provided) => (
                            <div
                                className="sections-list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ minHeight: "150px" }}
                            >
                                {sections.map((section, index) => (
                                    <Draggable key={section.localId} draggableId={section.localId} index={index}>
                                        {(providedDrag) => (
                                            <div
                                                className="section-item"
                                                ref={providedDrag.innerRef}
                                                {...providedDrag.draggableProps}
                                                {...providedDrag.dragHandleProps}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        padding: "0 8px",
                                                        background: "#FeFeFe",
                                                    }}
                                                >
                                                    <PiDotsSixVerticalBold style={{ fontSize: "22px" }} />
                                                </div>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        padding: "16px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "10px",
                                                    }}
                                                >
                                                    <div className="section-header">
                                                        <span className="section-title">
                                                            {section.type === "collection"
                                                                ? "Collection list"
                                                                : "Category list"}
                                                        </span>
                                                        <button className="remove-btn" onClick={() => handleRemoveSection(index)}>
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div className="section-controls">
                                                        {section.type === "collection" && (
                                                            <div className="inputWrapper">
                                                                <div className="label">Selected collection</div>
                                                                <select
                                                                    value={section.collection}
                                                                    onChange={(e) =>
                                                                        handleSelectChange(index, "collection", e.target.value)
                                                                    }
                                                                >
                                                                    {collections.map((col) => (
                                                                        <option key={col.id} value={col.title}>
                                                                            {col.title}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        )}
                                                        {section.type === "category" && (
                                                            <>
                                                                <div className="label">Selected category</div>
                                                                <Select
                                                                    value={section.category}
                                                                    style={{ width: 150 }}
                                                                    onChange={(value) => handleSelectChange(index, "category", value)}
                                                                    options={categories.map((cat) => ({
                                                                        label: cat.name,
                                                                        value: cat.name,
                                                                    }))}
                                                                />
                                                            </>
                                                        )}
                                                        {(section.type === "collection" || section.type === "category") && (
                                                            <div className="inputWrapper1123 cardsInRowControl">
                                                                <div className="label cardsInRowLabel">Show cards in a row</div>
                                                                <div className="rangeContainer">
                                                                    <span>3</span>
                                                                    <input
                                                                        type="range"
                                                                        min="3"
                                                                        max="6"
                                                                        step="1"
                                                                        value={section.cardsInRow}
                                                                        onChange={(e) => handleCardsInRowChange(index, e.target.value)}
                                                                    />
                                                                    <span>6</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="sections-manager-header section-item" style={{ padding: "16px" }}>
                    <div className="h3">Add a section</div>
                    <HiOutlinePlusSm className="csplus1" onClick={() => setIsModalVisible(true)} />
                </div>
            </div>
            <Modal
                title="Create a new section"
                open={isModalVisible}
                onOk={handleCreateNewSection}
                onCancel={() => setIsModalVisible(false)}
                okText="Create"
                cancelText="Cancel"
            >
                <div className="label">Type:</div>
                <Select
                    value={newSectionType}
                    style={{ width: 150, marginLeft: 8 }}
                    onChange={(value) => setNewSectionType(value)}
                    options={[
                        { label: "Collection", value: "collection" },
                        { label: "Category", value: "category" },
                    ]}
                />
            </Modal>
        </div>
    );
}

export default SectionsManager;
