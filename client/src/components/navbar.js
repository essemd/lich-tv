import React, { useContext } from 'react';
import axios from 'axios';
import { myContext } from './context';
import env from '../env';

export default function Navbar(props) {
  const ctx = useContext(myContext);

  const logout = () => {
    console.log('logging out');

    axios.get(`${env.PROTOCOL}://${env.HOSTNAME}/node/logout`, {
      withCredentials: true,
    })
      .then((res) => {
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <a className="navbar-brand mb-0 h1 text-light" href="/">lich</a>
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
