import React, {useCallback, useState} from 'react';
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../../firebase";
import styles from './BarrelPreview.module.css'
import {Avatar, Badge, Button, Card, Divider, Form, List, Radio, Skeleton, Space, Statistic, Switch} from 'antd';
import {EditOutlined, EllipsisOutlined, MoreOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import stylesBarrel from '../../BarrelList/BarrelList.module.css'
import CountUp from 'react-countup';

const BarrelPreview = () => {
    const [data, loading, error] = useListVals(ref(db, 'main/items/Barrel'));

    data.sort((a, b) => new Date(a.mixingDate) - new Date(b.mixingDate)); // Преобразование строковых дат в объекты Date и сортировка

    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);

    const onLoadMore = () => {
        console.log('loading')
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    // Сортировка по номеру партии (batchNumber)
    /*data.sort((a, b) => {
        // Используем метод localeCompare() для сравнения строк
        return a.batchNumber.localeCompare(b.batchNumber);
    });*/

    const openItem = useCallback((event) => {
        let targetElement = event.target;
        let id = targetElement.closest('a').id;

        window.location.href = "/item?_" + id;
    }, []);

    const formatter = (value) => <CountUp end={value} separator="," />;

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (

                    <List.Item
                        actions={[<a id={item.id} onClick={openItem}><MoreOutlined /></a>]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.imgUrl} size={"large"}/>}
                                title={<a id={item.id} onClick={openItem}>{item.name + '  #' + item.batchNumber}</a>}
                                description={<div>Mixing date: {item.mixingDate} <hr/> <Badge status={item.status.status} text={item.status.label} /></div>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default BarrelPreview;