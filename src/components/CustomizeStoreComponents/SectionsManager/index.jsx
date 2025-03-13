// SectionsManager.jsx
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HiOutlinePlusSm } from "react-icons/hi";
import { Modal, Select } from "antd";
import "./index.scss";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useGetStoreWithSectionsQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

function SectionsManager({ onSectionsChange }) {
    const [sections, setSections] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newSectionType, setNewSectionType] = useState("collection");

    const { data: getStoreWithSections } = useGetStoreWithSectionsQuery(
        Cookies.get("chooseMarket")
    );

    useEffect(() => {
        if (getStoreWithSections?.data?.sections) {
            const filteredSections = getStoreWithSections.data.sections.filter(
                (s) =>
                    s.$type.toLowerCase() === "category" ||
                    s.$type.toLowerCase() === "collection"
            );
            const mappedSections = filteredSections.map((s) => {
                if (s.$type.toLowerCase() === "collection") {
                    return {
                        id: s.id.toString(),
                        type: "collection",
                        collection: s.collection?.title || "Default Collection",
                        cardsInRow: s.displayColumns || 3,
                        products: s.collection?.products || [],
                    };
                } else if (s.$type.toLowerCase() === "category") {
                    return {
                        id: s.id.toString(),
                        type: "category",
                        category: s.category?.name || "Default Category",
                        cardsInRow: s.displayColumns || 3,
                        products: s.category?.products || [],
                    };
                }
                return s;
            });
            setSections(mappedSections);
            onSectionsChange && onSectionsChange(mappedSections);
        }
    }, [getStoreWithSections, onSectionsChange]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;
        const newSections = reorder(sections, result.source.index, result.destination.index);
        setSections(newSections);
        onSectionsChange && onSectionsChange(newSections);
    };

    const handleSelectChange = (index, field, value) => {
        setSections((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            onSectionsChange && onSectionsChange(updated);
            return updated;
        });
    };

    const handleCardsInRowChange = (index, value) => {
        setSections((prev) => {
            const updated = [...prev];
            updated[index].cardsInRow = Number(value);
            onSectionsChange && onSectionsChange(updated);
            return updated;
        });
    };

    const handleCreateNewSection = () => {
        const newSection = {
            id: `section-${Date.now()}`,
            type: newSectionType,
            cardsInRow: 3,
            products: [],
        };
        if (newSectionType === "collection") {
            newSection.collection = "Winter collection";
        } else {
            newSection.category = "T-shirts";
        }
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
        onSectionsChange && onSectionsChange(updatedSections);
        setIsModalVisible(false);
    };

    const handleRemoveSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
        onSectionsChange && onSectionsChange(updatedSections);
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
                                    <Draggable key={section.id} draggableId={section.id} index={index}>
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
                                                        <button
                                                            className="remove-btn"
                                                            onClick={() => handleRemoveSection(index)}
                                                        >
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
                                                                    <option value="Winter collection">Winter collection</option>
                                                                    <option value="Spring collection">Spring collection</option>
                                                                    <option value="Summer collection">Summer collection</option>
                                                                </select>
                                                            </div>
                                                        )}

                                                        {section.type === "category" && (
                                                            <>
                                                                <div className="label">Selected category</div>
                                                                <Select
                                                                    value={section.category}
                                                                    style={{ width: 150 }}
                                                                    onChange={(value) =>
                                                                        handleSelectChange(index, "category", value)
                                                                    }
                                                                    options={[
                                                                        { label: "T-shirts", value: "T-shirts" },
                                                                        { label: "Hoodies", value: "Hoodies" },
                                                                        { label: "Accessories", value: "Accessories" },
                                                                    ]}
                                                                />
                                                            </>
                                                        )}

                                                        {(section.type === "collection" ||
                                                            section.type === "category") && (
                                                            <div className="inputWrapper1123 cardsInRowControl">
                                                                <div className="label cardsInRowLabel">
                                                                    Show cards in a row
                                                                </div>
                                                                <div className="rangeContainer">
                                                                    <span>3</span>
                                                                    <input
                                                                        type="range"
                                                                        min="3"
                                                                        max="6"
                                                                        step="1"
                                                                        value={section.cardsInRow || 3}
                                                                        onChange={(e) =>
                                                                            handleCardsInRowChange(index, e.target.value)
                                                                        }
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
