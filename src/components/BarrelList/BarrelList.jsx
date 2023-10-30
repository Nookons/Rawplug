import React, {useEffect, useState} from 'react';
import MyButton from "../MyButton/MyButton";
import styles from './BarrelList.module.css'
import {useListVals, useObject} from "react-firebase-hooks/database";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";
import Item from "./Item.jsx";
import MyModal from "../MyModal/MyModal";
import {getItem, removeItem} from "../../utils/DataBase";
import {Badge, Input, Select} from "antd";
import ChangeModal from "../ChangeModal";

const BarrelList = ({addTestItem}) => {
    const [data, loading, error] = useListVals(ref(db, 'main/items/Cart'));
    const [items, setItems] = useState(0);
    const [item, setItem] = useState(null);
    const [itemsArray, setItemsArray] = useState([]);

    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (!loading) {
            setItemsArray(data)
        }
    }, [data]);


    async function change(e) {
        try {
            const id = e.target.value;
            const response = await getItem({ id });
            setVisible(true);
            setItem(response);
            console.log(item)
        } catch (error) {
            console.error(error);
        }
    }
    async function remove(e) {
        try {
            const id = e.target.value;
            const response = await removeItem({ id });
            window.reload();
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    const add = () => {
        console.log(items)
        setItems( items + 5)
    }

    let itemsCount = itemsArray.length
    let myDate = new Date().toString();

    return (
        <div className={styles.Main}>
            <h4>Barrel items quantity: {itemsCount}</h4>
            <hr/>
            <ChangeModal
                visible={visible}
                setVisible={setVisible}
                item={item}
            />
            <MyButton click={addTestItem}>Add test material</MyButton>
            {!loading
                ?
                <div>
                    {itemsArray.length
                        ?
                            <Item
                                itemsArray={itemsArray}
                                items={items}
                                myDate={myDate}
                                add={add}
                                change={change}
                                remove={remove}
                            />
                        :
                        <div>
                            <h1>Nothing here...</h1>
                            <MyButton click={addTestItem}>Add test material</MyButton>
                        </div>
                    }
                </div>
                :
                <div>
                    loading...
                </div>
            }
        </div>
    );
};

export default BarrelList;