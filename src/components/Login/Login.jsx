import React, {useCallback, useEffect, useState} from 'react';
import Button from "antd/es/button";
import {
    Affix,
    Divider,
    FloatButton,
    Form,
    Input,
    message,
    notification,
    Row,
    Segmented,
    Space,
    Tooltip,
    Watermark
} from "antd";
import Title from "antd/es/typography/Title";
import Col from "antd/es/grid/col";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {InfoCircleOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import Checkbox from "antd/es/checkbox/Checkbox";

const Login = ({setUser}) => {
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState();


    async function userSignIn() {
        if (nickName === 'admintest') {
            message.success('Successful');
            setUser(true);
            localStorage.setItem('remember', remember);
        } else {
            message.error('Something wrong!');
            setNickName('');
            setPassword('');
        }
    }

    async function userSignInRemember() {
        setUser(true);
    }


    const local = localStorage.getItem('remember');

    useEffect(() => {
        if (local === 'true') {
            setRemember(true);
            setNickName('admintest');
            setPassword('admintest');

            setTimeout(() => {
                userSignInRemember();
            }, 500)
        }
    }, [local]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            maxWidth: 800,
            margin: '0 auto',
            padding: '10vh'
        }}>
            <Title level={4}>Login page...</Title>
            <Input
                value={nickName}
                onChange={e => setNickName(e.target.value)}
                placeholder="Enter your username"
                prefix={<UserOutlined className="site-form-item-icon"/>}
                suffix={
                    <Tooltip title="Your team leader will provide you with a nickname and password.">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                    </Tooltip>
                }
            />
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} placeholder="Input password"/>
            <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>Remember me</Checkbox>
            <Button onClick={userSignIn} type="primary">Sign in</Button>
        </div>
    );
};

export default Login;