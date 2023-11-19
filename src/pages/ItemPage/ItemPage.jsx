import React, {useEffect, useState} from 'react';
import {getItem, removeItem, updateUserData} from "../../utils/DataBase";
import MyButton from "../../components/MyButton/MyButton";
import {Badge, Breadcrumb, Descriptions, Image, Statistic} from "antd";
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

const ItemPage = () => {
    const currentUrl = window.location.href;
    console.log(currentUrl.split('_'))
    const type = currentUrl.split('_')[1];
    const id = currentUrl.split('_')[2];
    const [item, setItem] = useState(null);

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

    const formatter = (value) => <CountUp end={value} separator="," />;

    const itemOptions = [
        item && item.status ? {
            key: '8',
            label: 'Status',
            children: <Badge className={rootClasses.join(' ')} status={item.status.status} text={item.status.label}/>,
            span: 3
        } : { key: '1', label: 'Status', children: 'Unknown' },
        item && item.name ? { key: '2', label: 'Name', children: item.name, span: 2 } : { key: '3', label: 'Name', children: 'Unknown' },
        item && item.type ? { key: '4', label: 'Type', children: item.type } : { key: '5', label: 'Type', children: 'Unknown' },
        item && item.date ? { key: '6', label: 'Date', children: item.date, span: 2} : { key: '7', label: 'Date', children: 'Unknown' },
        item && item.timeStamp ? { key: '8', label: 'Last change', children: item.timeStamp, span: 3 } : { key: '9', label: 'Last change', children: 'Unknown' },

        item && item.form ? { key: '6', label: 'Form', children: item.form, span: 3 } : null,
        item && item.quantity ? { key: '6', label: 'Quantity', children: <Statistic className={style.Quantity} value={item.quantity} precision={2} formatter={formatter} />, span: 3 } : null,

        item && item.type === 'Barrel' ? { key: '10', label: 'Mixing Date', children: item.deliveredDate } : null,
        item && item.type === 'Barrel' ? { key: '11', label: 'Batch N', children: item.batchNumber } : null,
        item && item.location ? { key: '12', label: 'Location', children: item.location } : { key: '13', label: 'Location', children: 'Unknown' },
    ].filter(option => option !== null);

    // ...

    return (
        <div className={style.Main}>
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
                                <AppstoreOutlined />
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
                        <div>
                            <Image.PreviewGroup>
                                {item
                                    ?
                                    <div>
                                        {item.additionalImg.map((e, index) => {
                                            return (
                                                <Image
                                                    width={100}
                                                    src={e.imgUrl}
                                                />
                                            )
                                        })}
                                    </div>
                                    : null
                                }
                            </Image.PreviewGroup>
                        </div>
                    </div>
                    <div className={style.InfoBlock}>
                        <Descriptions className={styles.itemOnPage} title='' bordered items={itemOptions}/>
                        <div>
                            <MyButton><EditOutlined/></MyButton>
                            <MyButton click={deleteItem}><DeleteOutlined/></MyButton>
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