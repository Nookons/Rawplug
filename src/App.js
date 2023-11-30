import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer/Footer";
import {Provider, useDispatch} from "react-redux";
import {store} from "./stores/store";
import {getUser} from "./stores/asyncActions/UserAsunc/Get";

const App = () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
};

export default App;