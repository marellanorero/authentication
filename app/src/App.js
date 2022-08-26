import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import injectContext from "./store/appContext";

import Navbar from "./components/Navbar";

import Home from "./views/Home";
import RegisterPage from "./views/RegisterPage";
import Login from "./views/login"
import ProfilePage from "./views/ProfilePage"

const App = () => {
   
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/login" element={<Login />}  />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default injectContext(App);