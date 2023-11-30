import React, {useCallback, useEffect, useState} from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import logo from '../../assets/logo.svg'
import MyButton from "../MyButton/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../stores/asyncActions/UserAsunc/Get";
import Button from "antd/es/button";
import {signInUser, signOutUser} from "../../stores/asyncActions/UserAsunc/User";
import {EnterOutlined, LoginOutlined, LogoutOutlined, StepBackwardOutlined} from "@ant-design/icons";
import {message} from "antd";

const Navbar = () => {
    const [burger, setBurger] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    const onEnter = useCallback((event) => {
        const code = prompt('Write special code P.S 24862486')

        switch (code) {
            case "24862486":
                dispatch(signInUser(code));
                message.success('LogIn secssecfull...')
                break
            default:
                message.error('Not correct code')

        }
    }, []);

    const onLogOut = useCallback((event) => {
        dispatch(signOutUser())
        message.success('You was logout...')
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.LogoPlace}>
                <img src='https://www.vermontsales.co.za/images/brands/rawlplug_logo.svg' alt=""/>
                {user.status ?
                    <div>
                        <p>Status: {user.position}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    : null}
            </div>
            <div className={burger ? styles.BurgerActive : styles.Burger} onClick={onBurgerClick}>
                <a></a>
            </div>
            <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                <MyButton><Link onClick={() => setBurger(false)} to="/">Home</Link></MyButton>
                <MyButton><Link onClick={() => setBurger(false)} to="/pick-dep">Departments</Link></MyButton>
                {user.status
                    ? <Button type="dashed" onClick={onLogOut}><LogoutOutlined /></Button>
                    : <Button type="dashed" onClick={onEnter}><LoginOutlined/></Button>
                }
               {/* <MyButton><Link to="/store">Warehouse</Link></MyButton>*/}
            </div>
        </div>
    )
};

export default Navbar;