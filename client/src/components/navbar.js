import React from "react";

export default function Navbar(props) {
    return (
        <nav class="navbar navbar-light bg-dark">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1 text-light">lich.tv</span>
                <ul class="flex-row navbar-nav text-light justify-content-end">
                    <li class="nav-item m-1"><a class="text-reset text-decoration-none" href="#">Login</a></li>
                    <li class="nav-item m-1"><a class="text-reset text-decoration-none" href="#">Signup</a></li>
                </ul>
            </div>
        </nav>
    );
}
