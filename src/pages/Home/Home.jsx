import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {
    Alert,
    Avatar, Calendar, Card, Cascader, DatePicker, Form, Input,
    InputNumber, Mentions, message,
    Modal,
    Pagination,
    Popconfirm,
    Progress, Rate,
    Result,
    Segmented, Select,
    Skeleton, Slider,
    Spin, Switch,
    Tabs, Upload
} from "antd";
import MyModal from "../../components/MyModal/MyModal";
import {
    FileAddOutlined,
    LoadingOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined
} from "@ant-design/icons";
import BarrelPreview from "../../components/HomePreview/Barrel/BarrelPreview";
import {Link} from "react-router-dom";
import {options} from "../../utils/Options";
import cascadeStyle from '../../pages/AddItem/AddItem.module.css'
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";
import Button from "antd/es/button";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Login from "../../components/Login/Login";


const Home = () => {
    const [visible, setVisible] = useState(false);
    const [data, loading, error] = useListVals(ref(db, 'main/items/Barrel'));
    const [isSearch, setIsSearch] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [user, setUser] = useState(false);


    const items = [
        {
            key: '1',
            label: 'Barrel',
            children: <BarrelPreview data={isSearch ? searchData : data} loading={loading}/>,
        },
        {
            key: '2',
            label: 'Cart',
            children: 'Cart Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Nozle',
            children: 'Nozle Content of Tab Pane 3',
        },
    ];

    async function addItemModal() {
        setVisible(true)
    }

    const onChangeCascade = (e) => {
        const index = e.length;
        const currentName = e[index - 1].toString().toLowerCase();
        setIsSearch(true)

        if (!loading) {
            const sort = data.filter(element => {
                const elementNameLower = element.name.toLowerCase();
                const matches = elementNameLower === currentName;
                console.log(`Element: ${element.name}, Current Name: ${currentName}, Matches: ${matches}`);
                return matches
            });
            message.info(`Looking for :${currentName.toUpperCase()} `);
            setSearchData(sort)
            setVisible(false)
        }
    }

    const onRemoveSearch = useCallback((event) => {
        message.info(`You see all now)`);
        setIsSearch(false)
    }, []);

    return (
        <div className={styles.Main}>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <Cascader.Panel className={cascadeStyle.Cascader} options={options} onChange={onChangeCascade}/>
            </MyModal>

            {!user ? <Login setUser={setUser}/> :
                <div>
                    <div className={styles.Banner}>
                        <div className={styles.BannerText}>
                            <h1>Warehouse management of materials</h1>
                            <h4 style={{color: 'gray'}}>and material movements</h4>
                        </div>
                        <div className={styles.BannerButton}>
                            <MyButton><Link to="/add-item"><FileAddOutlined/></Link></MyButton>
                            <MyButton click={addItemModal}><SearchOutlined/></MyButton>
                            <MyButton>Download PDF Report</MyButton>
                        </div>
                    </div>
                    {isSearch ? <Button type="primary" onClick={onRemoveSearch}>Remove search</Button> : <div> </div>}
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        indicatorSize={(origin) => origin - 16}
                    />
                </div>
            }
        </div>
    );
};

export default Home;