import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {departmentRoutes, publicRoutes} from "../routes";

const AppRouter = () => {

    return (
        <Routes>
            {publicRoutes.map( ({path, Component}, index) =>
                <Route key={index} path={path} Component={Component} exact={true}/>
            )}
            {departmentRoutes.map( ({path, Component}, index) =>
                <Route key={index} path={path} Component={Component} exact={true} />
            )}
        </Routes>
    )
};

export default AppRouter;