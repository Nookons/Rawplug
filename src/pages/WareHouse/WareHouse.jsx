import React, {useEffect, useRef, useState} from 'react';
import style from './WareHouse.module.css'
import {useDispatch, useSelector} from "react-redux";
import {removeItem, writeUserAction, writeUserData} from "../../utils/DataBase";
import {fetchBarrel} from "../../stores/asyncActions/barrel";
import dayjs from "dayjs";
import {
    Avatar,
    Card, Form, Input,
    message,
    Skeleton,
} from "antd";
import {fetchNoz} from "../../stores/asyncActions/noz";
import {useNavigate} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import BarrelWarehouse from "./items/BarrelWarehouse";
import {fetchCartridge} from "../../stores/asyncActions/cartridge";

const WareHouse = () => {
    const dispatch = useDispatch();
    const action = useSelector(state => state.action.action)
    const barrel = useSelector(state => state.barrel.barrel)
    const noz = useSelector(state => state.noz.noz)
    const cartridge = useSelector(state => state.cartridge.cartridge)

    const [batchSearch, setBatchSearch] = useState(null); // Use null or an initial batch number value.
    const [mainArray, setMainArray] = useState([]);

    const [isSearch, setIsSearch] = useState(false);
    const [searchArray, setSearchArray] = useState([]);

    const [active, setActive] = useState(false);

    useEffect(() => {
        dispatch(fetchBarrel())
        dispatch(fetchNoz())
        dispatch(fetchCartridge())
    }, []);

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    useEffect(() => {
        setMainArray([...barrel, ...noz, ...cartridge])
    }, [barrel])

    const batch = (event) => {
        const batchNumber = parseInt(event, 10);
        setBatchSearch(batchNumber);
        setIsSearch(true);
    }

    return (
        <div className={style.Main}>
            <div className={style.Wrapper}>
                <BarrelWarehouse  array={isSearch ? searchArray : mainArray}/>
            </div>
        </div>
    );
};

export default WareHouse;