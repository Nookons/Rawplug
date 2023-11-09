import React, {useCallback, useState} from 'react';
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../../firebase";
import styles from './BarrelPreview.module.css'
import {
    Avatar,
    Badge,
    Button,
    Card,
    Divider,
    Form,
    List,
    message,
    Radio,
    Skeleton,
    Space,
    Statistic,
    Switch
} from 'antd';
import {DeleteOutlined, EditOutlined, EllipsisOutlined, MoreOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import stylesBarrel from '../../BarrelList/BarrelList.module.css'
import CountUp from 'react-countup';
import {removeItem} from "../../../utils/DataBase";

const BarrelPreview = ({data, loading}) => {
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState([]);

    const openItem = useCallback((event) => {
        let targetElement = event.target;
        let id = targetElement.closest('a').id;
        window.location.href = "/item?_" + id;
    }, []);

    const deleteItem =  useCallback(async (event) => {
        let targetElement = event.target;
        let id = targetElement.closest('a').id;


        const response =  await removeItem({id})
        if (response) {
            //window.location.reload();
            message.success('item ' + id + ' was deleted')
        }
        console.log(id)
    }, []);

    const dataDateSort = data.sort((a, b) => new Date(b.mixingDate) - new Date(a.mixingDate));

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={dataDateSort}
                renderItem={(item) => (
                    <List.Item
                        actions={[<a id={item.id} onClick={deleteItem}><DeleteOutlined/></a>]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.imgUrl} size={"large"}/>}
                                title={<a id={item.id} onClick={openItem}>{item.name + '  #' + item.batchNumber}</a>}
                                description={<div>Mixing date: {item.mixingDate}
                                    <hr/>
                                    <Badge status={item.status.status} text={item.status.label}/></div>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default BarrelPreview;