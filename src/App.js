import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

const App = () => {
    const [user, setUser] = useState(false);

    return (
        <div>
            {user
                ?
                <BrowserRouter>
                    <Navbar/>
                    <AppRouter/>
                    <Footer/>
                </BrowserRouter>
                :
                <Login setUser={setUser}/>
            }
        </div>
    );
};

export default App;