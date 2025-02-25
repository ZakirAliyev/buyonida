import './index.scss';
import {message, Upload} from 'antd';
import {BsSortUp} from 'react-icons/bs';
import image1 from '/src/assets/miniPhoto.png';
import image2 from "../../../assets/order.png";

const {Dragger} = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

function AdminCategoryAddProduct() {

    const arr = new Array(0).fill(0)

    return (
        <section id="adminCategoryAddProduct">
            <h2>Select file</h2>
            <div className="wrapper">
                <input type="text" placeholder="Search..." className="search-input"/>
                <button className="sort-button">
                    <BsSortUp className="icon2"/>
                    Sort
                </button>
            </div>
            <table className="product-table">
                <tbody>
                {arr && arr.length !== 0 ? (
                    arr.map((item, index) => (
                        <tr key={index}>
                            <td className="birinci">
                                <input type="checkbox"/>
                            </td>
                            <td className="ikinci">
                                <img src={image1} alt="Product" className="product-image"/>
                            </td>
                            <td className="ucuncu">Product name</td>
                        </tr>
                    ))
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <img src={image2} alt={"Image"}/>
                        <div style={{
                            maxWidth: '400px',
                            width: '100%',
                        }}>
                            There are no products in this collection.
                            Search for products
                        </div>
                    </div>
                )}
                </tbody>
            </table>
            <div className="ending">
                <button className="btnbtntb">Cancel</button>
                <button className="btn-done">Done</button>
            </div>
        </section>
    );
}

export default AdminCategoryAddProduct;
