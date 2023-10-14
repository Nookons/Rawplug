import React from 'react';
import { PlusCircleFilled, EditFilled, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import styles from './MyFloatButton.module.css'

const MyFloatButton = () => {
    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            icon={<PlusCircleFilled /> }
            label='test'
            className={styles.Main}
        >
            <FloatButton icon={<EditFilled /> }/>
            <FloatButton icon={<PlusCircleFilled /> } />
        </FloatButton.Group>
    );
};

export default MyFloatButton;


