import React, {useCallback} from 'react';
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../../firebase";
import styles from './BarrelPreview.module.css'
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

const BarrelPreview = () => {
    const [data, loading, error] = useListVals(ref(db, 'main/items/Barrel'));

    data.sort((a, b) => new Date(a.mixingDate) - new Date(b.mixingDate)); // Преобразование строковых дат в объекты Date и сортировка

    // Сортировка по номеру партии (batchNumber)
    /*data.sort((a, b) => {
        // Используем метод localeCompare() для сравнения строк
        return a.batchNumber.localeCompare(b.batchNumber);
    });*/



    console.log(data);

    const openItem = useCallback((event) => {
        let targetElement = event.target;
        let id = targetElement.closest("div").id;

        window.location.href = "/item?_" + id;
        console.log(id);
    }, []);

    return (
        <div>
            {data.length
                ?
                data.reverse().map((item, index) => {
                    return (
                        <div id={item.id} className={styles.item} onClick={openItem}>
                            <h4>Batch number: <br/><span>{item.batchNumber}</span></h4>
                            <h4>Label:  <br/><span>{item.name}</span></h4>
                            <h4>Mixing:  <br/><span>{item.mixingDate}</span></h4>
                        </div>
                    )
                })
                :
                <div>
                    <Skeleton  active='true'/>
                </div>
            }
        </div>
    );
};

export default BarrelPreview;