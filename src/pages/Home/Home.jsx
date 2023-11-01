import React, {useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {Cascader, DatePicker, Input, Tabs} from "antd";
import MyModal from "../../components/MyModal/MyModal";
import {options} from "../../utils/Options";
import {location} from "../../utils/Options";
import {writeMyUserData, writeUserData} from "../../utils/DataBase";
import {useList, useListKeys, useListVals, useObject} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import uniqBarrel from "../../utils/uniq";
import BarrelList from "../../components/BarrelList/BarrelList";
import CartList from "../../components/CartList/CartList";
import AddItem from "../../components/AddItem/AddItem";


const Home = () => {
    const [visible, setVisible] = useState(false);

    const [name, setName] = useState(null);
    const [type, setType] = useState();
    const [batchNumber, setBatchNumber] = useState(null);
    const [mixingDate, setMixingDate] = useState();
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState(null);

    async function addTestItem() {
        const temporaryData = {
            name: 'test'
        }
        const response = await writeUserData({temporaryData})
    }


    const items = [
        {
            key: '1',
            label: 'Barrel',
            children: <BarrelList />,
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

    const handleAddItem = async () => {
        const itemData = {
            name: type ? type[1] : 'Unknown',
            type: type ? type[0] : 'Unknown',
            mixingDate: mixingDate || 'Unknown',
            batchNumber: batchNumber || 'Unknown',
            location: location ? location.join('-') : 'Unknown',
            status: {
                status: status || 'Unknown',
                label: getStatusLabel(status),
            }
        };

        const response = await writeUserData({ data: itemData });
        console.log(response);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "success":
                return 'Used';
            case "processing":
                return 'Available';
            case "error":
                return 'Hold';
            default:
                return 'Unknown';
        }
    };

    async function addItemModal () {
        setVisible(true)
    }

    return (
        <div className={styles.Main}>

            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <AddItem
                    batchNumber={batchNumber}
                    setBatchNumber={setBatchNumber}
                    mixingDate={mixingDate}
                    setMixingDate={setMixingDate}
                    setType={setType}
                    setStatus={setStatus}
                    setLocation={setLocation}
                    handleAddItem={handleAddItem}
                />
            </MyModal>

            <div className={styles.Banner}>
                <div className={styles.BannerText}>
                    <h1>Billing</h1>
                    <h4 style={{color: 'gray'}}>Manage your billing and payment details</h4>
                </div>
                <div className={styles.BannerButton}>
                    <MyButton click={addItemModal}>Add</MyButton>
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