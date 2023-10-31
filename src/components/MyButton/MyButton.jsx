import React from 'react';
import {Button} from "antd";
import styles from './MyButton.module.css'

const MyButton = ({children, type, click, value, ...props}) => {
    return (
        <Button {...props} className={styles.Main} value={value} onClick={click} style={{marginTop: 4, marginLeft: 4}} type={type}>{children}</Button>
    );
};

export default MyButton;