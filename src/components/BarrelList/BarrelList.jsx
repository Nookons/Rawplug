import React, {useEffect, useState} from 'react';
import MyButton from "../MyButton/MyButton";
import styles from './BarrelList.module.css'
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";
import {Badge, Descriptions} from "antd";

const BarrelList = ({addTestItem}) => {
    const [data, loading, error] = useListVals(ref(db, 'main/items/Barrel'));

    const [itemsArray, setItemsArray] = useState([
        /*{id: 1, label: 'PSF-FR', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19342', kg: 1203},
        {id: 2, label: 'PSF-STONE', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19343', kg: 1203},
        {id: 3, label: 'HYBRIDA', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19344', kg: 1203},
        {id: 4, label: 'HYBRIDA LATO', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19345', kg: 1203},
        {id: 5, label: 'PSF-HSH', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19346', kg: 1203},
        {id: 6, label: 'PSF-ZIMA', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19347', kg: 1203},
        {id: 7, label: 'EPOXIDE-A', dateAdd: '22-10-2023', type: 'barrel', batchNumber: '19348', kg: 1203},
        {id: 8, label: 'EPOXIDE-B', dateAdd: '23-10-2023', type: 'barrel', batchNumber: '19349', kg: 1203},*/
    ]);

    useEffect(() => {
        if (!loading) {
            setItemsArray(data)
            console.log(itemsArray)
        }
    }, [data]);

    let itemsCount = itemsArray.length


    return (
        <div>
            <h4>Barrel items quantity: {itemsCount}</h4>
            {!loading
                ?
                <div>
                    {itemsArray
                        ?
                        <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                            {
                                itemsArray.map((element, index) => {
                                    console.log(element)
                                    const item = [
                                        {
                                            key: '1',
                                            label: 'Add date',
                                            children: element.date
                                        },
                                        {
                                            key: '2',
                                            label: 'Name',
                                            children: element.name,
                                            span: 2,
                                        },
                                        {
                                            key: '3',
                                            label: 'Type',
                                            children: element.type,
                                        },
                                        {
                                            key: '4',
                                            label: 'Last change',
                                            children: '2018-04-24 18:00:00',
                                        },
                                        {
                                            key: '5',
                                            label: 'Mixing date',
                                            children: element.mixingDate,
                                        },
                                        {
                                            key: '6',
                                            label: 'Status',
                                            children: <Badge status="processing" text="Available" />,
                                            span: 3,
                                        },
                                        {
                                            key: '7',
                                            label: 'Batch N',
                                            children: '19345',
                                        },
                                        {
                                            key: '8',
                                            label: 'Weight',
                                            children: '1134 kg',
                                        },
                                        {
                                            key: '9',
                                            label: 'Barrel',
                                            children: (
                                                <>
                                                    Not info
                                                    <br />
                                                    323 kg
                                                    <br />
                                                    313 kg
                                                    <br />
                                                    343 kg
                                                </>
                                            ),
                                        },
                                    ];
                                    return (
                                        <div style={{marginTop: 14, padding: 14, backgroundColor: '#fffafa', borderRadius: 4}}>
                                            <Descriptions  title='' bordered items={item} />
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 4, marginTop: 14}}>
                                                <MyButton>Used</MyButton>
                                                <MyButton>Change</MyButton>
                                                <MyButton>Remove</MyButton>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <MyButton click={addTestItem}>Add test material</MyButton>
                        </div>
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