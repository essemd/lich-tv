import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import DisplayStreams from './components/displayStreams'
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";

export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DisplayStreams />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}
