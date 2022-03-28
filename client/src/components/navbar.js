import React from "react";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand mb-0 h1 text-light" href="/">lich.tv</a>
                <ul className="flex-row navbar-nav text-light justify-content-end">
                    <li className="nav-item m-1"><a className="text-reset text-decoration-none" href="/login">Login</a></li>
                    <li className="nav-item m-1"><a className="text-reset text-decoration-none" href="/signup">Signup</a></li>
                </ul>
            </div>
        </nav>
    );
}
