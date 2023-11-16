import React, {useCallback, useState} from 'react';
import styles from './Navbar.module.css'
import {Link} from "react-router-dom";
import logo from '../../assets/logo.svg'
import MyButton from "../MyButton/MyButton";

const Navbar = () => {
    const [burger, setBurger] = useState(false);

    const onBurgerClick = useCallback(() => {
        setBurger(prevBurger => !prevBurger);
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.LogoPlace}>
                <img src='https://www.vermontsales.co.za/images/brands/rawlplug_logo.svg' alt=""/>
            </div>
            <div className={burger ? styles.BurgerActive : styles.Burger} onClick={onBurgerClick}>
                <a></a>
            </div>
            <div className={burger ? styles.NavBarBurger : styles.NavBar}>
                <MyButton><Link onClick={() => setBurger(false)} to="/">Home</Link></MyButton>
                <MyButton><Link onClick={() => setBurger(false)} to="/pick-dep">Departments</Link></MyButton>
               {/* <MyButton><Link to="/store">Warehouse</Link></MyButton>*/}
            </div>
        </div>
    )
};

export default Navbar;