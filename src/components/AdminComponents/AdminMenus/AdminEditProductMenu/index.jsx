import { useTranslation } from "react-i18next";
// AdminEditProductMenu.jsx
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import CategoryModal from "../../CategoryModal/index.jsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useGetAllCategoriesByMarketIdQuery, useGetProductByIdQuery, usePostEditProductMutation } from "../../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../../constants.js";
import VariantContainer from "../Variants/index.jsx";
import { InputField } from "../../InputField/index.jsx";
import Dropdown from "../../Dropdown/index.jsx";
import CheckboxField from "../../CheckboxField/index.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { PulseLoader } from "react-spinners";
function AdminEditProductMenu() {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id: myId,
    marketId: myMarketId
  } = useParams();

  // FormData için state
  const [formData, setFormData] = useState({
    ImagesToAdd: []
  });
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showTrack, setShowTrack] = useState(false);
  const [showSku, setShowSku] = useState(false);
  const [status, setStatus] = useState(true);

  // Yeni state: variant için hata mesajı
  const [variantError, setVariantError] = useState("");

  // getProductByIdQuery'den refetch'i de alıyoruz
  const {
    data: getProductById,
    refetch: refetchProduct
  } = useGetProductByIdQuery({
    marketId: myMarketId,
    id: myId
  });
  const product = getProductById?.data;
  const {
    data: getAllCategoriesByMarketId
  } = useGetAllCategoriesByMarketIdQuery(Cookies.get("chooseMarket"));
  const myCategories = getAllCategoriesByMarketId?.data || [];

  // Ürün alanları
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [isStock, setIsStock] = useState(false);
  const [stock, setStock] = useState(null);
  const [errors, setErrors] = useState({});

  // Görseller
  const [currentImages, setCurrentImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const fileInputRef = useRef(null);

  // Sayfa açılır açılır, en güncel ürünü almak için refetch çalışsın
  useEffect(() => {
    refetchProduct();
  }, [refetchProduct]);

  // Ürün verilerini güncelle (En güncel JSON verisini inputlara aktar)
  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setPrice(product.price !== undefined ? product.price.toString() : "");
      setComparePrice(product.comparePrice !== undefined ? product.comparePrice.toString() : "");
      setDescription(product.description || "");
      setSelectedCategoryId(product.categoryId || null);
      setSku(product.sku || "");
      setBarcode(product.barcode || "");
      setIsStock(product.isStock || false);
      setStock(product.stock !== undefined ? product.stock.toString() : "");
      setShowTrack(product.isStock || false);
      setShowSku(!!product.sku || !!product.barcode);
      setVariants(product.productOptions || []);
      setCurrentImages(product.imageNames || []);
      setStatus(product.status);
    }
  }, [product]);

  // Kategori adını ayarla
  useEffect(() => {
    if (selectedCategoryId && myCategories.length > 0) {
      const foundCategory = myCategories.find(cat => cat.id === selectedCategoryId);
      if (foundCategory) {
        setSelectedCategoryName(foundCategory.name);
      }
    }
  }, [selectedCategoryId, myCategories]);

  // Variant’lerin alanlarının dolu olup olmadığını kontrol et
  useEffect(() => {
    let error = "";
    for (let variant of variants) {
      if (!variant.name || variant.name.trim() === "") {
        error = "Tüm haneleri doldurun";
        break;
      }
      for (let opt of variant.values) {
        if (!opt.value || opt.value.trim() === "") {
          error = "Tüm haneleri doldurun";
          break;
        }
      }
      if (error) break;
    }
    setVariantError(error);
  }, [variants]);
  const toggleStatus = () => {
    setStatus(prevStatus => !prevStatus);
  };
  const handleIsStockChange = e => {
    const newVal = e.target.checked;
    setIsStock(newVal);
    setShowTrack(newVal);
    if (!newVal) setStock(0);
  };
  const handleCategorySelect = (catName, catId) => {
    setSelectedCategoryName(catName);
    setSelectedCategoryId(catId);
    setErrors(prevErrors => ({
      ...prevErrors,
      category: ""
    }));
  };
  const handleCreateCategory = categoryName => {
    if (categoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        marketId: myMarketId
      };
      myCategories.push(newCategory);
      setSelectedCategoryName(categoryName);
      setSelectedCategoryId(newCategory.id);
    }
    setIsModalOpen(false);
  };
  const handleTitleChange = e => {
    setTitle(e.target.value);
    setErrors(prev => ({
      ...prev,
      title: e.target.value.trim() === "" ? "Title can't be blank" : ""
    }));
  };
  const handlePricingChange = e => {
    setPrice(e.target.value);
    setErrors(prev => ({
      ...prev,
      price: e.target.value.trim() === "" ? "Price can't be blank" : ""
    }));
  };
  const handleComparePriceChange = e => {
    setComparePrice(e.target.value);
    setErrors(prev => ({
      ...prev,
      comparePrice: e.target.value.trim() === "" ? "Compare-at price can't be blank" : ""
    }));
  };
  const handleDescriptionChange = value => {
    setDescription(value);
    setErrors(prev => ({
      ...prev,
      description: value.trim() === "<p><br></p>" ? "Description can't be blank" : ""
    }));
  };
  const handleSkuChange = e => {
    setSku(e.target.value);
    setErrors(prev => ({
      ...prev,
      sku: e.target.value.trim() === "" ? "SKU is required" : ""
    }));
  };
  const handleBarcodeChange = e => {
    setBarcode(e.target.value);
    setErrors(prev => ({
      ...prev,
      barcode: e.target.value.trim() === "" ? "Barcode is required" : ""
    }));
  };
  const handleStockChange = e => {
    setStock(e.target.value);
  };
  const handleDeleteImage = imageName => {
    setCurrentImages(prev => prev.filter(name => name !== imageName));
    setDeletedImages(prev => [...prev, imageName]);
  };
  const handleImageChange = e => {
    const files = e.target.files;
    if (files && files.length) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        ImagesToAdd: [...prev.ImagesToAdd, ...fileArray]
      }));
      setNewImages(prev => [...prev, ...fileArray]);
      e.target.value = "";
      setErrors(prev => ({
        ...prev,
        images: ""
      }));
    }
  };
  const handleRemoveNewImage = file => {
    setNewImages(prev => prev.filter(f => f !== file));
    setFormData(prev => ({
      ...prev,
      ImagesToAdd: prev.ImagesToAdd.filter(f => f !== file)
    }));
  };
  const [postEditProduct] = usePostEditProductMutation();
  const [editLoading, setEditLoading] = useState(false);
  const handleSave = async () => {
    const newErrors = {};
    if (String(price).trim() === "") newErrors.price = "Price can't be blank";
    if (String(comparePrice).trim() === "") newErrors.comparePrice = "Compare-at price can't be blank";
    if (String(description).trim() === "" || description.trim() === "<p><br></p>") newErrors.description = "Description can't be blank";
    if (!selectedCategoryId) newErrors.category = "Please select a category";
    if (currentImages.length + newImages.length < 1) newErrors.images = "At least one image is required";
    if (showSku) {
      if (String(sku).trim() === "") newErrors.sku = "SKU is required";
      if (String(barcode).trim() === "") newErrors.barcode = "Barcode is required";
    }
    // Variant alanlarını kontrol et
    if (variantError) newErrors.variant = variantError;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // FormData oluşturma
    const fd = new FormData();
    fd.append("MarketId", parseInt(myMarketId));
    fd.append("Id", parseInt(myId));
    fd.append("Status", status);
    if (title !== product.title) fd.append("Title", title);
    if (parseFloat(price) !== product.price) fd.append("Price", parseFloat(price));
    if (parseFloat(comparePrice) !== product.comparePrice) fd.append("ComparePrice", parseFloat(comparePrice));
    if (description !== product.description) fd.append("Description", description);
    if (selectedCategoryId !== product.categoryId) fd.append("CategoryId", selectedCategoryId);
    if (sku !== product.sku) fd.append("SKU", sku);
    if (barcode !== product.barcode) fd.append("Barcode", barcode);
    fd.append("IsStock", isStock);
    if (parseInt(stock) !== product.stock) fd.append("Stock", parseInt(stock));
    if (deletedImages.length > 0) {
      deletedImages.forEach(img => fd.append("ImageNamesToRemove", img));
    }
    const allVariants = variants.map((variant, idx) => ({
      name: variant.name,
      displayOrder: idx,
      values: variant.values.map((val, idx2) => ({
        value: val.value,
        displayOrder: idx2
      }))
    }));
    fd.append("ProductOptionsJson", JSON.stringify(allVariants));
    if (formData.ImagesToAdd && formData.ImagesToAdd.length > 0) {
      formData.ImagesToAdd.forEach(file => fd.append("ImagesToAdd", file));
    }
    setEditLoading(true);
    try {
      const response = await postEditProduct(fd).unwrap();
      if (response?.statusCode === 200) {
        refetchProduct(); // Güncel verileri almak için refetch
        toast.success('Mehsul ugurla yenilendi!', {
          position: 'bottom-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          onClose: () => navigate('/cp/products')
        });
      }
    } catch (error) {
      toast.error('Xeta bas verdi!', {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
    setEditLoading(false);
  };
  return <section id="adminEditProductMenu">
            <div className="umumi">
                <div className="abso">
                    <span>{t("product_status")}</span>
                    <button onClick={toggleStatus}>{status ? "Active" : "Passive"}</button>
                </div>
                <div className="lineWrapper">
                    <div className="arrow" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="icon" />
                    </div>
                    <h1>{t("edit_product")}</h1>
                </div>
                <div className="wrapper">
                    <InputField label="Title" id="productTitle" name="title" placeholder="Enter product title" value={title} onChange={handleTitleChange} error={errors.title} />
                    <div className="inputWrapper">
                        <label>{t("description")}</label>
                        <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} className={errors.description ? "codeEditor errorInput" : "codeEditor"} />
                        {errors.description && <span className="error-text">
                                <AiOutlineExclamationCircle className="icon" />
                                {errors.description}
                            </span>}
                    </div>
                    <div className="inputWrapper">
                        <label style={{
            marginBottom: "10px"
          }}>{t("image")}</label>
                        <div className="boxWrapper" style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px"
          }}>
                            {/* Yeni: Resim ekleme butonu (+ ikonlu) */}
                            <label className="image-upload-container" style={{
              position: "relative",
              cursor: "pointer"
            }} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                <div className="image-upload-button" style={{
                aspectRatio: "1/1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                                    <FiPlus className="icon" />
                                </div>
                            </label>
                            {/* Mevcut görseller */}
                            {currentImages.map((image, index) => <div key={index} className="imageWrapper" style={{
              position: "relative",
              margin: "8px"
            }}>
                                    <img src={PRODUCT_LOGO + image} alt={`Product Image ${index + 1}`} style={{
                width: "150px",
                height: "150px",
                objectFit: "cover"
              }} />
                                    <button className="deleteImageButton" onClick={() => handleDeleteImage(image)} style={{
                position: "absolute",
                top: "5px",
                right: "15px",
                background: "#ccc",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer"
              }}>{t("")}</button>
                                </div>)}
                            {newImages.map((file, index) => <div key={index} className="imageWrapper" style={{
              position: "relative",
              margin: "8px"
            }}>
                                    <img src={URL.createObjectURL(file)} alt={`New Upload ${index + 1}`} style={{
                width: "150px",
                height: "150px",
                objectFit: "cover"
              }} />
                                    <button className="deleteImageButton" onClick={() => handleRemoveNewImage(file)} style={{
                position: "absolute",
                top: "5px",
                right: "15px",
                background: "#ccc",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer"
              }}>{t("")}</button>
                                </div>)}
                        </div>
                        {errors.images && <span className="error-text">{errors.images}</span>}
                    </div>
                    <Dropdown label="Category" options={myCategories} selectedOption={selectedCategoryName} onSelect={handleCategorySelect} onCreate={() => setIsModalOpen(true)} error={errors.category} path={location.pathname.toString().includes("/edit-product")} />
                </div>
                <div className="row">
                    <div className="col-4 priceBox priceBox1">
                        <div className="wrapper" style={{
            height: "100%",
            padding: "32px"
          }}>
                            <h3>{t("pricing")}</h3>
                            <InputField label="Pricing" id="productPricing" name="price" value={price} onChange={handlePricingChange} error={errors.price} />
                            <InputField label="Compare-at-price" id="productComparePrice" name="comparePrice" value={comparePrice} onChange={handleComparePriceChange} error={errors.comparePrice} />
                        </div>
                    </div>
                    <div className="col-8 priceBox priceBox2">
                        <div className="wrapper" style={{
            height: "100%",
            padding: "32px"
          }}>
                            <h3 style={{
              marginBottom: "5px"
            }}>{t("inventory")}</h3>
                            <div className="inventoryWrapper">
                                <CheckboxField label="Track quantity" checked={isStock} onChange={handleIsStockChange} />
                                {showTrack && <div className="inputWrapper" style={{
                width: "max-content",
                height: "50px"
              }}>
                                        <input id="stock" name="stock" value={stock || ""} onChange={handleStockChange} type="number" style={{
                  width: "100px",
                  marginTop: "20px"
                }} />
                                    </div>}
                            </div>
                            <div className="line"></div>
                            <div className="inventoryWrapper">
                                <CheckboxField label="Continue selling when out of stock" checked={false} onChange={() => {}} />
                            </div>
                            <div className="inventoryWrapper">
                                <CheckboxField label="This product has a SKU or barcode" checked={showSku} onChange={() => {
                setShowSku(!showSku);
                if (!showSku) {
                  setErrors(prev => ({
                    ...prev,
                    sku: "",
                    barcode: ""
                  }));
                }
              }} />
                            </div>
                            {showSku && <div className="bx row">
                                    <div className="priceBox priceBox1 col-6">
                                        <InputField label="SKU (Stock Keeping Unit)" id="sku" name="sku" value={sku} onChange={handleSkuChange} error={errors.sku} />
                                    </div>
                                    <div className="priceBox priceBox2 col-6">
                                        <InputField label="Barcode (ISBN, UPC, GTIN, etc.)" id="barcode" name="barcode" value={barcode} onChange={handleBarcodeChange} error={errors.barcode} />
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
                <VariantContainer variants={variants} onVariantsChange={setVariants} />
                {errors.variant && <div className="error-text" style={{
        color: "red",
        textAlign: "center",
        marginTop: "-20px",
        background: 'white',
        width: 'max-content',
        padding: '5px 10px',
        borderRadius: '10px'
      }}>
                    <AiOutlineExclamationCircle />
                    {errors.variant}</div>}
                <div className="saveButton" style={{
        marginTop: "20px",
        textAlign: "center"
      }}>
                    <button className="save" onClick={handleSave} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: 'white'
        }}>
                        {editLoading ? <>
                            <PulseLoader color={'white'} />
                        </> : <>{t("save_changes")}</>}
                    </button>
                </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{
      display: "none"
    }} accept="image/*" multiple />
            <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleCreateCategory} />
            <ToastContainer />
        </section>;
}
export default AdminEditProductMenu;