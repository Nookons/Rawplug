import React, {useCallback, useEffect, useState} from 'react';
import styles from './Home.module.css'
import Title from "antd/es/typography/Title";
import {useDispatch, useSelector} from "react-redux";
import Button from "antd/es/button";
import {cashReducer} from "../../stores/cashReducer";
import Text from "antd/es/typography/Text";
import {Cascader, message} from "antd";
import {options} from "../../utils/Options";
import {fetchUsers} from "../../stores/asyncActions/barrel";

const Home = () => {
    const dispatch = useDispatch();
    const cash = useSelector( state => state.cash.cash)
    const customers = useSelector( state => state.barrel.barrel)
    const [barrelCas, setBarrelCas] = useState();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const onChangeCascade = (element) => {
        const last = element.length - 1
        const name =  element[last]

        const barrel = {
            name: name,
            id: Date.now(),
            location: 'A-2-3',
            batchNumber: '19432',
            changeDate: Date.now().toString(),
            type: 'Barrel'
        }

        dispatch({type: "ADD_BARREL", payload: barrel})
    }

    const removeCustomer = useCallback((event) => {
        dispatch({type: "REMOVE_BARREL", payload: event.id})
        message.success('User ' + event.name + ' was remove')
    }, []);

    return (
        <div className={styles.Main}>
            <Cascader.Panel className={styles.Cascader} options={options} onChange={onChangeCascade}/>
            <Button type="primary">Get many users</Button>
            {customers.length > 0
                ?
                <div>
                    {customers.reverse().map((element, index) => {

                        return (
                            <div key={index}>
                                <Text>Name:
                                    <Text type="secondary">{element.name}</Text>
                                    <hr/>
                                    <Button type="primary" onClick={() => removeCustomer(element)}>Remove user</Button>
                                </Text>
                            </div>
                        )
                    })}
                </div>
                :
                <div>
                    <Title level={2}>Nothing here...</Title>
                </div>
            }
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