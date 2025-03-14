import './index.scss'
import {message, Upload} from 'antd';
import {BsSortUp} from "react-icons/bs";

const {Dragger} = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
    },
};

function AdminSelectFile() {
    return (
        <section id={"adminSelectFile"}>
            <h2>Select file</h2>
            <div className={"wrapper"}>
                <input placeholder={"Search..."}/>
                <button>
                    <BsSortUp className={"icon2"}/>
                    Sort
                </button>
            </div>
            <div className={"addMedia"}>
                <Dragger {...props} style={{
                    border: '1px dashed gray',
                    margin: '16px',
                    width: 'calc(100% - 32px)',
                    borderWidth: '2px'
                }}>
                    <p className="ant-upload-drag-icon">
                        <button>+ Add media</button>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
            <div className={"ending"}>
                <button className={"btnbtntb"}>Cancel</button>
                <button>Done</button>
            </div>
        </section>
    );
}

export default AdminSelectFile;