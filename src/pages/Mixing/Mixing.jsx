import React, {useState} from 'react';
import styles from './Mixing.module.css'
import Button from "antd/es/button";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {Timeline} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

const Mixing = () => {
    const [now, setNow] = useState();

    setTimeout(() => {
        const currentDate = dayjs().toString()
        setNow(currentDate)
    }, 1000)



    return (
        <div className={styles.Main}>

            <Title level={5}>Date:
                <Text type="secondary"> {now}</Text>
            </Title>
            <div className={styles.Parent}>
                <div className={styles.TodaysView + ' ' + styles.AllChild}>
                    <Title level={2}>Today tasks</Title>
                    <div>
                        <Timeline mode="alternate" style={{padding: 0}}>
                            <Timeline.Item>Add PSF-FR</Timeline.Item>
                            <Timeline.Item
                                dot={<ClockCircleOutlined style={{fontSize: "16px"}}/>}
                                color="red"
                            >
                                The mixing PSF-HSH has started
                                <Text type="secondary"> 09:24</Text>
                            </Timeline.Item>
                            <Timeline.Item
                                dot={<ClockCircleOutlined style={{fontSize: "16px"}}/>}
                                color="red"
                            >
                                The mixing PSF-HSH has started
                                <Text type="secondary"> 09:37</Text>
                            </Timeline.Item>
                            <Timeline.Item
                                dot={<CheckCircleOutlined style={{fontSize: "16px"}}/>}
                                color="green"
                            >
                                The mixing PSF-HSH finished
                                <Text type="secondary"> 12:05</Text>
                            </Timeline.Item>
                            <Timeline.Item
                                dot={<LoadingOutlined style={{fontSize: "16px"}}/>}
                                color="green"
                            >
                                Waiting for PSF-HSH will be finish
                                <Text type="secondary"> 12:05</Text>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
                <div className={styles.MixingView + ' ' + styles.AllChild}>
                    <Title level={4}>Add mixing</Title>
                    <Text type="secondary">Field for adding or deleting completed mixing</Text>
                    <div>
                        <Button type="primary">Add mixing</Button>
                        <Button>Remove mixing</Button>
                    </div>
                </div>
                <div className={styles.RecipesView + ' ' + styles.AllChild}>
                    <Title level={4}>Ready recipes</Title>
                    <Text type="secondary">Field for viewing ready-to-use recipes for mixing</Text>
                    <div>
                        <Button type="link">PSF-FR</Button>
                        <Button type="link">PSF-FR LATO</Button>
                        <Button type="link">PSF-FR ZIMA</Button>
                        <Button type="link">PSF-STONE</Button>
                        <Button type="link">PSF-HSH</Button>
                        <Button type="link">HYBRYDA</Button>
                        <Button type="link">HYBRYDA-LATO</Button>
                        <Button type="link">HYBRYDA-ZIMA</Button>
                        <Button type="link">EPOXID-A</Button>
                        <Button type="link">EPOXID-B</Button>
                    </div>
                </div>
                <div className={styles.ExtractView + ' ' + styles.AllChild}>
                    <Title level={4}>Today tasks</Title>
                    <Timeline style={{padding: 14}}>
                        <Timeline.Item>Odzysk</Timeline.Item>
                        <Timeline.Item
                            dot={<CheckCircleOutlined style={{fontSize: "16px"}}/>}
                            color="green"
                        >
                            Completed PSF-FR
                            <Text type="secondary"> 12:05</Text>
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
        </div>
    );
};

export default Mixing;