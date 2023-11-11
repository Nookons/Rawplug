import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import MyButton from "../../components/MyButton/MyButton";
import {
    Affix,
    Alert,
    Avatar, Calendar, Card, Cascader, ConfigProvider, DatePicker, Descriptions, Divider, Form, Image, Input,
    InputNumber, List, Mentions, message,
    Modal,
    Pagination,
    Popconfirm,
    Progress, QRCode, Rate,
    Result, Row,
    Segmented, Select,
    Skeleton, Slider,
    Spin, Switch,
    Tabs, Timeline, Upload
} from "antd";
import MyModal from "../../components/MyModal/MyModal";
import {
    DownOutlined,
    FileAddOutlined,
    LoadingOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined, ShrinkOutlined
} from "@ant-design/icons";
import BarrelPreview from "../../components/HomePreview/Barrel/BarrelPreview";
import {Link} from "react-router-dom";
import {Departments, options} from "../../utils/Options";
import cascadeStyle from '../../pages/AddItem/AddItem.module.css'
import {useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import {db} from "../../firebase";
import Button from "antd/es/button";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Login from "../../components/Login/Login";
import Col from "antd/es/grid/col";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import {ExampleLoaderComponent} from "../../dev/palette";
import Meta from "antd/es/card/Meta";
import SelectedDepartment from "../SelectedDepartament/SelectedDepartament";
import Sider from "antd/es/layout/Sider";

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

    const onTimeLineClick = (event) => {
        event.preventDefault();
        message.error('It doesn\'t work now.')
    }

    return (
        <div className={styles.Main}>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <Cascader.Panel className={cascadeStyle.Cascader} options={options} onChange={onChangeCascade}/>
            </MyModal>

            <div className={styles.MainTimeLine}>
                <Title level={2}>Today's production</Title>
                <div className={styles.TimeLine}>
                    {data
                        ?
                        <Timeline mode="alternate">
                            {data.map((e, index) => {
                                const currentDate = new Date().toDateString();
                                const itemDate = e.date

                                if (currentDate === itemDate) {
                                    return (
                                        <Timeline.Item key={e.id} label={e.date} itemLayout="horizontal">
                                            <Link onClick={onTimeLineClick} target="_blank">
                                                {e.name}
                                            </Link>
                                        </Timeline.Item>
                                    )
                                }
                            })}
                        </Timeline>
                        :
                        <div>

                        </div>
                    }
                </div>
            </div>
            <div className={styles.MainTimeLine}>
                <Title level={2}>Last production</Title>
                <div className={styles.TimeLine}>
                    {data
                        ?
                        <Timeline mode="alternate">
                            {data.map((e, index) => {
                                const currentDate = new Date().toDateString();
                                const itemDate = e.date

                                const data = []

                                if (currentDate === itemDate) {
                                    data.push(e)
                                }
                                console.log(data)
                                return (
                                    <Timeline.Item key={e.id} label={e.date} itemLayout="vertical">
                                        <Link onClick={onTimeLineClick} target="_blank">
                                            {e.name}
                                        </Link>
                                    </Timeline.Item>
                                )
                            })}
                        </Timeline>
                        :
                        <div>

                        </div>
                    }
                </div>

            </div>

            {/*<div>
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
                {isSearch ? <Button type="primary" onClick={onRemoveSearch}>Remove search</Button> : <div></div>}
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    indicatorSize={(origin) => origin - 16}
                />
            </div>*/}
        </div>
    );
};

export default Home;