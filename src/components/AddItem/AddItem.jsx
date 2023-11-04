import React, {useState} from 'react';
import {location, options} from "../../utils/Options";
import {Cascader, DatePicker, Flex, Input, Select} from 'antd';
import MyButton from "../MyButton/MyButton";
import styles from './AddItem.module.css'

const AddItem = ({handleAddItem, batchNumber, setType, setMixingDate, setBatchNumber, setStatus, setLocation}) => {
    const [barrel, setBarrel] = useState(false);

    const onChange = (e) => {
        if (e[0] === 'Barrel') {
            setBarrel(true)
            setType(e)
        }
        else {
            setBarrel(false)
        }
    };

    const onChangeDate = (date, dateString) => {
        setMixingDate(dateString)
    };

    const onChangeLocation = (e) => {
        setLocation(e)
    };

    const onChangeStatus = (e) => {
        setStatus(e)
    };


    return (
        <div style={{width: '100%'}}>
            <Cascader.Panel options={options} onChange={onChange}/>
            {barrel
                ?
                <div style={{maxWidth: 'calc(100% - 20px)', overflow: 'hidden'}}>
                    <br/>
                    <br/>
                    <article>Location :</article>
                    <Cascader.Panel options={location} onChange={onChangeLocation}/>
                    <Input
                        style={{marginTop: 14}}
                        addonBefore="Batch N"
                        addonAfter="Last: 19342"
                        defaultValue="19343"
                        value={batchNumber}
                        onChange={e => setBatchNumber(e.target.value)}
                    />
                    <DatePicker style={{width: '100%', margin: '14px 0'}} onChange={onChangeDate} />
                    <article>Status :</article>
                    <Select
                        style={{ width: '100%' }}
                        allowClear
                        onChange={onChangeStatus}
                        options={[
                            { value: 'success', label: 'Used' },
                            { value: 'processing', label: 'Available' },
                            { value: 'error', label: 'Hold' },
                        ]}
                    />
                    <MyButton click={handleAddItem}>Save</MyButton>
                </div>
                :
                <div></div>
            }
        </div>
    );
};

export default AddItem;