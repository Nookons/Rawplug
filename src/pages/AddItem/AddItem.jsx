import React, {useEffect, useState} from 'react';
import {Button, Cascader, DatePicker, Input, InputNumber, message, Popover, Select, Steps, theme} from 'antd';
import {location, options} from "../../utils/Options";
import styles from './AddItem.module.css'
import {InfoCircleOutlined, SettingOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import Info from "./Info";
import {prev, next} from "./AnyFunction";
import {handleAddItem} from "./HandleAddItem";
import {getLastButchNumber} from "./GetLastBatchNumber";
import {fetchBarrel} from "../../stores/asyncActions/barrel";

const AddItem = () => {
    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();
    const barrel = useSelector(state => state.items.barrel) //Get barrel store

    const [isBarrel, setIsBarrel]                   = useState(false);  // check barrel type to steps
    const [isFocus, setIsFocus]                     = useState(false);  // check isFocus on input to BatchNumber


    // Variable for send to database
    const [name, setName]                           = useState(null);
    const [type, setType]                           = useState(null);
    const [deliveredDate, setDeliveredDate]         = useState(null);
    const [currentLocation, setCurrentLocation]     = useState(null);
    const [status, setStatus]                       = useState(null);
    // only for barrel
    const [batchNumber, setBatchNumber]             = useState(null);
    const [lastNumber, setLastNumber]               = useState(null);

    const item = {
        name: name,
        type: type,
        batchNumber: batchNumber,
        deliveredDate: deliveredDate,
        currentLocation: currentLocation,
        status: status
    }

    // Get barrel from database and write this data to store
    useEffect(() => {
        dispatch(fetchBarrel())
    }, []);

    useEffect(() => {
        const get = async () => {
            const response = await getLastButchNumber({barrel, setLastNumber})  // Get last batchNumber from barrel data
            if(response) {
                setLastNumber(response)
            }
        }
        get();
    }, [barrel]);


    const onChangeCascade = (event) => {
        const lastIndex = event.length - 1; // looking for last items at array

        switch (event[0]){
            case 'Barrel':
                setIsBarrel(true)
                break;
            default:
                setIsBarrel(false)
        }

        setType(event[0])
        setName(event[lastIndex])

        setCurrent(current + 1); // coming to next steps
    }

    const onChangeLocation = (e) => {
        setCurrent(current + 1);
        setCurrentLocation(e)
    }
    const onChangeStatus = (e) => {
        setStatus(e)
    }
    const onChangeDate = (date, dateString) => {
        setDeliveredDate(dateString)
        setCurrent(current + 1);
    };
    const onFocus = () => {
        setIsFocus(true)
    };

    const content = (<Info />);


    const addItem = async () => {
        const response = await handleAddItem({item, setCurrent, lastNumber})
        dispatch({type: 'ADD_ACTION', payload: {
                id: 'test',
                actionType: 'test',
                timeStamp: 'test',
            }})
        dispatch({type:'ADD_' + item.type.toUpperCase(), payload: response})

        setCurrent(0)
        // Go back to the previous page in the browsing history
        window.history.back();
    }

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
            title: isBarrel ? 'Select mixing date' : 'Select delivered date',
            content: <DatePicker autoFocus={'false'} style={{width: '100%', margin: '14px 0'}}
                                 onChange={onChangeDate}/>,
        },
        isBarrel ?
            {
                title: 'Write batch N',
                content: <Input
                    style={{marginTop: 14}}
                    focus={'all'}
                    type={'number'}
                    addonBefore="Batch N"
                    onFocus={onFocus}
                    addonAfter={lastNumber ? lastNumber : 'Last: unknown'}
                    value={isFocus ? batchNumber : lastNumber + 1}
                    onChange={e => setBatchNumber(e.target.value)}
                />,
            }
            : null,
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

    const filteredSteps = steps.filter((step) => step !== null);
    const items = filteredSteps.map((item) => ({key: item.title, title: item.title}));

    return (
        <div className={styles.Main}>
            <br/>
            <Steps current={current} items={items}/>
            <br/>
            {/*<div>{steps[current].content}</div>*/}
            <div>{filteredSteps[current] && filteredSteps[current].content}</div>

            <div style={{marginTop: 24}}>
                {current === 3 && (
                    <Button type="primary" onClick={() => next({current, setCurrent})}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => addItem()}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev({current, setCurrent})}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddItem;