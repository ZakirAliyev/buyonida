import { useTranslation } from "react-i18next";
import './index.scss';
import { useState, useEffect } from 'react';
import { BsSortUp } from 'react-icons/bs';
import image1 from '/src/assets/miniPhoto.png';
import image2 from "../../../assets/order.png";
import { useGetAllProductsByMarketIdQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../constants.js";
import { message } from 'antd';
function AdminCategoryAddProduct({
  selectedProducts,
  onProductSelect,
  allProducts
}) {
  const {
    t
  } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState(selectedProducts || []);
  const [localProducts, setLocalProducts] = useState([]);
  const {
    data: getAllProducts
  } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
  useEffect(() => {
    if (getAllProducts?.data) {
      setLocalProducts(getAllProducts.data);
    }
  }, [getAllProducts]);

  // Remove the useEffect that overrides selectedProductIds from localStorage
  // We rely on the prop `selectedProducts` passed from the parent instead

  useEffect(() => {
    // Sync localStorage with selectedProductIds whenever it changes
    localStorage.setItem('collectionProductIds', JSON.stringify(selectedProductIds));
  }, [selectedProductIds]);
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  const handleProductSelect = productId => {
    const originalProductIds = JSON.parse(localStorage.getItem('originalCollectionProductIds')) || [];
    let updatedSelectedProductIds = [...selectedProductIds];
    let updatedDeletedProductIds = JSON.parse(localStorage.getItem('deletedProductIds')) || [];
    if (updatedSelectedProductIds.includes(productId)) {
      // Unselecting the product
      updatedSelectedProductIds = updatedSelectedProductIds.filter(id => id !== productId);
      // Only add to deletedProductIds if it was originally in the collection
      if (originalProductIds.includes(productId)) {
        updatedDeletedProductIds.push(productId);
      }
    } else {
      // Selecting the product
      updatedSelectedProductIds.push(productId);
      // Remove from deletedProductIds if it was there (e.g., reversing a deletion)
      updatedDeletedProductIds = updatedDeletedProductIds.filter(id => id !== productId);
    }
    setSelectedProductIds(updatedSelectedProductIds);
    localStorage.setItem('collectionProductIds', JSON.stringify(updatedSelectedProductIds));
    localStorage.setItem('deletedProductIds', JSON.stringify(updatedDeletedProductIds));
  };
  const handleDone = () => {
    onProductSelect(selectedProductIds);
    message.success("Products added to the collection successfully!");
  };
  return <section id="adminCategoryAddProduct">
            <h2>{t("select_products")}</h2>
            <div className="wrapper">
                <input type="text" placeholder="Search..." className="search-input" value={searchTerm} onChange={handleSearchChange} />
                <button className="sort-button">
                    <BsSortUp className="icon2" />{t("sort")}</button>
            </div>
            <table className="product-table">
                <tbody>
                {localProducts.length > 0 ? localProducts.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())).map(product => <tr key={product.id}>
                                <td className="birinci">
                                    <input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => handleProductSelect(product.id)} />
                                </td>
                                <td className="ikinci">
                                    <img src={product.imageNames && product.imageNames.length > 0 ? `${PRODUCT_LOGO}${product.imageNames[0]}` : image1} alt="Product" className="product-image" />
                                </td>
                                <td className="ucuncu">{product.title}</td>
                            </tr>) : <tr>
                        <td colSpan="3" style={{
            textAlign: 'center',
            padding: '20px'
          }}>
                            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px'
            }}>
                                <img src={image2} alt="No products" />
                                <div style={{
                maxWidth: '400px',
                width: '100%'
              }}>{t("there_are_no_products_available_to_add")}</div>
                            </div>
                        </td>
                    </tr>}
                </tbody>
            </table>
            <div className="ending">
                <button className="btnbtntb">{t("cancel")}</button>
                <button className="btn-done" onClick={handleDone}>{t("done")}</button>
            </div>
        </section>;
}
export default AdminCategoryAddProduct;