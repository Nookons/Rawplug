import React, {useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {Cascader, DatePicker, Input} from "antd";
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


const Home = () => {
    async function addTestItem() {
        const temporaryData = {
            name: 'test'
        }
        const response = await writeUserData({temporaryData})
    }

    return (
        <div className={styles.Main}>
            <BarrelList
                addTestItem={addTestItem}
            />
        </div>
    );
};

export default Home;