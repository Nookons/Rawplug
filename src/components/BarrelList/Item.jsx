import React, {useState} from 'react';
import {Badge, Descriptions, theme} from "antd";
import MyButton from "../MyButton/MyButton";
import styles from './BarrelList.module.css'
import {removeItem} from "../../utils/DataBase";
import {DeleteOutlined, FullscreenOutlined, InfoCircleOutlined} from "@ant-design/icons";

const Item = ({itemsArray, items, myDate, add, change, remove}) => {


    function openItem(e) {
        let targetElement = e.target;
        let closestButton = targetElement.closest("button");

        window.location.href = "/item?_" + closestButton.value;
        console.log(closestButton.value);
    }

    async function deleteItem(e) {
        const id = e.target.value
        const response = await removeItem({id})
        console.log(response)
        alert('Item deleted')
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
                            children: <Badge className={rootClasses.join(' ')} status={element.status.status} text={element.status.label}/>,
                        },
                    ];
                    if (index <= items) {
                        return (
                            <div key={element.id} className={styles.item}>
                                <Descriptions title='' bordered items={item}/>
                                <div style={{
                                    display: 'flex',
                                    float: 'right',
                                    gap: 4,
                                    margin: '14px 0'
                                }}>
                                    <MyButton value={element.id} click={openItem}><InfoCircleOutlined /></MyButton>
                                    <MyButton value={element.id} click={deleteItem}><DeleteOutlined /></MyButton>
                                </div>
                            </div>
                        )
                    }
                })
            }
            <MyButton style={{margin: "0 !important"}} click={add}>More...</MyButton>
        </div>
    );
};

export default Item;