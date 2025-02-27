import "./index.scss";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FiPlus } from "react-icons/fi";

const Variants = ({ variantKey, updateVariant, options, autoFocusRef }) => {
    const initialName = options?.name || "";
    const initialValues = options?.values || [{ id: 0, value: "" }];
    const [variantName, setVariantName] = useState(initialName);
    const [localOptions, setLocalOptions] = useState(initialValues);

    useEffect(() => {
        if (autoFocusRef?.current) {
            autoFocusRef.current.focus();
        }
    }, [autoFocusRef]);

    // Herhangi bir değişiklikte üst bileşene güncellenmiş veriyi gönderiyoruz
    useEffect(() => {
        updateVariant(variantKey, { name: variantName, values: localOptions });
    }, [variantName, localOptions]);

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = localOptions.map((option, i) =>
            i === index ? { ...option, value: newValue } : option
        );
        setLocalOptions(updatedOptions);
    };

    const handleAddOption = () => {
        const newOptions = [...localOptions, { id: localOptions.length, value: "" }];
        setLocalOptions(newOptions);
    };

    const handleBlur = (index, value) => {
        if (value.trim() === "") {
            const filteredOptions = localOptions
                .filter((_, i) => i !== index)
                .map((option, i) => ({ ...option, id: i }));
            setLocalOptions(filteredOptions);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedOptions = Array.from(localOptions);
        const [movedItem] = reorderedOptions.splice(result.source.index, 1);
        reorderedOptions.splice(result.destination.index, 0, movedItem);
        const updatedOptions = reorderedOptions.map((option, index) => ({
            ...option,
            id: index,
        }));
        setLocalOptions(updatedOptions);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="variants">
                <div className="variants__section">
                    <label className="variants__label">Option name</label>
                    <input
                        type="text"
                        className="variants__input"
                        ref={autoFocusRef}
                        placeholder="Enter option name"
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                    />
                </div>
                <div className="variants__section">
                    <label className="variants__label">Option values</label>
                    <Droppable droppableId={`options-${variantKey}`}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="variants__list">
                                {localOptions.map((option, index) => (
                                    <Draggable key={option.id} draggableId={option.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                className="variants__row"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="variants__drag">⋮⋮</div>
                                                <input
                                                    type="text"
                                                    className="variants__input"
                                                    value={option.value}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    onBlur={(e) => handleBlur(index, e.target.value)}
                                                    placeholder="Enter value"
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div
                        className="dropdown-item11"
                        onClick={handleAddOption}
                        style={{ margin: "0", marginTop: "16px" }}
                    >
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FiPlus className="iconPlus" /> Add another value
            </span>
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

const VariantContainer = () => {
    const [variants, setVariants] = useState({});
    const inputRefs = useRef({});

    const addVariant = () => {
        setVariants((prevVariants) => {
            const newKey = `variant_${Object.keys(prevVariants).length}`;
            inputRefs.current[newKey] = React.createRef();
            return {
                ...prevVariants,
                [newKey]: { name: "", values: [{ id: 0, value: "" }] }
            };
        });
    };

    const updateVariant = (variantKey, updatedData) => {
        setVariants((prevVariants) => ({
            ...prevVariants,
            [variantKey]: updatedData,
        }));
    };

    const handleSaveChanges = () => {
        // Kaydedilen variant verilerini localStorage'ye istenilen formatta yazıyoruz
        localStorage.setItem("variantData", JSON.stringify(variants));
        alert("Variant verileri kaydedildi!");
    };

    return (
        <>
            <div className="wrapper" style={{ marginTop: "40px", padding: "0" }}>
                <h3 style={{ margin: "0", marginTop: "32px", padding: "0 32px" }}>Variant</h3>
                {Object.entries(variants).map(([key, data]) => (
                    <Variants
                        key={key}
                        variantKey={key}
                        updateVariant={updateVariant}
                        options={data}
                        autoFocusRef={inputRefs.current[key]}
                    />
                ))}
                <div className="dropdown-item11" onClick={addVariant} style={{ marginTop: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FiPlus className="iconPlus" /> Add options like size or color
          </span>
                </div>
            </div>
            <button className="save" onClick={handleSaveChanges}>
                Save changes
            </button>
        </>
    );
};

export default VariantContainer;
