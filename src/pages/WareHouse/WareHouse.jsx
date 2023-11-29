import React, {useEffect, useRef, useState} from 'react';
import style from './WareHouse.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchBarrel} from "../../stores/asyncActions/barrel";
import {
    message,
} from "antd";
import {useNavigate} from "react-router-dom";
import BarrelWarehouse from "./items/BarrelWarehouse";
import Button from "antd/es/button";
import {fetchNozzle} from "../../stores/asyncActions/nozzle";

const WareHouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action = useSelector(state => state.action.action)
    const barrel = useSelector(state => state.items.barrel)
    const nozzle = useSelector(state => state.items.noz)

    const [active, setActive] = useState(false);

    const [itemsArray, setItemsArray] = useState([]);

    useEffect(() => {
        dispatch(fetchBarrel())
        dispatch(fetchNozzle())

        setItemsArray([...nozzle, ...barrel])
    }, [itemsArray]);


    return (
        <div className={style.Main}>
            <div className={style.Wrapper}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                }}>
                    <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                        <Button onClick={() => navigate('/add-item')} type="primary">Add item</Button>
                    </div>
                    <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                        <Button onClick={() => message.error('Currently being developed...')} type="primary">Create delivered list</Button>
                    </div>
                    <div style={{display: 'flex', gap: 14, padding: '1vw'}}>
                        <Button onClick={() => message.error('Currently being developed...')} type="primary">Find item</Button>
                    </div>
                </div>
                <BarrelWarehouse  array={itemsArray}/>
            </div>
        </div>
    );
};

export default WareHouse;