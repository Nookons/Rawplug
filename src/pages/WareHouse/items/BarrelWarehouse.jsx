import React, {useState} from 'react';
import {
    Avatar,
    Badge,
    Form,
    message,
    Select, Skeleton,
    Switch,
    Table
} from "antd";
import {useNavigate} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import {removeItem} from "../../../utils/DataBase";
import styles from '../WareHouse.module.css'
import {useDispatch, useSelector} from "react-redux";

const BarrelWarehouse = ({array}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector((state) => state.user.status);

    const [sortArray, setSortArray] = useState([]);
    const [selectType, setSelectType] = useState();
    const [isSort, setIsSort] = useState(false);

    const sortedBarrel = [...array.noz, ...array.cartridge, ...array.barrel].sort((a, b) => {
        const dateA = new Date(a.deliveredDate);
        const dateB = new Date(b.deliveredDate);

        // Compare the dates for sorting
        return dateA - dateB;
    });


    const remove = async ({record}) => {
        if (status) {
            const element = {
                type: record.type,
                id: record.id
            }

            console.log(element.type)

            switch (element.type.toLowerCase()) {
                case "barrel":
                    console.log(element.type)
                    dispatch({type: "REMOVE_BARREL", payload: element})
                    break
                case "noz":
                    console.log(element.type)
                    dispatch({type: "REMOVE_NOZ", payload: element})
                    break
                case "cartridge":
                    console.log(element.type)
                    dispatch({type: "REMOVE_CARTRIDGE", payload: element})
                    break
            }

            const response = removeItem({element});
            response.then(status => {
                    message.success("Item " + record.id + " deleted")
                }
            )
        } else {
            message.error('Not available to unauthorized users')
        }
    }


    function sortArr(event) {
        setSelectType(event)

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

    return (
        <div style={{
            minHeight: 'calc(100dvh - 156px)'
        }}>
            <article>Filters:</article>
            <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                <Form.Item label="Only available" name="Only available" valuePropName="checked">
                    <Switch onChange={sortArr}/>
                </Form.Item>
                <Form.Item label="Select type">
                    <Select style={{width: 150}} value={selectType} onChange={sortArr}>
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
                        render: (status) => status ?
                            <Badge status={status.status} text={status.label}/> : 'Unknown', // Access status.label here
                    },
                    {
                        title: "Date",
                        dataIndex: "deliveredDate",
                        key: "deliveredDate",
                        responsive: ["lg"],
                        render: (deliveredDate, record) => (
                            <p>
                                {deliveredDate}
                            </p>
                        ),
                    },
                    {
                        title: "Add Date",
                        dataIndex: "date",
                        key: "date",
                        responsive: ["lg"],
                        render: (date, record) => (
                            <p>
                                {date}
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
                                <DeleteOutlined className={styles.Svg}/>
                            </a>
                        ),
                    },
                ]}
                locale={{
                    emptyText: <div style={{display: 'flex', gap: 14, flexDirection: 'column'}}>
                        <Skeleton active/>
                    </div>,
                }}
                dataSource={isSort ? sortArray.reverse() : sortedBarrel.reverse()}
                rowKey="id"
            >
            </Table>
        </div>
    );
};

export default BarrelWarehouse;