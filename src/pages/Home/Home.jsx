import React, {useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {Cascader, DatePicker, Input} from "antd";
import Search from "antd/es/input/Search";
import MyFloatButton from "../../components/MyFloatButton/MyFloatButton";
import MyModal from "../../components/MyModal/MyModal";
import {options} from "../../utils/Options";
import {writeUserData} from "../../utils/DataBase";


const Home = () => {

    const [data, setData] = useState(['test', 'test']);

    const [addVisible, setAddVisible] = useState(false);
    const [addMyVisible, setAddMyVisible] = useState(false);

    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [input3, setInput3] = useState(null);

    const [item, setItem] = useState();
    const [date, setDate] = useState();


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
    const inputBarr = (e) => {
        console.log(e.target.value)
    };

    const MyAddUserData = async () => {
        const data = [
            input1,
            input2,
            input3,
        ]

        const response = await writeUserData({data})
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
                <MyButton >Add material</MyButton>
            </MyModal>

            <MyModal
                visible={addMyVisible}
                setVisible={setAddMyVisible}
            >
                <Input value={input1} onChange={e => setInput1(e.target.value)} addonBefore="My №" suffix={date} defaultValue="" />
                <Input value={input2} onChange={e => setInput2(e.target.value)} addonBefore="My №" suffix={date} defaultValue="" />
                <Input value={input3} onChange={e => setInput3(e.target.value)} addonBefore="My №" suffix={date} defaultValue="" />
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
        </div>
    );
};

export default Home;