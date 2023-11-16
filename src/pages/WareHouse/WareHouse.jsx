import React, {useEffect, useRef, useState} from 'react';
import style from './WareHouse.module.css'
import {useDispatch, useSelector} from "react-redux";
import {removeItem, writeUserAction, writeUserData} from "../../utils/DataBase";
import {fetchBarrel} from "../../stores/asyncActions/barrel";
import dayjs from "dayjs";
import {
    Avatar,
    Card,
    message,
    Skeleton,
} from "antd";
import {fetchNoz} from "../../stores/asyncActions/noz";
import {useNavigate} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import BarrelWarehouse from "./items/BarrelWarehouse";

const WareHouse = () => {
    const dispatch = useDispatch();
    const action = useSelector(state => state.action.action)
    const barrel = useSelector(state => state.barrel.barrel)
    const noz = useSelector(state => state.noz.noz)

    const [mainArray, setMainArray] = useState([]);

    const [active, setActive] = useState(false);

    useEffect(() => {
        dispatch(fetchBarrel())
        dispatch(fetchNoz())
    }, []);

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    useEffect(() => {
        setMainArray([...barrel, ...noz])
    }, [noz])

    console.log(mainArray)

    return (
        <div className={style.Main}>
            <div className={style.Wrapper}>
                <BarrelWarehouse  array={mainArray}/>
            </div>
        </div>
    );
};

export default WareHouse;