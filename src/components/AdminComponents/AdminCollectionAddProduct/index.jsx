import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import './index.scss';
import { message } from 'antd';
import { BsSortUp } from 'react-icons/bs';
import image2 from "../../../assets/order.png";
import { useGetAllProductsByMarketIdQuery } from "../../../service/userApi.js";
import Cookies from "js-cookie";
import { PRODUCT_LOGO } from "../../../../constants.js";
function AdminCollectionAddProduct({
  selectedProducts,
  setSelectedProducts,
  onDone
}) {
  const {
    t
  } = useTranslation();
  const {
    data: getAllProductsByMarketId
  } = useGetAllProductsByMarketIdQuery(Cookies.get('chooseMarket'));
  const products = getAllProductsByMarketId?.data || [];

  // Axtarış üçün state
  const [searchTerm, setSearchTerm] = useState("");

  // Checkbox‑ın dəyişikliyini valideyn state‑i üzərindən idarə edirik
  const handleCheckboxChange = item => {
    if (selectedProducts.some(prod => prod.id === item.id)) {
      setSelectedProducts(selectedProducts.filter(prod => prod.id !== item.id));
    } else {
      setSelectedProducts([...selectedProducts, item]);
    }
  };

  // "Done" düyməsinə basanda seçilmiş məhsulları localStorage‑a yazırıq və modalı bağlamaq üçün callback çağırırıq
  const handleDone = () => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    message.success("Seçilmiş məhsullar yadda saxlanıldı.");
    if (onDone) {
      onDone();
    }
  };

  // Məhsulları axtarış kriteriyasına uyğun filtr edirik
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return <section id="adminCollectionAddProduct">
            <h2>{t("search_product")}</h2>
            <div className="wrapper">
                <input type="text" placeholder="Search by name..." className="search-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button className="sort-button">
                    <BsSortUp className="icon2" />{t("sort")}</button>
            </div>
            <table className="product-table">
                <tbody>
                {filteredProducts && filteredProducts.length !== 0 ? filteredProducts.map(item => <tr key={item.id}>
                            <td className="birinci">
                                <input type="checkbox" onChange={() => handleCheckboxChange(item)} checked={selectedProducts.some(prod => prod.id === item.id)} />
                            </td>
                            <td className="ikinci">
                                <img src={PRODUCT_LOGO + item?.imageNames[0]} alt="Product" className="product-image" />
                            </td>
                            <td className="ucuncu">{item?.title}</td>
                        </tr>) : <tr>
                        <td colSpan="3" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            flexDirection: 'column',
            gap: '16px',
            margin: '20px auto',
            width: '100%'
          }}>
                            <img src={image2} alt="Image" />
                            <div style={{
              maxWidth: '400px',
              width: '100%'
            }}>{t("there_are_no_products_in_this_collection_search_for_products")}</div>
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
export default AdminCollectionAddProduct;