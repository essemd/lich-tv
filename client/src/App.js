import React from 'react';
import { Route, Routes } from "react-router-dom";

import DisplayStreams from './components/displayStreams'
import Navbar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/signup";
import GenKey from "./components/genKey";
import StreamView from "./components/streamView";
import Footer from "./components/footer";

export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DisplayStreams />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/genkey" element={<GenKey />} />
                <Route path="/stream/:streamId" element={<StreamView />} />
            </Routes>
			<Footer />
        </div>
    );
}
