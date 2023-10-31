import React from 'react';
import {Button} from "antd";

const MyButton = ({children, type, click, value, ...props}) => {
    return (
        <Button {...props} value={value} onClick={click} style={{marginTop: 4, marginLeft: 4}} type={type}>{children}</Button>
    );
};

export default MyButton;