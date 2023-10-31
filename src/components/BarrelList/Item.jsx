import React, {useState} from 'react';
import {Badge, ConfigProvider, Descriptions, theme} from "antd";
import MyButton from "../MyButton/MyButton";
import styles from './BarrelList.module.css'
import {removeItem, updateUserData} from "../../utils/DataBase";
import {useObject} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";

const Item = ({itemsArray, items, myDate, add, change, remove}) => {

    function changeStatus(e) {
        const id = e.target.value
        const response = updateUserData({id})
    }

    function openItem(e) {
        let targetElement = e.target;
        let closestButton = targetElement.closest("button");

        window.location.href = "/item?_" + closestButton.value;
        console.log(closestButton.value);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
            {
                itemsArray.map((element, index) => {
                    const rootClasses = [styles.badge]

                    switch (element.status.status) {
                        case 'success':
                            rootClasses.push(styles.success)
                            break;
                        case 'processing':
                            rootClasses.push(styles.processing)
                            break;
                        case 'error':
                            rootClasses.push(styles.error)
                            break;
                    }

                    const item = [
                        {
                            key: '4',
                            label: 'Name',
                            children: element.name,
                        },
                        {
                            key: '5',
                            label: 'Type',
                            children: element.type,
                        },
                        {
                            key: '7',
                            label: 'Mixing date',
                            children: element.mixingDate,
                        },
                        {
                            key: '8',
                            label: 'Status',
                            children:
                                <Badge className={rootClasses.join(' ')} status={element.status.status}
                                       text={element.status.label}/>,
                        },
                        {
                            key: '9',
                            label: 'Batch N',
                            children: '19345',
                        },
                    ];
                    if (index <= items) {
                        return (
                            <div key={element.id} className={styles.item}>
                                <Descriptions title='' bordered items={item}/>
                                <MyButton value={element.id} click={openItem}>Open</MyButton>
                            </div>
                        )
                    }
                })
            }
            <MyButton style={{margin: "0 !important"}} click={add}>More</MyButton>
        </div>
    );
};

export default Item;