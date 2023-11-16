import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {message} from "antd";
import Button from "antd/es/button";

const Home = () => {
    const dispatch = useDispatch();
    const actions = useSelector( state => state.action.action)


    const onChangeCascade = async (element) => {
        dispatch({type: "ADD_BARREL", payload: 'test'})
        dispatch({type: "ADD_ACTION", payload: 'test'})
        return null
    };

    return (
        <div className={styles.Main}>

            <Button onClick={onChangeCascade} type="primary">Primary Button</Button>
            {/*  <div className={styles.MainTimeLine}>
                <Title level={2}>Today's production</Title>
                <div className={styles.TimeLine}>
                    First time line
                </div>
            </div>
            <div className={styles.MainTimeLine}>
                <Title level={2}>Last production</Title>
                <div className={styles.TimeLine}>
                    Secondary time line
                </div>
            </div>*/}
        </div>
    );
};

export default Home;