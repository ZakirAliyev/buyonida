import './index.scss'
import {useState} from 'react';
import {Button, Drawer} from 'antd';
import {IoMenuOutline} from "react-icons/io5";


const HomeNavbarDrawer = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <section id={"homeNavbarDrawer"}>
            <Button onClick={showDrawer} style={{
                display: 'none',
            }} className={"drawerBtn"}>
                <IoMenuOutline/>
            </Button>
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </section>
    );
};
export default HomeNavbarDrawer;