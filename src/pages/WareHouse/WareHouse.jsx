import React, {useCallback, useEffect, useRef, useState} from 'react';
import style from './WareHouse.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchBarrel} from "../../stores/asyncActions/barrel";
import {message,} from "antd";
import {useNavigate} from "react-router-dom";
import BarrelWarehouse from "./items/BarrelWarehouse";
import Button from "antd/es/button";
import {fetchNozzle} from "../../stores/asyncActions/nozzle";
import {fetchCartridge} from "../../stores/asyncActions/cartridge";
import {signInUser} from "../../stores/asyncActions/UserAsunc/User";
import {getUser} from "../../stores/asyncActions/UserAsunc/Get";
import {ADD_ITEM} from "../../utils/consts";

const WareHouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action = useSelector((state) => state.action.action);
    const items = useSelector((state) => state.items);
    const user = useSelector((state) => state.user);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming fetchBarrel and fetchNozzle return promises
                const responseBarrel    = await dispatch(fetchBarrel());
                const responseNozzle    = await dispatch(fetchNozzle());
                const responseCartridge = await dispatch(fetchCartridge());
            } catch (error) {
                // Handle errors here
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const toAddItem = () => {
        if (user.status) {
            navigate(ADD_ITEM)
        }
        else {
            message.error('Not available to unauthorized users')
        }
    }

    return (
        <div className={style.Main}>
            <div className={style.Wrapper}>
                <div>
                    <article>Main buttons:</article>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 14}}>
                        <div style={{display: 'flex', gap: 14}}>
                            <Button onClick={() => toAddItem()} type="primary">Add item</Button>
                        </div>
                        <div style={{display: 'flex', gap: 14}}>
                            <Button onClick={() => message.error('Currently being developed...')} type="primary">Create
                                delivered list</Button>
                        </div>
                        <div style={{display: 'flex', gap: 14}}>
                            <Button onClick={() => message.error('Currently being developed...')} type="primary">Find
                                item</Button>
                        </div>
                    </div>
                </div>
                <hr/>
                <BarrelWarehouse array={items}/>
            </div>
        </div>
    );
};

export default WareHouse;