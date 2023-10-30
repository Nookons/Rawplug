import React, {useState} from 'react';
import {Badge, ConfigProvider, Descriptions, theme} from "antd";
import MyButton from "../MyButton/MyButton";
import styles from './BarrelList.module.css'
import {removeItem, updateUserData} from "../../utils/DataBase";
import {useObject} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";

const Item = ({itemsArray, items, myDate, add, change, remove}) => {
    const [status, setStatus] = useState('processing'); // ["success", "processing", "error", "default", "warning"]


    function changeStatus(e) {
        const id = e.target.value
        try {
            const response = updateUserData({id})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ConfigProvider
            theme={{
                Pagination: {
                    itemActiveBg: '#333333'
                },
            }}
        >
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
                                key: '1',
                                label: 'Location',
                                children: element.location,
                            },
                            {
                                key: '2',
                                label: 'Special ID',
                                children: element.id,
                            },
                            {
                                key: '3',
                                label: 'Add date',
                                children: element.date
                            },
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
                                key: '6',
                                label: 'Last change',
                                children: element.changeDate,
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
                            {
                                key: '10',
                                label: 'Weight',
                                children: '1134 kg',
                            },
                        ];
                        if (index <= items) {
                            return (
                                <div key={element.id} className={styles.item}>
                                    <Descriptions title='' bordered items={item}/>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        gap: 4,
                                        marginTop: 4,
                                    }}>
                                        <button value={element.id} onClick={change}>Change</button>
                                        <button value={element.id} onClick={remove}>Remove</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                <MyButton style={{marginTop: 14}} click={add}>More</MyButton>
            </div>
        </ConfigProvider>
    );
};

export default Item;