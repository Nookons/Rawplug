import React, {useEffect, useState} from 'react';
import {getItem, removeItem, updateUserData} from "../../utils/DataBase";
import MyButton from "../../components/MyButton/MyButton";
import {Badge, Breadcrumb, Descriptions} from "antd";
import styles from "../../components/BarrelList/BarrelList.module.css";
import {ApartmentOutlined, DeleteOutlined, EditOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Skeleton} from "antd/lib";

const ItemPage = () => {
    const currentUrl = window.location.href;
    const id = currentUrl.split('_')[1];
    const [item, setItem] = useState(null);

    useEffect(() => {
        async function getItemId() {
            try {
                const response = await getItem({ id });
                setItem(response);
            } catch (error) {
                console.error("Error fetching item:", error);
                // Handle error, e.g., show an error message to the user
            }
        }

        getItemId(); // Вызовите функцию getItemId() здесь
    }, [currentUrl]);


    async function deleteItem(e) {
        const response = await removeItem({id})
        console.log(response)
        alert('Item deleted')
        window.history.back();
    }

    function changeItem(e) {
        const id = e.target.value
        const response = updateUserData({id})
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

    const itemOptions = [
        item && item.status ? { key: '8', label: 'Status', children: <Badge className={rootClasses.join(' ')} status={item.status.status} text={item.status.label}/>, span: 3}: { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.name ? { key: '2', label: 'Name', children: item.name } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.type ? { key: '3', label: 'Type', children: item.type } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.date ? { key: '3', label: 'Date', children: item.date } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.changeDate ? { key: '5', label: 'Last change', children: item.changeDate, span: 2 } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.mixingDate ? { key: '6', label: 'Mixing Date', children: item.mixingDate } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.batchNumber ? { key: '7', label: 'Batch N', children: item.batchNumber } : { key: '7', label: 'Batch N', children: 'Unknown' },
        item && item.location ? { key: '7', label: 'Location', children: item.location } : { key: '7', label: 'Batch N', children: 'Unknown' },
    ].filter(option => option !== null); // Удаляем нулевые значения из массива

    // ...

    return (
        <div>
            <Breadcrumb
                style={{padding: 14}}
                items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/',
                        title: (
                            <>
                                <ApartmentOutlined />
                                <span>Items List</span>
                            </>
                        ),
                    },
                    {
                        title: item && item.id ? item.id : <Skeleton.Button active='true' size='small' shape='default' block='true' />,
                    },
                ]}
            />
            {item
                ?
                <div style={{display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
                    <div key={item.id}>
                        <picture style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <source style={{maxWidth: '100%'}} srcSet={item.imgUrl} media="(min-width: 800px)" />
                            <img style={{maxWidth: '100%'}} src={item.imgUrl} alt="Description of the image" />
                        </picture>
                    </div>
                    <Descriptions className={styles.itemOnPage} title='' bordered items={itemOptions}/>
                    <div style={{
                        display: 'flex',
                        padding: 14,
                        margin: 24,
                        backgroundColor: '#efefef',
                        overflow: 'hidden',
                        gap: 14,
                        borderRadius: 8
                    }}>
                        <MyButton ><EditOutlined /></MyButton>
                        <MyButton click={deleteItem}><DeleteOutlined /></MyButton>
                    </div>
                </div>
                :
                <div style={{padding: 14}}>
                    <Skeleton />
                </div>
            }
        </div>
    );
};

export default ItemPage;