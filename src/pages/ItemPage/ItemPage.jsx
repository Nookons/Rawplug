import React, {useCallback, useEffect, useState} from 'react';
import {getItem, removeItem, toAvailable, updateUserData} from "../../utils/DataBase";
import MyButton from "../../components/MyButton/MyButton";
import {Badge, Breadcrumb, Descriptions, Image, message, Modal, Statistic} from "antd";
import styles from "../../components/BarrelList/BarrelList.module.css";
import style from "./ItemPage.module.css"
import {
    ApartmentOutlined,
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Skeleton} from "antd/lib";
import CountUp from "react-countup";
import {useDispatch} from "react-redux";

const ItemPage = () => {
    const dispatch = useDispatch();
    const currentUrl = window.location.href;
    console.log(currentUrl.split('_'))
    const type = currentUrl.split('_')[1];
    const id = currentUrl.split('_')[2];
    const [item, setItem] = useState(null);

    const [changeItem, setChangeItem] = useState(null);
    const [changeModal, setChangeModal] = useState(false);


    useEffect(() => {
        async function getItemId() {
            try {
                const response = await getItem({type, id});
                setItem(response);
            } catch (error) {
                console.error("Error fetching item:", error);
                // Handle error, e.g., show an error message to the user
            }
        }

        getItemId(); // Вызовите функцию getItemId() здесь
    }, [currentUrl]);


    async function deleteItem(e) {
        const element = {
            type: item.type,
            id: item.id
        }
        const response = await removeItem({element})

        if (response === true) {
            dispatch({type: 'REMOVE_BARREL', payload: element.id})
            message.success('Item ' + element.id + ' was removed')
            window.history.back()
        }
    }


    const rootClasses = [styles.badge]

    if (item && item.status) {
        switch (item.status.status) {
            case 'success':
                rootClasses.push(styles.success);
                break;
            case 'processing':
                rootClasses.push(styles.processing);
                break;
            case 'error':
                rootClasses.push(styles.error);
                break;
            default:
                break;
        }
    }

    const formatter = (value) => <CountUp end={value} separator=","/>;

    const onChangeSetting = useCallback((event) => {
        setChangeItem(event)
        setChangeModal(true)
    }, []);

    async function toUsed(item) {
        const data = {
            type: item.type.toLowerCase(),
            id: item.id
        }
        const response = await updateUserData({data})

        if (response) {
            window.location.reload();
        }
    }
    async function goAvailable(item) {
        const data = {
            type: item.type.toLowerCase(),
            id: item.id
        }
        const response = await toAvailable({data})

        if (response) {
            window.location.reload();
        }
    }

    const itemOptions = [
        item && item.status ? {
            key: '8',
            label: 'Status',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting(item)}><Badge
                className={rootClasses.join(' ')} status={item.status.status} text={item.status.label}/> <EditOutlined/>
            </div>,
            span: 3
        } : {key: '1', label: 'Status', children: 'Unknown'},
        item && item.name ? {
            key: '2',
            label: 'Name',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting({item})}>{item.name}
                <EditOutlined/></div>,
            span: 2
        } : {key: '3', label: 'Name', children: 'Unknown'},
        item && item.type ? {
            key: '4',
            label: 'Type',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting(item)}>{item.type}
                <EditOutlined/></div>
        } : {key: '5', label: 'Type', children: 'Unknown'},
        item && item.date ? {key: '6', label: 'Date', children: item.date, span: 2} : {
            key: '7',
            label: 'Date',
            children: 'Unknown'
        },
        item && item.timeStamp ? {key: '8', label: 'Last change', children: item.timeStamp, span: 3} : {
            key: '9',
            label: 'Last change',
            children: 'Unknown'
        },

        item && item.form ? {key: '6', label: 'Form', children: item.form, span: 3} : null,
        item && item.quantity ? {
            key: '6',
            label: 'Quantity',
            children: <Statistic className={style.Quantity} value={item.quantity} precision={2} formatter={formatter}/>,
            span: 3
        } : null,

        item && item.type === 'Barrel' ? {
            key: '10',
            label: 'Mixing Date',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting(item)}>{item.deliveredDate}
                <EditOutlined/></div>
        } : null,
        item && item.type === 'Barrel' ? {
            key: '11',
            label: 'Batch N',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting(item)}>{item.batchNumber}
                <EditOutlined/></div>
        } : null,
        item && item.location ? {
            key: '12',
            label: 'Location',
            children: <div className={style.Settings_Change} onClick={() => onChangeSetting(item)}>{item.location}
                <EditOutlined/></div>
        } : {key: '13', label: 'Location', children: 'Unknown'},
    ].filter(option => option !== null);

    // ...

    return (
        <div className={style.Main}>
            <Modal
                title={changeItem ? changeItem.name : 'Modal'}
                open={changeModal}
                okText="Confirm"
                onOk={() => setChangeModal(false)}
                onCancel={() => setChangeModal(false)}
                cancelText="Cancel">
                <p>Some contents...</p>
            </Modal>
            <Breadcrumb
                style={{padding: 14}}
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined/>,
                    },
                    {
                        href: '/pick-dep',
                        title: (
                            <>
                                <AppstoreOutlined/>
                                <span>Department</span>
                            </>
                        ),
                    },
                    {
                        href: '/pick-dep/warehouse',
                        title: (
                            <>
                                <ApartmentOutlined/>
                                <span>Items List</span>
                            </>
                        ),
                    },
                    {
                        title: item && item.id ? item.id :
                            <Skeleton.Button active='true' size='small' shape='default' block='true'/>,
                    },
                ]}
            />
            {item
                ?
                <div className={style.MainInfoBlock}>
                    <div className={style.ImgBlock}>
                        <div key={item.id}>
                            <Image
                                width={"100%"}
                                src={item.imgUrl}
                            />
                        </div>
                    </div>
                    <div className={style.InfoBlock}>
                        <Descriptions className={styles.itemOnPage} title='' bordered items={itemOptions}/>
                        <div>
                            {item.status.label === "Available"
                                ?
                                <MyButton click={() => toUsed(item)}>Change to used</MyButton>
                                :
                                <MyButton click={() => goAvailable(item)}>Change to Available</MyButton>
                            }
                            <MyButton click={() => deleteItem(item.id)}><DeleteOutlined/></MyButton>
                        </div>
                    </div>
                </div>
                :
                <div style={{padding: 14}}>
                    <Skeleton/>
                </div>
            }
        </div>
    );
};

export default ItemPage;