import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Card, Form, Image, List, message, Pagination, Select, Statistic, Switch, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";
import {fetchBarrel} from "../../../stores/asyncActions/barrel";
import {ArrowUpOutlined, CloseCircleOutlined, DeleteOutlined, LikeOutlined} from "@ant-design/icons";
import {removeItem, writeUserData} from "../../../utils/DataBase";
import styles from '../WareHouse.module.css'
import Radio from "antd/es/radio";
import axios from "axios";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Col from "antd/es/grid/col";

const BarrelWarehouse = ({array}) => {
    const navigate = useNavigate();

    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function get () {
            const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=c4c50394987b6e3577ec67e2240fed79&limit=10&page=' + page)
            console.log(response.data)
            setFilms(response.data)
        }
        get()
    }, [page]);

    const [sortArray, setSortArray] = useState([]);
    const [selectType, setSelectType] = useState();
    const [isSort, setIsSort] = useState(false);

    // Используем Set для хранения уникальных id
    const uniqueIds = new Set();

    const uniqueBarrel = array.filter(item => {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
        }
        return false;
    });
    // Assuming 'date' is a property in each item of the array

    const sortedBarrel = [...uniqueBarrel].sort((a, b) => {
        const A = a.batchNumber;
        const B = b.batchNumber;

        // Compare the dates for sorting
        return A - B;
    });

// Now 'sortedBarrel' contains the sorted array based on the 'date' property

    const reloadPage = () => {
        navigate(window.location.pathname, {replace: true});
        window.location.reload();
    };

    const remove = async ({record}) => {
        console.log(record)
        const element = {
            type: record.type,
            id: record.id
        }

        console.log(element)
        const response = removeItem({element});
        response.then(status => {
                if (status === true) {
                    message.success("Item " + record.id + " deleted")
                    setTimeout(() => {
                        reloadPage();
                    }, 500)
                }
            }
        )
    }


    function sortArr(event) {
        setSelectType (event)

        switch (event) {
            case true:
                const processingItems = isSort ? sortArray.filter(e => e.status.status === 'processing') : sortedBarrel.filter(e => e.status.status === 'processing');
                setSortArray(processingItems);
                setIsSort(true);
                break;
            case false:
                setIsSort(false);
                break;
            case 'Noz':
                const nozzleItems = sortedBarrel.filter(e => e.type === 'Noz');
                setSortArray(nozzleItems);
                setIsSort(true);
                break;
            case 'Barrel':
                const barrelItems = sortedBarrel.filter(e => e.type === 'Barrel');
                setSortArray(barrelItems);
                setIsSort(true);
                break;
            case 'Cartridge':
                const cartridgeItems = sortedBarrel.filter(e => e.type === 'Cartridge');
                setSortArray(cartridgeItems);
                setIsSort(true);
                break;
            default:
                setSortArray(sortedBarrel);
                setIsSort(false);
        }
    }

    function changePage(event) {
        setPage(event)
    }

    return (
        <div style={{
            padding: 14,
            minHeight: 'calc(100dvh - 156px)'
        }}>
            <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                <Button onClick={() => navigate('/add-item')} type="primary">Add item</Button>
            </div>
            <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                <Form.Item label="Only available" name="Only available" valuePropName="checked">
                    <Switch onChange={sortArr}/>
                </Form.Item>
                <Form.Item label="Select type">
                    <Select style={{ width: 150 }} value={selectType} onChange={sortArr}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="Noz">Nozzle</Select.Option>
                        <Select.Option value="Barrel">Barrel</Select.Option>
                        <Select.Option value="Cartridge">Cartridge</Select.Option>
                    </Select>
                </Form.Item>
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
                        responsive: ["md"],
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                        style: {whiteSpace: 'nowrap'},
                        render: (name, record) => (
                            <a onClick={() => navigate(`/item?_${record.type.toLowerCase()}_${record.id}`)}>
                                {name}
                            </a>
                        ),
                    },
                    {
                        title: "Batch",
                        dataIndex: "batchNumber",
                        key: "batchNumber",
                        style: {whiteSpace: 'nowrap'},
                        render: (batchNumber, record) => (
                            <p onClick={() => navigate(`/item?_${record.type.toLowerCase()}_${record.id}`)}>
                                {batchNumber}
                            </p>
                        ),
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        responsive: ["md"],
                        render: (type, record) => (
                            <p>
                                {type}
                            </p>
                        ),
                    },
                    {
                        title: "Status",
                        dataIndex: "status", // Change dataIndex to "status"
                        key: "status.label",
                        render: (status) => status ? <Badge className={status.status === 'processing'? styles.Td : null} status={status.status} text={status.label}/> : 'Unknown', // Access status.label here
                    },
                    {
                        title: "Location",
                        dataIndex: "location",
                        key: "location",
                        responsive: ["lg"],
                        render: (location, record) => (
                            <p>
                                {location}
                            </p>
                        ),
                    },
                    {
                        title: "Remove Item",
                        dataIndex: "id",
                        key: "id",
                        responsive: ["lg"],
                        render: (id, record) => (
                            <a onClick={() => remove({record})}>
                                <DeleteOutlined className={styles.Svg} />
                            </a>
                        ),
                    },
                ]}
                dataSource={isSort ? sortArray.reverse() : sortedBarrel.reverse()}
                rowKey="id"
            >
            </Table>
        </div>
    );
};

export default BarrelWarehouse;