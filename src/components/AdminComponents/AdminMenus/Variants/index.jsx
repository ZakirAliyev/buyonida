import "./index.scss";
import React, {useState, useRef, useEffect} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {FiPlus} from "react-icons/fi";

const Variants = ({variantIndex, updateVariant, options, autoFocusRef}) => {
    const [localOptions, setLocalOptions] = useState(options || [{id: 0, value: ""}]);

    useEffect(() => {
        if (autoFocusRef?.current) {
            autoFocusRef.current.focus();
        }
    }, [autoFocusRef]);

    const handleOptionChange = (index, newValue) => {
        const updatedOptions = localOptions.map((option, i) =>
            i === index ? {...option, value: newValue} : option
        );
        setLocalOptions(updatedOptions);
        updateVariant(variantIndex, updatedOptions);
    };

    const handleAddOption = () => {
        setLocalOptions((prevOptions) => {
            const newOptions = [...prevOptions, {id: prevOptions.length, value: ""}];
            updateVariant(variantIndex, newOptions);
            return newOptions;
        });
    };

    const handleBlur = (index, value) => {
        if (value.trim() === "") {
            setLocalOptions((prevOptions) => {
                const filteredOptions = prevOptions.filter((_, i) => i !== index);
                const updatedOptions = filteredOptions.map((option, i) => ({...option, id: i}));
                updateVariant(variantIndex, updatedOptions);
                return updatedOptions;
            });
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
        updateVariant(variantIndex, updatedOptions);
    };

    return (
        <div className="variants">

            <DragDropContext>
                <Droppable>
                    <div className="variants__section">
                        <label className="variants__label">Option name</label>
                        <input
                            type="text"
                            className="variants__input"
                            ref={autoFocusRef} // 👈 Automatically focus this input
                        />
                    </div>
                </Droppable>
            </DragDropContext>
            <div className="variants__section">
                <label className="variants__label">Option values</label>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={`options-${variantIndex}`}>
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
                </DragDropContext>
                <div className="dropdown-item11" onClick={handleAddOption} style={{margin: '0', marginTop: "16px"}}>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}><FiPlus className={"iconPlus"}/> Add another value</span>
                </div>
            </div>
        </div>
    );
};

const VariantContainer = () => {
    const [variants, setVariants] = useState({});
    const inputRefs = useRef({});

    const addVariant = () => {
        setVariants((prevVariants) => {
            const newKey = `variant_${Object.keys(prevVariants).length}`;
            inputRefs.current[newKey] = React.createRef(); // Create a new ref for the input
            return {
                ...prevVariants,
                [newKey]: [{id: 0, value: ""}],
            };
        });
    };

    const updateVariant = (index, updatedOptions) => {
        setVariants((prevVariants) => ({
            ...prevVariants,
            [`variant_${index}`]: updatedOptions,
        }));
    };

    return (
        <div className={"wrapper"} style={{marginTop: "40px", padding: "0"}}>
            <h3 style={{margin: "0", marginTop: "32px", padding: "0 32px"}}>Variant</h3>
            {Object.entries(variants).map(([key, options], index) => (
                <Variants
                    key={key}
                    variantIndex={index}
                    updateVariant={updateVariant}
                    options={options}
                    autoFocusRef={inputRefs.current[key]}
                />
            ))}
            <div className="dropdown-item11" onClick={addVariant} style={{marginTop: "16px"}}>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}><FiPlus className={"iconPlus"}/> Add options like size or color</span>
            </div>
        </div>
    );
};

export default VariantContainer;
