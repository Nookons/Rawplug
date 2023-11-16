import React, {useEffect} from 'react';
import {Avatar, message, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";
import {fetchBarrel} from "../../../stores/asyncActions/barrel";
import {DeleteOutlined} from "@ant-design/icons";
import {removeItem, writeUserData} from "../../../utils/DataBase";

const BarrelWarehouse = ({array}) => {
    const navigate = useNavigate();

    // Используем Set для хранения уникальных id
    const uniqueIds = new Set();
    const uniqueBarrel = array.filter(item => {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
        }
        return false;
    });


    const reloadPage = () => {
        // Используйте navigate для обновления URL
        navigate(window.location.pathname, {replace: true});

        // Перезагрузите страницу
        window.location.reload();
    };

    const remove = async (id) => {
        const element = {
            type: 'barrel',
            id: id
        }

        console.log(element)
        const response = removeItem({element});
        response.then(status => {
                if (status === true) {
                    message.success("Item " + id + " deleted")
                    setTimeout(() => {
                        reloadPage();
                    }, 500)
                }
            }
        )
    }

    const add = async () => {
        const data = {}
        const response = writeUserData({data});
    }

    return (
        <div style={{
            padding: 14,
            minHeight: 'calc(100dvh - 156px)'
        }}>
            <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                <Button onClick={() => navigate('/add-item')} type="primary">Add item</Button>
                <Button onClick={() => add()} type="primary">Add test item</Button>
            </div>
            <Table
                columns={[
                    {
                        title: "Image",
                        dataIndex: "imgUrl",
                        key: "imgUrl",
                        render: (imgUrl) =>
                            <Avatar src={imgUrl} size={{xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40}}>
                                User
                            </Avatar>,
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                        render: (name, record) => (
                            <a onClick={() => navigate(`/item?_${record.type.toLowerCase()}_${record.id}`)}>
                                {name}
                            </a>
                        ),
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        responsive: ["md"],
                    },
                    {
                        title: "Location",
                        dataIndex: "location",
                        key: "location",
                        responsive: ["lg"],
                    },
                    {
                        title: "Remove Item",
                        dataIndex: "id",
                        key: "id",
                        responsive: ["lg"],
                        render: (id) =>
                            <a onClick={() => remove(id)}>
                                <DeleteOutlined style={{fontSize: 20, float: "right"}}/>
                            </a>,
                    },
                ]}
                dataSource={uniqueBarrel.reverse()}
                rowKey="id"
            >
            </Table>
        </div>
    );
};

export default BarrelWarehouse;