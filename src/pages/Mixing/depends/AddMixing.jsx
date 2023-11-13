import React, {useCallback, useState} from 'react';
import {Cascader, Form, Input, message} from "antd";
import styles from "../../AddItem/AddItem.module.css";
import {options} from "../../../utils/Options";
import Title from "antd/es/typography/Title";
import Checkbox from "antd/es/checkbox/Checkbox";
import Button from "antd/es/button";
import {useNavigate} from "react-router-dom";

const AddMixing = () => {
    const [label, setLabel] = useState('');
    const [data, setData] = useState(false);

    const navigate = useNavigate();

    const pickItem = async (event) => {
        const lastIndex = event.length - 1;
        const itemLabel = event[lastIndex]
        setData(true)

        console.log(itemLabel)

        switch (itemLabel) {
            case 'HYBRYDA':
                message.success('HYBRYDA')
                setLabel('HYBRYDA')
                break;
            case 'HYBRYDA ZIMA':
                message.success('HYBRYDA ZIMA')
                setLabel('HYBRYDA ZIMA')
                break;
            case 'HYBRYDA LATO':
                message.success('HYBRYDA LATO')
                setLabel('HYBRYDA LATO')
                break;
            case 'PSF FR':
                message.success('PSF FR')
                setLabel('PSF FR')
                break;
            case 'PSF FR LATO':
                message.success('PSF FR LATO')
                setLabel('PSF FR LATO')
                break;
            case 'PSF FR ZIMA':
                message.success('PSF FR ZIMA')
                setLabel('PSF FR ZIMA')
                break;
            case 'PSF HSH':
                message.success('PSF HSH')
                setLabel('PSF HSH')
                break;
            case 'EPOXID A':
                message.success('EPOXID A')
                setLabel('EPOXID A')
                break;
            case 'EPOXID B':
                message.success('EPOXID B')
                setLabel('EPOXID B')
                break;
        }
    }
    const onStartClick = useCallback((event) => {
            console.log(label)
            console.log(event)
            navigate('/pick-dep/mixing-dep')
    }, []);

    return (
        <div style={{
            maxWidth: 950,
            margin: '0 auto',
            minHeight: 'calc(100dvh - 156px)',
            padding: 14,
        }}>
            <Title level={4}>Please pick some items for start</Title>
            <Cascader.Panel className={styles.Cascader} options={options} onChange={pickItem} />

            {data
                ?
                <div>
                    <Form.Item label="You really wanna start mixing?" name="checkbox" valuePropName="checked">
                        <Checkbox>{label}</Checkbox>
                    </Form.Item>
                    <Button onClick={onStartClick}>Start</Button>
                </div>
                : null
            }
        </div>
    );
};

export default AddMixing;