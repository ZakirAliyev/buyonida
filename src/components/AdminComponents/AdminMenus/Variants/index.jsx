import "./index.scss";
import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

// Tek bir variantın (seçenek grubunun) düzenlendiği bileşen.
function VariantItem({ variant, index, updateVariant, deleteVariant }) {
    const [variantName, setVariantName] = useState(variant.name || "");
    // En az bir seçenek olacak şekilde başlatıyoruz.
    const [options, setOptions] = useState(variant.values && variant.values.length ? variant.values : [{ id: 0, value: "" }]);
    const autoFocusRef = useRef(null);

    // Herhangi bir değişiklik yapıldığında ilgili variantı 'edited' olarak işaretleyip üst bileşene bildiriyoruz.
    useEffect(() => {
        const updatedVariant = {
            ...variant,
            name: variantName,
            values: options,
            edited: true
        };
        updateVariant(index, updatedVariant);
    }, [variantName, options]);

    const handleOptionChange = (optIndex, newValue) => {
        setOptions((prev) =>
            prev.map((opt, i) => (i === optIndex ? { ...opt, value: newValue } : opt))
        );
    };

    const handleAddOption = () => {
        setOptions((prev) => [...prev, { id: prev.length, value: "" }]);
    };

    // Eğer seçenek alanı boş bırakılırsa o satırı kaldırıyoruz
    const handleBlur = (optIndex, value) => {
        if (value.trim() === "") {
            setOptions((prev) => {
                const filtered = prev.filter((_, i) => i !== optIndex).map((opt, i) => ({ ...opt, id: i }));
                return filtered.length ? filtered : [{ id: 0, value: "" }];
            });
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reordered = Array.from(options);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        const updated = reordered.map((opt, i) => ({ ...opt, id: i }));
        setOptions(updated);
    };

    return (
        <div className="variants__section">
            <div className="variantHeader" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <label className="variants__label">Option name</label>
                    <input
                        type="text"
                        placeholder="Enter option name"
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                        ref={autoFocusRef}
                        className="variants__input"
                    />
                </div>
                <button className="deleteVariantButton" onClick={() => deleteVariant(index)}>
                    Delete Variant
                </button>
            </div>
            <div className="variants__section">
                <label className="variants__label">Option values</label>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={`droppable-${index}`}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="variants__list">
                                {options.map((opt, optIndex) => (
                                    <Draggable key={optIndex.toString()} draggableId={`${index}-${optIndex}`} index={optIndex}>
                                        {(provided) => (
                                            <div
                                                className="variants__row"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="variants__drag">≡</div>
                                                <input
                                                    type="text"
                                                    placeholder="Enter value"
                                                    value={opt.value}
                                                    onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                                                    onBlur={(e) => handleBlur(optIndex, e.target.value)}
                                                    className="variants__input"
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="dropdown-item11">
          <span className="soan" onClick={handleAddOption}>
            <FiPlus /> Add another value
          </span>
                </div>
            </div>
        </div>
    );
}

// VariantContainer: Tüm variantları listeler ve yeni variant eklenmesini sağlar.
function VariantContainer({ variants, onVariantsChange }) {
    const [localVariants, setLocalVariants] = useState(variants || []);

    useEffect(() => {
        setLocalVariants(variants);
    }, [variants]);

    // Bir variant güncellendiğinde
    const handleUpdateVariant = (index, updatedData) => {
        const updatedVariants = localVariants.map((variant, i) =>
            i === index ? updatedData : variant
        );
        setLocalVariants(updatedVariants);
        onVariantsChange(updatedVariants);
    };

    // Bir variant silindiğinde
    const handleDeleteVariant = (index) => {
        const updatedVariants = localVariants.filter((_, i) => i !== index);
        setLocalVariants(updatedVariants);
        onVariantsChange(updatedVariants);
    };

    // Yeni variant ekle
    const handleAddVariant = () => {
        const newVariant = {
            id: null, // henüz veritabanında değil
            name: "",
            values: [{ id: 0, value: "" }],
            isNew: true,
            edited: true
        };
        const updatedVariants = [...localVariants, newVariant];
        setLocalVariants(updatedVariants);
        onVariantsChange(updatedVariants);
    };

    return (
        <div className="variants">
            <h3 style={{ margin: "32px 0 16px 0" }}>Variant</h3>
            {localVariants.map((variant, index) => (
                <VariantItem
                    key={index}
                    variant={variant}
                    index={index}
                    updateVariant={handleUpdateVariant}
                    deleteVariant={handleDeleteVariant}
                />
            ))}
            <div className="dropdown-item112" onClick={handleAddVariant} style={{ margin: "16px 0", cursor: "pointer" }}>
        <span className="soan" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FiPlus /> Add options like size or color
        </span>
            </div>
        </div>
    );
}

export default VariantContainer;
