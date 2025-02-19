import './index.scss';
import {useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import image1 from "/src/assets/bg.jpg"
import {FiPlus} from "react-icons/fi";

function CategoryModal({isOpen, onClose, onSave}) {
    const [categoryName, setCategoryName] = useState("");

    if (!isOpen) return null;

    return (
        <section id={"categoryModal"}>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <button className="close-button" onClick={onClose}>
                            <AiFillCloseCircle/>
                        </button>

                        <div className={"row"}>
                            <div className={"col-8"}>
                                <div className={"inputWrapper"}>
                                    <label>Category name</label>
                                    <input/>
                                </div>
                                <div className={"inputWrapper"}>
                                    <label>Category description</label>
                                    <textarea rows={6}/>
                                </div>
                            </div>
                            <div className={"bxbx col-4"}>
                                <label>Upload image</label>
                                <div className={"img"}>
                                    <FiPlus/>
                                </div>
                                <button className={"button"}>Save category</button>
                                <button className={"button1"}>Discard category</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryModal;
