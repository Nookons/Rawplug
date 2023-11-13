import React from 'react';
import {Timeline} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";

const TodayTimeline = () => {
    return (
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
    );
};

export default TodayTimeline;