import React from 'react';
import cl from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={cl.siteFooter}>
            <div className={cl.container}>
                <p className={cl.copyrightText}>Copyright &copy; 2023 All Rights Reserved by
                    <a href="https://github.com/Nookons">Nookon</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;