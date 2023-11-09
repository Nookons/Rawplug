import React, {useCallback, useState} from 'react';
import styles from './BarrelPreview.module.css'
import {
    Avatar,
    Badge,
    List,
    message,
    Skeleton,
} from 'antd';
import {DeleteOutlined, EditOutlined, EllipsisOutlined, MoreOutlined, SettingOutlined} from "@ant-design/icons";
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
        <div className={styles.Main}>
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