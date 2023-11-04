import React, {useCallback} from 'react';
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../../firebase";
import styles from './BarrelPreview.module.css'
import {Avatar, Badge, Card, Divider, Form, Radio, Skeleton, Space, Switch} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import stylesBarrel from '../../BarrelList/BarrelList.module.css'

const BarrelPreview = () => {
    const [data, loading, error] = useListVals(ref(db, 'main/items/Barrel'));

    data.sort((a, b) => new Date(a.mixingDate) - new Date(b.mixingDate)); // Преобразование строковых дат в объекты Date и сортировка

    // Сортировка по номеру партии (batchNumber)
    /*data.sort((a, b) => {
        // Используем метод localeCompare() для сравнения строк
        return a.batchNumber.localeCompare(b.batchNumber);
    });*/

    const openItem = useCallback((event) => {
        let targetElement = event.target;
        let id = targetElement.closest('span').id;

        window.location.href = "/item?_" + id;
    }, []);

    return (
        <div className={styles.Main}>
            {data.length
                ?
                data.reverse().map((item, index) => {
                    const rootClasses = [stylesBarrel.badge]

                    switch (item.status.status) {
                        case 'success':
                            rootClasses.push(stylesBarrel.success)
                            break;
                        case 'processing':
                            rootClasses.push(stylesBarrel.processing)
                            break;
                        case 'error':
                            rootClasses.push(stylesBarrel.error)
                            break;
                    }

                    return (
                        <div id={item.id} data-key={'item'} className={styles.item}>
                            <Card
                                style={{ width: '100%' }}

                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined id={item.id} onClick={openItem} key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src={item.imgUrl} />}
                                    title={item.name + '  #' +item.batchNumber}
                                    description={
                                        <div style={{display:'flex', alignItems: 'center', gap: 14}}>
                                            <Badge className={rootClasses.join(' ')}  status={item.status.status} text={item.status.label} />
                                            {item.mixingDate}
                                        </div>
                                    }
                                />
                            </Card>
                        </div>
                    )
                })
                :
                <div>
                    <Skeleton  active='true'/>
                </div>
            }
        </div>
    );
};

export default BarrelPreview;