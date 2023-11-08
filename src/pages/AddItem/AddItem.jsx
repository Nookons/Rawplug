import React, {useState} from 'react';
import {Button, Cascader, DatePicker, Input, message, Popover, Select, Steps, theme} from 'antd';
import {location, options} from "../../utils/Options";
import styles from './AddItem.module.css'
import {InfoCircleOutlined} from "@ant-design/icons";
import {writeUserData} from "../../utils/DataBase";

const AddItem = () => {
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [type, setType] = useState(null);
    const [batchNumber, setBatchNumber] = useState(null);
    const [mixingDate, setMixingDate] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [status, setStatus] = useState(null);

    const onChangeCascade = (e) => {
        setCurrent(current + 1);
        setType(e)
    }
    const onChangeLocation = (e) => {
        setCurrent(current + 1);
        setCurrentLocation(e)
    }
    const onChangeStatus = (e) => {
        setStatus(e)
    }
    const onChangeDate = (date, dateString) => {
        setMixingDate(dateString)
        setCurrent(current + 1);
    };

    const content = (
        <div>
            <article>Used - <span>This status when item used</span></article>
            <hr/>
            <article>Available - <span>This status means that the item is prepared for the task</span></article>
            <hr/>
            <article>Hold - <span>Indicates that it is temporarily frozen or held for use.</span></article>
        </div>
    );

    const steps = [
        {
            title: 'Select Type',
            content: <Cascader.Panel className={styles.Cascader} options={options} onChange={onChangeCascade}/>,
        },
        {
            title: 'Select location',
            content: <Cascader.Panel className={styles.Cascader} options={location} onChange={onChangeLocation}/>,
        },
        {
            title: 'Select mixing date',
            content: <DatePicker autoFocus={false} style={{width: '100%', margin: '14px 0'}}
                                 onChange={onChangeDate}/>,
        },
        {
            title: 'Write batch N',
            content: <Input
                style={{marginTop: 14}}
                focus={'all'}
                addonBefore="Batch N"
                addonAfter="Last: 19342"
                defaultValue="19343"
                value={batchNumber}
                onChange={e => setBatchNumber(e.target.value)}
            />,
        },
        {
            title: 'Select status',
            content:
                <div>
                    <article style={{display: 'flex', gap: 8, alignItems: 'center'}}>Status
                        <Popover content={content} title="Status info" trigger="click">
                            <InfoCircleOutlined/>
                        </Popover>
                    </article>
                    <br/>
                    <Select
                        style={{width: '100%'}}
                        allowClear
                        onChange={onChangeStatus}
                        options={[
                            {value: 'success', label: 'Used'},
                            {value: 'processing', label: 'Available'},
                            {value: 'error', label: 'Hold'},
                        ]}
                    />
                </div>
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "success":
                return 'Used';
            case "processing":
                return 'Available';
            case "error":
                return 'Hold';
            default:
                return 'Unknown';
        }
    };

    const handleAddItem = async () => {
        const itemData = {
            name: type[2] ? type[2] : 'Unknown',
            type: type[0] ? type[0] : 'Unknown',
            mixingDate: mixingDate || 'Unknown',
            batchNumber: batchNumber || 'Unknown',
            location: currentLocation ? currentLocation.join('-') : 'Unknown',
            status: {
                status: status || 'Unknown',
                label: getStatusLabel(status),
            }
        };
        console.log(itemData)
        const response = await writeUserData({data: itemData});
        if (response) {
            message.success('Item was added!')
            setCurrent(0)
            window.history.back();
        } else {
            message.error('Something wrong!')
        }
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));
    return (
        <div className={styles.Main}>
            <br/>
            <Steps current={current} items={items}/>
            <br/>
            <div>{steps[current].content}</div>
            <div style={{marginTop: 24}}>
                {current === 3 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={handleAddItem}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddItem;