import React from 'react';
import {Button} from "antd";

const MyButton = ({children, type, click}) => {
    return (
        <Button onClick={click} style={{marginTop: 4, marginLeft: 4}} type={type}>{children}</Button>
    );
};

export default MyButton;