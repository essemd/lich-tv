import React, { useContext } from "react";
import { myContext } from './context';
import axios from 'axios';
import env from '../env.js';

export default function Navbar(props) {
    const ctx = useContext(myContext);

    const logout = () => {
        console.log('logging out');

        axios.get(`https://${env.HOSTNAME}/node/logout`, {
            withCredentials: true
        })
        .then((res) => {
            window.location.href = "/";
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand mb-0 h1 text-light" href="/">lich.stream</a>
                <ul className="flex-row navbar-nav text-light justify-content-end">
                    {ctx ? (
                    <li className="nav-item m-1"><a className="text-reset text-decoration-none" href="#" onClick={logout}>Logout</a></li>
                    ) : (
                    <li className="nav-item m-1"><a className="text-reset text-decoration-none" href="/login">Login</a></li>
                    )}
                    <li className="nav-item m-1"><a className="text-reset text-decoration-none" href="/signup">Signup</a></li>
                </ul>
            </div>
        </nav>
    );
}
