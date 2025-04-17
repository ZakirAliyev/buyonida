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
    const [newSectionValue, setNewSectionValue] = useState(null);
    const [localIdCounter, setLocalIdCounter] = useState(0);
    const [deletedIds, setDeletedIds] = useState([]);

    const { data: getAllCategoriesByMarketId } = useGetAllCategoriesByMarketIdQuery(Cookies.get("chooseMarket"));
    const categories = getAllCategoriesByMarketId?.data || [];

    const { data: getAllCollectionsByMarketId } = useGetAllCollectionsByMarketIdQuery(Cookies.get("chooseMarket"));
    const collections = getAllCollectionsByMarketId?.data || [];

    const { data: storeData } = useGetStoreWithSectionsQuery(Cookies.get("chooseMarket"));

    const combinedOptions = [
        ...categories.map(cat => ({
            label: `${cat.name} - Category`,
            value: `category-${cat.id}`,
            type: "category",
            data: cat
        })),
        ...collections.map(col => ({
            label: `${col.title} - Collection`,
            value: `collection-${col.id}`,
            type: "collection",
            data: col
        }))
    ];

    useEffect(() => {
        if (storeData?.data?.sections) {
            const filtered = storeData.data.sections.filter(
                (s) =>
                    s.$type &&
                    (s.$type.toLowerCase() === "category" || s.$type.toLowerCase() === "collection")
            );
            const mapped = filtered.map((s) => {
                const cardsInRow = s.displayColumns || 3;
                const localId = s.id ? s.id.toString() : `temp-${Math.random()}`;
                if (s.$type.toLowerCase() === "collection") {
                    return {
                        localId,
                        id: s.id,
                        type: "collection",
                        value: `collection-${s.collection?.id}`,
                        collection: s.collection?.title || (collections[0]?.title || "Default Collection"),
                        collectionId: s.collection?.id,
                        cardsInRow,
                        products: s.collection?.products || [],
                        displayOrderId: s.displayOrderId || 2,
                    };
                } else if (s.$type.toLowerCase() === "category") {
                    return {
                        localId,
                        id: s.id,
                        type: "category",
                        value: `category-${s.category?.id}`,
                        category: s.category?.name || (categories[0]?.name || "Default Category"),
                        categoryId: s.category?.id,
                        cardsInRow,
                        products: s.category?.products || [],
                        displayOrderId: s.displayOrderId || 2,
                    };
                }
                return s;
            });

            const sorted = mapped.sort((a, b) => a.displayOrderId - b.displayOrderId);
            setSections(sorted);
            if (onSectionsChange) onSectionsChange(sorted);
        }
    }, [storeData, onSectionsChange, categories, collections]);

    useEffect(() => {
        if (onDeletedIdsChange) onDeletedIdsChange(deletedIds);
    }, [deletedIds, onDeletedIdsChange]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const newSections = reorder(sections, result.source.index, result.destination.index);
        const updatedSections = newSections.map((section, index) => ({
            ...section,
            displayOrderId: index + 2,
        }));
        setSections(updatedSections);
        if (onSectionsChange) onSectionsChange(updatedSections);
    };

    const handleSectionChange = (index, value) => {
        const selectedOption = combinedOptions.find(opt => opt.value === value);
        if (!selectedOption) return;

        setSections((prev) => {
            const updated = [...prev];
            const section = updated[index];

            if (selectedOption.type === "category") {
                updated[index] = {
                    ...section,
                    type: "category",
                    value: value,
                    category: selectedOption.data.name,
                    categoryId: selectedOption.data.id,
                    collection: undefined,
                    collectionId: undefined,
                    products: selectedOption.data.products || [],
                };
            } else {
                updated[index] = {
                    ...section,
                    type: "collection",
                    value: value,
                    collection: selectedOption.data.title,
                    collectionId: selectedOption.data.id,
                    category: undefined,
                    categoryId: undefined,
                    products: selectedOption.data.products || [],
                };
            }

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

    const handleCreateNewSection = () => {
        if (!newSectionValue) return;

        const selectedOption = combinedOptions.find(opt => opt.value === newSectionValue);
        if (!selectedOption) return;

        const newSection = {
            id: null,
            localId: `temp-${localIdCounter}`,
            type: selectedOption.type,
            value: newSectionValue,
            cardsInRow: 5,
            products: selectedOption.data.products || [],
            displayOrderId: sections.length + 2,
        };

        if (selectedOption.type === "category") {
            newSection.category = selectedOption.data.name;
            newSection.categoryId = selectedOption.data.id;
        } else {
            newSection.collection = selectedOption.data.title;
            newSection.collectionId = selectedOption.data.id;
        }

        setLocalIdCounter((prev) => prev + 1);
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
        if (onSectionsChange) onSectionsChange(updatedSections);
        setIsModalVisible(false);
        setNewSectionValue(null);
    };

    const handleRemoveSection = (index) => {
        const removedSection = sections[index];
        if (removedSection.id !== null && removedSection.id !== undefined) {
            setDeletedIds((prev) => [...prev, removedSection.id]);
        }
        const updatedSections = sections.filter((_, i) => i !== index);
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
                                                        <div className="inputWrapper">
                                                            <div className="label">Selected item</div>
                                                            <Select
                                                                value={section.value}
                                                                style={{ width: 150 }}
                                                                onChange={(value) => handleSectionChange(index, value)}
                                                                options={combinedOptions}
                                                            />
                                                        </div>
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
                onCancel={() => {
                    setIsModalVisible(false);
                    setNewSectionValue(null);
                }}
                okText="Create"
                cancelText="Cancel"
            >
                <div className="label">Select item:</div>
                <Select
                    value={newSectionValue}
                    style={{ width: 150, marginLeft: 8 }}
                    onChange={(value) => setNewSectionValue(value)}
                    options={combinedOptions}
                />
            </Modal>
        </div>
    );
}

export default SectionsManager;