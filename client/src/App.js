import React, { useEffect, useState, useContext } from 'react';
import { Route, Routes } from "react-router-dom";

import DisplayStreams from './components/displayStreams'
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import GenKey from "./components/genKey";

//import { myContext } from './components/context';

export default function App() {
    //const ctx = useContext(myContext);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DisplayStreams />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/genkey" element={<GenKey />} />
            </Routes>
        </div>
    );
}
