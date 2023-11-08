import React, {useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {
    Avatar, DatePicker, Form, Input,
    InputNumber, Mentions,
    Modal,
    Pagination,
    Popconfirm,
    Progress, Rate,
    Result,
    Segmented,
    Skeleton, Slider,
    Spin, Switch,
    Tabs, Upload
} from "antd";
import MyModal from "../../components/MyModal/MyModal";
import {writeUserData} from "../../utils/DataBase";
import {
    FileAddOutlined,
    LoadingOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined
} from "@ant-design/icons";
import AddItem from "../../components/AddItem/AddItem";
import BarrelPreview from "../../components/HomePreview/Barrel/BarrelPreview";
import {Link} from "react-router-dom";
import Button from "antd/es/button";
import Checkbox from "antd/es/checkbox/Checkbox";
import TextArea from "antd/es/input/TextArea";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {ExampleLoaderComponent} from "../../dev/palette";


const Home = () => {
    const [visible, setVisible] = useState(false);

    const items = [
        {
            key: '1',
            label: 'Barrel',
            children: <BarrelPreview />,
        },
        {
            key: '2',
            label: 'Cart',
            children: 'Cart Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Nozle',
            children: 'Nozle Content of Tab Pane 3',
        },
    ];

    async function addItemModal () {
        setVisible(true)
    }

    return (
        <div className={styles.Main}>

            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
            </MyModal>

            <div className={styles.Banner}>
                <div className={styles.BannerText}>
                    <h1>Warehouse management of materials</h1>
                    <h4 style={{color: 'gray'}}>and material movements</h4>
                </div>
                <div className={styles.BannerButton}>
                    <MyButton><Link to="/add-item"><FileAddOutlined /></Link></MyButton>
                    <MyButton click={addItemModal}><SearchOutlined /></MyButton>
                    <MyButton>Download PDF Report</MyButton>
                </div>
            </div>
            <Tabs
                defaultActiveKey="1"
                items={items}
                indicatorSize={(origin) => origin - 16}
            />
        </div>
    );
};

export default Home;