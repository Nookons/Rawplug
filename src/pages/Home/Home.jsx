import React, {useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {Cascader, DatePicker, Input} from "antd";
import MyModal from "../../components/MyModal/MyModal";
import {options} from "../../utils/Options";
import {writeMyUserData, writeUserData} from "../../utils/DataBase";
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


const Home = () => {

    const [data, setData] = useState(['test', 'test']);

    const [snapshots, loading, error] = useListVals(ref(db, 'items/'));
    const [test, loadingTest, errorTest] = useListVals(ref(db, 'Notes/'));


    const [addVisible, setAddVisible] = useState(false);
    const [addMyVisible, setAddMyVisible] = useState(false);

    const [Mydate, setMydate] = useState();
    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [input3, setInput3] = useState(null);

    const [item, setItem] = useState();
    const [date, setDate] = useState();
    const [batchNumber, setBatchNumber] = useState();


    const tasks = [
        {
            id: 1,
            label: 'Add new material',
            img: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80'
        },
    ]

    function setVisible () {
        setAddVisible(true)
    }

    const onChange = (value) => {
        setItem(value)
    };

    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    };
    const onChangeMyDate = (date, dateString) => {
        setMydate(dateString)
    };
    const inputBarr = (e) => {
        setBatchNumber(e.target.value)
    };

    const AddUserData = async () => {
        const data = {
            date: date,
            item: item,
            batchNumber: batchNumber
        }

        const response = writeUserData({data})
    }

    const MyAddUserData = async () => {
        const data = [
            Mydate,
            input1,
            input2,
            input3,
        ]

        const response = writeMyUserData({data})
        setInput1('')
        setInput2('')
        setInput3('')
        setAddMyVisible(false)
    }

    return (
        <div className={styles.Main}>
            {/*<MyFloatButton />*/}

            <MyModal
                visible={addVisible}
                setVisible={setAddVisible}
            >
                <article>Select material :</article>
                <Cascader style={{width: '100%'}} options={options} onChange={onChange} placeholder="Please select" />
                <article>Select Date :</article>
                <DatePicker style={{width: '100%'}} onChange={onChangeDate} />
                <article>Only if need:</article>
                <Input onChange={inputBarr} addonBefore="Batch №" suffix={date} defaultValue="" />
                <MyButton click={AddUserData}>Add material</MyButton>
            </MyModal>

            <MyModal
                visible={addMyVisible}
                setVisible={setAddMyVisible}
            >
                <DatePicker style={{width: '100%'}} onChange={onChangeMyDate} />
                <Input value={input1} onChange={e => setInput1(e.target.value)} addonBefore="My №" suffix={Mydate} defaultValue="" />
                <Input value={input2} onChange={e => setInput2(e.target.value)} addonBefore="My №" suffix={Mydate} defaultValue="" />
                <Input value={input3} onChange={e => setInput3(e.target.value)} addonBefore="My №" suffix={Mydate} defaultValue="" />
                <MyButton click={MyAddUserData}>Add material</MyButton>
            </MyModal>



            {tasks.map((task) => (
                <MyButton click={setVisible} type="default" key={task.id}>
                    {task.label} <br/>
                </MyButton>

            ))}
            <MyButton click={setAddMyVisible} type="default">
                 My
            </MyButton>

            <div style={{ padding: 14, marginTop:24}}>
                <h1>Items</h1>
                {snapshots.map(e => {

                    return (
                        <div style={{backgroundColor: 'white', boxShadow: '0 0 14px rgb(0,0,0, .35)', borderRadius: 14, marginTop:14, padding: 14, display: 'flex', gap: 4, flexDirection: 'column'}}>
                            <h4 style={{color: 'gray', fontSize: 14}}># : <span>{e.id}</span></h4>
                            {e.item.map(e => {
                                if (e === 'Barrel') {
                                    return <img style={{maxWidth: '100%'}} src="https://tara-snab.ru/wp-content/uploads/2019/08/bo4ka-metall.png" alt=""/>
                                }
                                else if (e === 'R-KEM II') {
                                    return <img style={{maxWidth: '100%'}} src="https://assets.rawlplug.com/05d18cff-ef80-44ed-8b2b-acda68226ce1/L/R-KEM-II-380_pret_gwintowany_product_photo_1_WebResFull.png" alt=""/>
                                }
                            })}
                            <div style={{display: 'flex', gap: 4, alignItems: 'center'}}>
                                <h4>Label -</h4>
                                {e.item.map(e => {
                                    return (
                                        <h4>/ {e}</h4>
                                    )
                                })}
                            </div>
                            <h4>Date : <span>{e.date}</span></h4>
                            <h4>Batch #: <span>{e.batchNumber}</span></h4>
                            <h4>Location : <span>{e.location}</span></h4>
                            <div style={{display: 'flex', flexDirection: 'column' }}>
                                <MyButton><EditOutlined /></MyButton>
                                <MyButton><DeleteOutlined /></MyButton>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{backgroundColor: 'white', padding: 14, marginTop:24}}>
                <h1>My Notes</h1>
                {test.map(e => {
                    return (
                        <div style={{border: '1px solid black', marginTop:14, padding: 4}}>
                            {e.values.map(e => {
                                return (
                                    <h4>{e}</h4>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;